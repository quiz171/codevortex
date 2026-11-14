import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

const SYMBOLS = ['{ }', '</>', '=>', 'λ', '[]', '01', 'fn()', '::'];

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(58, Math.max(24, Math.floor((width * height) / 24000)));
      particles = Array.from({ length: count }, (_, idx) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        radius: Math.random() * 1.6 + 0.9,
        alpha: Math.random() * 0.4 + 0.2,
        color: idx % 2 === 0 ? '139, 92, 246' : '34, 211, 238',
      }));
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (isCoarsePointer || prefersReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        // Glow halo on nodes near pointer
        let boost = 0;
        if (pointer.active) {
          const pdx = p.x - pointer.x;
          const pdy = p.y - pointer.y;
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy);
          if (pDist < 170) {
            boost = (1 - pDist / 170) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${boost * 0.4})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + boost * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.min(0.9, p.alpha + boost)})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 18500) {
            const lineAlpha = (1 - Math.sqrt(distSq) / 136) * 0.14;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(drawFrame);
      }
    };

    resize();
    drawFrame();

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Subtle atmospheric lighting */}
      <div
        className="absolute -top-36 left-1/4 h-[440px] w-[440px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-24 h-[400px] w-[400px] rounded-full opacity-15 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
      />
      <canvas ref={canvasRef} className="h-full w-full" />

      {/* Subtle floating programming symbols */}
      <div className="hidden md:block">
        {SYMBOLS.map((symbol, index) => {
          const positions = [
            'top-[16%] left-[6%]',
            'top-[74%] left-[9%]',
            'top-[22%] right-[45%]',
            'top-[68%] left-[43%]',
            'top-[14%] right-[8%]',
            'top-[82%] right-[11%]',
            'top-[46%] left-[3%]',
            'top-[48%] right-[4%]',
          ];
          return (
            <span
              key={symbol}
              className={`animate-float-slow font-mono text-xs tracking-wider text-slate-400/25 select-none absolute ${positions[index]}`}
              style={{ animationDelay: `${index * 0.8}s` }}
            >
              {symbol}
            </span>
          );
        })}
      </div>
    </div>
  );
}
