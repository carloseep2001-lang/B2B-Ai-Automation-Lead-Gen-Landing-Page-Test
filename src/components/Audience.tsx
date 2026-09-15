import { motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const forYou = [
  'You feel the friction of general inefficiency — work that takes longer than it should, with no clear reason why.',
  'Your team spends meaningful time on repetitive, manual tasks that drain energy from higher-value work.',
  'Your tools don\'t talk to each other — data lives in silos, and moving it between systems is a manual chore.',
  'You\'re curious about AI and automation but haven\'t acted yet, because the landscape is noisy and hard to evaluate.',
  'You want to understand what\'s actually possible for your operations before committing to anything.',
];

const notForYou = [
  'You\'re looking for a quick fix or an off-the-shelf product that solves everything with one purchase.',
  'You want someone to hand you a tool and walk away — without context, strategy, or ongoing partnership.',
  'You need something built and deployed this week — we take the time to understand before we build.',
  'You\'re not open to reviewing how your current workflows operate — the audit requires honest reflection.',
  'You\'re looking for a vendor to execute instructions, not a thinking partner to challenge assumptions.',
];

function ForYouCard({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.div
      variants={{
        hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
      }}
      whileHover={shouldReduceMotion ? {} : { y: -3 }}
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      tabIndex={0}
      className="group relative overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-elevated p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-sky-400/35 hover:shadow-[0_16px_36px_-10px_rgba(56,189,248,0.14),inset_0_1px_0_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 md:p-10"
    >
      {/* Top subtle ambient highlight */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
        <div
          className="absolute -top-20 left-1/2 h-44 w-[85%] -translate-x-1/2 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1), transparent 70%)',
          }}
        />
      </div>

      <div className="relative mb-8 flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 bg-accent/15 shadow-[0_0_12px_rgba(56,189,248,0.25)]">
          <Check className="h-4 w-4 text-accent" />
        </div>
        <h3 className="text-lg font-medium tracking-tight text-gray-100">
          This is for you if...
        </h3>
      </div>

      <motion.ul variants={containerVariants} className="relative space-y-6">
        {forYou.map((item, i) => (
          <motion.li key={i} variants={itemVariants} className="flex gap-4">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/70 shadow-[0_0_6px_rgba(56,189,248,0.4)]" />
            <p className="text-pretty text-[15px] leading-relaxed text-gray-400">
              {item}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

function NotForYouCard({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.div
      variants={{
        hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
      }}
      whileHover={shouldReduceMotion ? {} : { y: -3 }}
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      tabIndex={0}
      className="group relative overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-elevated p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-gray-600/60 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500/40 md:p-10"
    >
      <div className="relative mb-8 flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-700 bg-gray-800/60">
          <X className="h-4 w-4 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium tracking-tight text-gray-300">
          This is not for you if...
        </h3>
      </div>

      <motion.ul variants={containerVariants} className="relative space-y-6">
        {notForYou.map((item, i) => (
          <motion.li key={i} variants={itemVariants} className="flex gap-4">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-600" />
            <p className="text-pretty text-[15px] leading-relaxed text-gray-500">
              {item}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default function Audience() {
  const shouldReduceMotion = useReducedMotion();

  const sectionVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };

  return (
    <section className="relative px-6 py-[120px] md:py-[160px] overflow-x-clip">
      {/* Diffused ambient glow behind cards */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 -translate-x-1/2 h-[420px] w-[500px] opacity-30 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative mx-auto max-w-6xl"
      >
        <motion.div
          variants={{
            hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
            },
          }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Who this is for
          </p>
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-gray-50 md:text-4xl lg:text-5xl">
            Honest about fit before either of us spends time.
          </h2>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="grid gap-6 md:grid-cols-2 md:gap-8"
        >
          <ForYouCard shouldReduceMotion={shouldReduceMotion} />
          <NotForYouCard shouldReduceMotion={shouldReduceMotion} />
        </motion.div>
      </motion.div>
    </section>
  );
}
