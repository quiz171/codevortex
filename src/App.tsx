import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Terminal } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PersonalitySection } from './components/PersonalitySection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { JourneySection } from './components/JourneySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { DeveloperTerminal } from './components/DeveloperTerminal';
import { CommandPalette } from './components/CommandPalette';
import { CustomCursor } from './components/CustomCursor';

const TRACKED_SECTIONS = [
  'home',
  'about',
  'beyond-the-code',
  'skills',
  'projects',
  'services',
  'journey',
  'contact',
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [prefilledSubject, setPrefilledSubject] = useState<string>('');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Dynamic canonical & og:url tags for SEO
  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    let ogUrlMeta = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrlMeta) {
      ogUrlMeta = document.createElement('meta');
      ogUrlMeta.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlMeta);
    }
    ogUrlMeta.content = canonicalUrl;
  }, []);

  // Global Ctrl+K / Cmd+K shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen(false);
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id;
          if (id === 'beyond-the-code') {
            setActiveSection('about');
          } else if (id === 'journey') {
            setActiveSection('services');
          } else {
            setActiveSection(id);
          }
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    TRACKED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navigateTo = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectService = useCallback(
    (serviceTitle: string) => {
      setPrefilledSubject(`Inquiry: ${serviceTitle}`);
      navigateTo('contact');
    },
    [navigateTo]
  );

  const handleClearPrefilledSubject = useCallback(() => {
    setPrefilledSubject('');
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#06060A] text-[#F4F4F8] selection:bg-violet-500/30 selection:text-cyan-200">
        <CustomCursor />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
        >
          Skip to main content
        </a>

        <Navbar activeSection={activeSection} onNavigate={navigateTo} />

        <main id="main-content">
          <HeroSection
            onExploreWork={() => navigateTo('projects')}
            onLetsTalk={() => navigateTo('contact')}
            onOpenTerminal={() => setTerminalOpen(true)}
            onOpenPalette={() => setPaletteOpen(true)}
          />
          <AboutSection />
          <PersonalitySection />
          <SkillsSection />
          <ProjectsSection />
          <ServicesSection onSelectService={handleSelectService} />
          <JourneySection />
          <ContactSection
            prefilledSubject={prefilledSubject}
            onClearPrefilledSubject={handleClearPrefilledSubject}
          />
        </main>

        <Footer
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenPalette={() => setPaletteOpen(true)}
        />

        {/* Floating Interactive Terminal Trigger */}
        <button
          type="button"
          onClick={() => setTerminalOpen(true)}
          aria-label="Open interactive developer terminal"
          className="fixed bottom-6 left-6 z-40 flex h-11 items-center gap-2 rounded-xl border border-violet-500/35 bg-[#0D0E17]/90 px-3.5 text-xs font-mono font-medium text-violet-200 shadow-lg backdrop-blur-md transition-all duration-200 hover:border-cyan-400/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <Terminal className="h-4 w-4 text-cyan-400 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline whitespace-nowrap">Terminal</span>
        </button>

        <ScrollToTop />

        <DeveloperTerminal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
          onNavigate={navigateTo}
        />

        <CommandPalette
          isOpen={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          onNavigate={navigateTo}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
      </div>
    </MotionConfig>
  );
}
