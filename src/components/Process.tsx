import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import FadeIn from './FadeIn';

const steps = [
  {
    title: 'You submit the form',
    description:
      'Takes less than two minutes. No lengthy questionnaire — just your name, email, and a note about what\'s taking up time.',
  },
  {
    title: 'We schedule a short intro call',
    description:
      'Twenty to thirty minutes. No pitch, no slides — just questions about your operations so we understand the context.',
  },
  {
    title: 'We review and map your workflows',
    description:
      'We do the work. You don\'t need to prepare anything elaborate or document your processes in advance.',
  },
  {
    title: 'You receive a clear audit report',
    description:
      'Specific opportunities, prioritized by impact. Written in plain language — no technical jargon, no assumptions.',
  },
  {
    title: 'You decide what to do next',
    description:
      'Work with us, take it elsewhere, or do nothing at all. No pressure either way. The report is yours to keep.',
  },
];

function ProcessStepDesktop({
  step,
  index,
  isLast,
  shouldReduceMotion,
}: {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
  shouldReduceMotion: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: '-20% 0px -25% 0px',
    amount: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        },
      }}
      className="relative flex-1"
    >
      {/* Desktop connector line */}
      {!isLast && (
        <div
          className="absolute top-[18px] left-[calc(50%+20px)] right-[-12px] h-px overflow-hidden bg-charcoal-border/70"
          aria-hidden="true"
        >
          <div
            className={`h-full w-full transition-all duration-700 ease-out ${
              isInView
                ? 'bg-gradient-to-r from-sky-400 via-accent to-charcoal-border opacity-90'
                : 'opacity-0'
            }`}
          />
        </div>
      )}

      <div className="relative mb-6 flex items-center gap-3">
        <div
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium tabular-nums transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isInView
              ? 'border-sky-400 bg-sky-500/15 text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.45),inset_0_0_8px_rgba(56,189,248,0.2)]'
              : 'border border-charcoal-border/80 bg-charcoal-base text-gray-500 hover:border-sky-400/40 hover:text-gray-300'
          }`}
        >
          {index + 1}
        </div>
      </div>

      <h3
        className={`mb-3 text-base font-medium leading-snug tracking-tight transition-colors duration-300 ${
          isInView ? 'text-gray-50' : 'text-gray-300'
        }`}
      >
        {step.title}
      </h3>
      <p className="text-pretty text-sm leading-relaxed text-gray-400">
        {step.description}
      </p>
    </motion.div>
  );
}

function ProcessStepMobile({
  step,
  index,
  isLast,
  shouldReduceMotion,
}: {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
  shouldReduceMotion: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: '-20% 0px -25% 0px',
    amount: 0.4,
  });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
        },
      }}
      className="relative flex gap-6 pb-12 last:pb-0"
    >
      {/* Vertical connector line */}
      {!isLast && (
        <div
          className="absolute left-[18px] top-9 bottom-0 w-px bg-charcoal-border/70 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className={`h-full w-full transition-all duration-700 ease-out ${
              isInView
                ? 'bg-gradient-to-b from-sky-400 via-accent to-charcoal-border opacity-90'
                : 'opacity-0'
            }`}
          />
        </div>
      )}

      <div
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium tabular-nums transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isInView
            ? 'border-sky-400 bg-sky-500/15 text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.45),inset_0_0_8px_rgba(56,189,248,0.2)]'
            : 'border border-charcoal-border/80 bg-charcoal-base text-gray-500'
        }`}
      >
        {index + 1}
      </div>

      <div className="flex-1 pt-1">
        <h3
          className={`mb-2 text-base font-medium leading-snug tracking-tight transition-colors duration-300 ${
            isInView ? 'text-gray-50' : 'text-gray-300'
          }`}
        >
          {step.title}
        </h3>
        <p className="text-pretty text-sm leading-relaxed text-gray-400">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
  };

  return (
    <section className="relative px-6 py-[120px] md:py-[160px] overflow-x-clip">
      {/* Diffused ambient glow */}
      <div
        className="pointer-events-none absolute top-1/4 right-1/4 h-[440px] w-[440px] opacity-25 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.06), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <FadeIn className="relative mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            The process
          </p>
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-gray-50 md:text-4xl lg:text-5xl">
            What happens after you submit
          </h2>
        </div>

        {/* Desktop: horizontal flow with scroll-activated step circles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="hidden md:flex md:gap-6 lg:gap-8"
        >
          {steps.map((step, i) => (
            <ProcessStepDesktop
              key={i}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>

        {/* Mobile: vertical flow with scroll-activated step circles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-0 md:hidden"
        >
          {steps.map((step, i) => (
            <ProcessStepMobile
              key={i}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>
      </FadeIn>
    </section>
  );
}
