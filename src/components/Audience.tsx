import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

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

function ForYouCard() {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-elevated p-8 transition-colors duration-300 hover:border-accent/30 md:p-10"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute -top-20 left-1/2 h-40 w-[80%] -translate-x-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)',
          }}
        />
      </div>

      <div className="relative mb-8 flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
          <Check className="h-4 w-4 text-accent" />
        </div>
        <h3 className="text-lg font-medium tracking-tight text-gray-100">
          This is for you if...
        </h3>
      </div>

      <motion.ul variants={containerVariants} className="relative space-y-6">
        {forYou.map((item, i) => (
          <motion.li key={i} variants={itemVariants} className="flex gap-4">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/60" />
            <p className="text-pretty text-[15px] leading-relaxed text-gray-400">
              {item}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

function NotForYouCard() {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-elevated p-8 transition-colors duration-300 hover:border-gray-700 md:p-10"
    >
      <div className="relative mb-8 flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-700 bg-gray-800/50">
          <X className="h-4 w-4 text-gray-500" />
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
  return (
    <section className="relative px-6 py-[120px] md:py-[160px]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-0 h-96 w-96 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.04), transparent 70%)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative mx-auto max-w-6xl"
      >
        <motion.div variants={cardVariants} className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Who this is for
          </p>
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-gray-50 md:text-4xl lg:text-5xl">
            Honest about fit before either of us spends time.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2 md:gap-8"
        >
          <ForYouCard />
          <NotForYouCard />
        </motion.div>
      </motion.div>
    </section>
  );
}
