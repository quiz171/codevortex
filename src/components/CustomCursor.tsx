import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const evaluate = () => {
      setEnabled(finePointer.matches && !reducedMotion.matches);
    };
    evaluate();

    finePointer.addEventListener('change', evaluate);
    reducedMotion.addEventListener('change', evaluate);
    return () => {
      finePointer.removeEventListener('change', evaluate);
      reducedMotion.removeEventListener('change', evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let visible = false;
    let interactive = false;
    let rafId = 0;

    const updateVisibility = (show: boolean) => {
      visible = show;
      const opacity = show ? '1' : '0';
      if (ringRef.current) ringRef.current.style.opacity = opacity;
      if (dotRef.current) dotRef.current.style.opacity = opacity;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) updateVisibility(true);

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, input, textarea, select, [role="button"], [role="tab"]')
      );

      if (isInteractive !== interactive) {
        interactive = isInteractive;
        if (ringRef.current) {
          ringRef.current.dataset.interactive = isInteractive ? 'true' : 'false';
        }
        if (dotRef.current) {
          dotRef.current.dataset.interactive = isInteractive ? 'true' : 'false';
        }
      }
    };

    const handleMouseLeave = () => updateVisibility(false);

    const tick = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        const scale = interactive ? 1.55 : 1;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      <div
        ref={ringRef}
        data-interactive="false"
        style={{ opacity: 0, transition: 'opacity 150ms ease, border-color 150ms ease' }}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-cyan-400/50 data-[interactive=true]:border-violet-400/80 data-[interactive=true]:bg-violet-500/10"
      />
      <div
        ref={dotRef}
        data-interactive="false"
        style={{ opacity: 0, transition: 'opacity 150ms ease, background-color 150ms ease' }}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-cyan-300 data-[interactive=true]:bg-violet-300"
      />
    </div>
  );
}
