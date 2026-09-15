import { motion, useReducedMotion } from 'framer-motion';

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
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden bg-charcoal-elevated px-6 py-[120px] md:py-[160px]">
      {/* Seamless gradient transition bands to/from charcoal-base */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-charcoal-base to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal-base to-transparent"
        aria-hidden="true"
      />

      {/* Diffused ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 h-[440px] w-[440px] opacity-25 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08), transparent 70%)',
        }}
        aria-hidden="true"
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
          className="grid gap-px overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-border shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:grid-cols-2"
        >
          {auditItems.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              tabIndex={0}
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden bg-charcoal-base p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-300 hover:bg-[#141414] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 md:p-10"
            >
              {/* Illuminated left accent bar on hover */}
              <div
                className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-sky-400 via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="mb-4 flex items-center gap-4">
                <span className="text-sm font-medium tabular-nums text-accent transition-colors duration-300 group-hover:text-sky-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 bg-charcoal-subtle transition-colors duration-300 group-hover:bg-charcoal-border" />
              </div>
              <h3 className="mb-3 text-lg font-medium tracking-tight text-gray-100 transition-colors duration-300 group-hover:text-white">
                {item.title}
              </h3>
              <p className="text-pretty text-[15px] leading-relaxed text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
