import { motion, useReducedMotion } from 'framer-motion';

const metrics = [
  {
    value: '15+ hrs',
    label: 'Average weekly hours saved per team member',
  },
  {
    value: '< 48 hrs',
    label: 'Turnaround time for written audit delivery',
  },
  {
    value: '100%',
    label: 'Standalone value — no lock-in or obligations',
  },
  {
    value: '0 Days',
    label: 'Internal preparation required from your team',
  },
];

export default function MetricsStrip() {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative px-6 py-10 md:py-12 overflow-x-clip">
      <motion.div
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="mx-auto max-w-5xl"
      >
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-border lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative bg-charcoal-elevated px-6 py-8 text-center transition-colors duration-300 hover:bg-charcoal-raised md:px-8 md:py-10"
            >
              <p className="text-2xl font-semibold tracking-tight text-gray-50 md:text-3xl">
                {metric.value}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-gray-500 md:text-sm">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
