import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.resolve(__dirname, 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'contact-submissions.json');

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
  ipHash?: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Serialize disk writes so concurrent submissions never corrupt JSON
let writeQueue: Promise<void> = Promise.resolve();

async function persistSubmission(entry: ContactSubmission): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    let existing: ContactSubmission[] = [];
    try {
      const raw = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        existing = parsed as ContactSubmission[];
      }
    } catch {
      existing = [];
    }
    existing.push(entry);
    const tempFile = `${SUBMISSIONS_FILE}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(existing, null, 2), 'utf-8');
    await fs.rename(tempFile, SUBMISSIONS_FILE);
  });
  return writeQueue;
}

function validateContactPayload(body: Record<string, unknown>): {
  valid: boolean;
  errors: ValidationErrors;
  sanitized: { name: string; email: string; subject: string; message: string };
} {
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  const errors: ValidationErrors = {};

  if (name.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  } else if (name.length > 100) {
    errors.name = 'Name must be 100 characters or fewer.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(email) || email.length > 160) {
    errors.email = 'Please enter a valid email address.';
  }

  if (subject.length < 3) {
    errors.subject = 'Please enter a subject (at least 3 characters).';
  } else if (subject.length > 150) {
    errors.subject = 'Subject must be 150 characters or fewer.';
  }

  if (message.length < 10) {
    errors.message = 'Please share a bit more detail (at least 10 characters).';
  } else if (message.length > 3000) {
    errors.message = 'Message must be 3,000 characters or fewer.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: { name, email, subject, message },
  };
}

function createReferenceId(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CV-${y}${m}${d}-${rand}`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '32kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'codevortex-portfolio' });
  });

  app.post('/api/contact', async (req, res) => {
    const payload = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<
      string,
      unknown
    >;

    // Silent honeypot check for automated spam bots
    if (typeof payload.website === 'string' && payload.website.trim().length > 0) {
      res.status(200).json({
        success: true,
        referenceId: createReferenceId(),
        receivedAt: new Date().toISOString(),
        message: 'Message received.',
      });
      return;
    }

    const { valid, errors, sanitized } = validateContactPayload(payload);
    if (!valid) {
      res.status(400).json({
        success: false,
        message: 'Please review the highlighted fields and try again.',
        errors,
      });
      return;
    }

    const referenceId = createReferenceId();
    const receivedAt = new Date().toISOString();

    try {
      await persistSubmission({
        id: referenceId,
        ...sanitized,
        receivedAt,
      });

      // Optional outbound webhook forwarding when configured via environment
      const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ referenceId, receivedAt, ...sanitized }),
          });
        } catch (webhookError) {
          console.error('Optional contact webhook failed:', webhookError);
        }
      }

      res.status(201).json({
        success: true,
        referenceId,
        receivedAt,
        message: 'Your inquiry has been saved. I will respond as soon as possible.',
      });
    } catch (error) {
      console.error('Failed to persist contact submission:', error);
      res.status(500).json({
        success: false,
        message: 'Unable to save your message right now. Please try again shortly.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CODEVORTEX server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
