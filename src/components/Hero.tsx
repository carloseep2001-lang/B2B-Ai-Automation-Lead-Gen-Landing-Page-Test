import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type HeroProps = {
  onRequestAudit: () => void;
};

export default function Hero({ onRequestAudit }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.3);

  const springConfig = { stiffness: 120, damping: 30, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const glowX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glowY = useTransform(smoothY, [0, 1], ['0%', '100%']);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x} ${y}, rgba(59,130,246,0.08), transparent 70%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* Dot grid background */}
      <div className="bg-dot-grid pointer-events-none absolute inset-0" />

      {/* Static ambient glow - top center */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(59,130,246,0.06), transparent 70%)',
        }}
      />

      {/* Static ambient glow - deep background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(59,130,246,0.04), transparent 60%)',
        }}
      />

      {/* Mouse-aware glow */}
      <motion.div
        style={{ background: glowBg }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Horizon divider */}
      <div className="pointer-events-none absolute bottom-[140px] left-1/2 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            [Agency Name]
          </p>
        </motion.div>

        <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tighter text-gray-50 sm:text-5xl md:text-6xl lg:text-7xl">
          Your team is spending hours on work that shouldn't require a human.
        </h1>

        <p className="mt-8 max-w-2xl text-pretty text-lg font-light leading-relaxed text-gray-400 md:text-xl">
          We build automation systems that remove operational drag — so your
          team focuses on work that actually moves the business forward.
        </p>

        <motion.button
          onClick={onRequestAudit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="glow-button group mt-12 inline-flex items-center gap-3 rounded-lg bg-accent px-8 py-4 text-base font-medium text-white hover:bg-accent-hover"
        >
          Request an Automation Audit
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </motion.div>
    </section>
  );
}
