import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

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

function StepCircle({ index }: { index: number }) {
  return (
    <div className="group/step relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-charcoal-subtle bg-charcoal-base text-sm font-medium tabular-nums text-accent transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_16px_rgba(59,130,246,0.3)]">
      {index + 1}
    </div>
  );
}

export default function Process() {
  return (
    <section className="relative px-6 py-[120px] md:py-[160px]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/4 right-1/4 h-96 w-96 opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.03), transparent 70%)',
        }}
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

        {/* Desktop: horizontal flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="hidden md:flex md:gap-6 lg:gap-8"
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={stepVariants} className="relative flex-1">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute top-[18px] left-[calc(50%+20px)] right-[-12px] h-px bg-gradient-to-r from-charcoal-subtle to-charcoal-border" />
              )}

              <div className="relative mb-6 flex items-center gap-3">
                <StepCircle index={i} />
              </div>

              <h3 className="mb-3 text-base font-medium leading-snug tracking-tight text-gray-100">
                {step.title}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-gray-500">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: vertical flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-0 md:hidden"
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={stepVariants} className="relative flex gap-6 pb-12 last:pb-0">
              {/* Vertical line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[18px] top-9 bottom-0 w-px bg-charcoal-border" />
              )}

              <StepCircle index={i} />

              <div className="flex-1 pt-1">
                <h3 className="mb-2 text-base font-medium leading-snug tracking-tight text-gray-100">
                  {step.title}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-gray-500">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </FadeIn>
    </section>
  );
}
