import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type HeroProps = {
  onRequestAudit: () => void;
};

export default function Hero({ onRequestAudit }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
    }
  }, []);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.35);

  const springConfig = { stiffness: 100, damping: 28, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const glowX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glowY = useTransform(smoothY, [0, 1], ['0%', '100%']);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(650px circle at ${x} ${y}, rgba(56, 189, 248, 0.08), rgba(99, 102, 241, 0.035) 42%, transparent 75%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || shouldReduceMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Deep static ambient glow - behind headline */}
      <div
        className="pointer-events-none absolute left-1/2 top-[20%] -translate-x-1/2 h-[340px] w-[620px] max-w-[90vw] rounded-full opacity-65 blur-[100px]"
        style={{
          background:
            'radial-gradient(ellipse, rgba(56, 189, 248, 0.14), rgba(99, 102, 241, 0.06) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Secondary ambient glow - floor lift */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px] opacity-40 blur-[90px]"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(56, 189, 248, 0.05), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Interactive mouse-aware glow / touch fallback */}
      {!shouldReduceMotion && !isTouchDevice ? (
        <motion.div
          style={{ background: glowBg }}
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
      ) : (
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(650px circle at 50% 35%, rgba(56, 189, 248, 0.08), rgba(99, 102, 241, 0.035) 42%, transparent 75%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Hero Content */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 flex items-center gap-3 rounded-full border border-charcoal-border bg-charcoal-elevated/60 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
            [Agency Name]
          </p>
        </motion.div>

        <h1 className="text-balance text-4xl font-semibold leading-[1.12] tracking-tighter text-gray-50 sm:text-5xl md:text-6xl lg:text-7xl">
          Your team is spending hours on work that shouldn't require a human.
        </h1>

        <p className="mt-8 max-w-2xl text-pretty text-lg font-light leading-relaxed text-gray-400 md:text-xl">
          We build automation systems that remove operational drag — so your
          team focuses on work that actually moves the business forward.
        </p>

        <motion.button
          onClick={onRequestAudit}
          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="glow-button group mt-12 inline-flex items-center gap-3 rounded-lg bg-accent px-8 py-4 text-base font-medium text-white hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
        >
          Request an Automation Audit
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </motion.button>
      </motion.div>

      {/* Glowing Horizon Line Divider */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 flex flex-col items-center justify-center overflow-hidden" aria-hidden="true">
        {/* Soft diffused bloom */}
        <div className="h-[2px] w-full max-w-3xl bg-gradient-to-r from-transparent via-sky-400/40 to-transparent blur-[3px]" />
        {/* Crisp core horizon line */}
        <div className="h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />
      </div>
    </section>
  );
}
