import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const auditItems = [
  {
    title: 'A structured review of your workflows',
    description:
      'We examine how work moves through your team — what\'s manual, what\'s disconnected, and where time is being spent unnecessarily.',
  },
  {
    title: 'Identification of automation opportunities',
    description:
      'We pinpoint specific processes where automation could reduce manual effort or eliminate bottlenecks entirely.',
  },
  {
    title: 'A clear, written summary of opportunities',
    description:
      'You receive a prioritized report — opportunities ranked by impact, effort, and feasibility. Plain language, no jargon.',
  },
  {
    title: 'Delivered regardless of next steps',
    description:
      'The audit has standalone value. Whether or not you choose to work with us afterward, you keep the report.',
  },
];

export default function AuditOffer() {
  return (
    <section className="relative bg-charcoal-elevated px-6 py-[120px] md:py-[160px]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 right-0 h-80 w-80 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.04), transparent 70%)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative mx-auto max-w-4xl"
      >
        <motion.div variants={itemVariants} className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            The offer
          </p>
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-gray-50 md:text-4xl lg:text-5xl">
            Free Automation Audit
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12 max-w-2xl">
          <p className="text-pretty text-lg font-light leading-relaxed text-gray-400">
            The audit is a structured review of your current operations — not a
            sales call disguised as a consultation. We look at how work moves
            through your team, identify where automation could reduce manual
            effort, and deliver a clear, written summary of opportunities
            prioritized by impact.
          </p>
          <p className="mt-6 text-pretty text-lg font-light leading-relaxed text-gray-400">
            There is no obligation. The audit has standalone value whether or
            not you choose to work with us afterward.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid gap-px overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-border md:grid-cols-2"
        >
          {auditItems.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative overflow-hidden bg-charcoal-base p-8 transition-colors duration-300 hover:bg-charcoal-raised md:p-10"
            >
              {/* Hover accent line */}
              <div className="absolute left-0 top-0 h-full w-px bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-60" />

              <div className="mb-4 flex items-center gap-4">
                <span className="text-sm font-medium tabular-nums text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 bg-charcoal-subtle transition-colors duration-300 group-hover:bg-charcoal-border" />
              </div>
              <h3 className="mb-3 text-lg font-medium tracking-tight text-gray-100">
                {item.title}
              </h3>
              <p className="text-pretty text-[15px] leading-relaxed text-gray-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
