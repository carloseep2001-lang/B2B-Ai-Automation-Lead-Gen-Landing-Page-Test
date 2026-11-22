import { motion, useReducedMotion } from 'framer-motion';

const toolStack = [
  'n8n',
  'Hunter',
  'Salesforce',
  'HubSpot',
  'Slack',
  'Airtable',
  'Notion',
  'Make',
  'Zapier',
  'OpenAI',
  'Google Workspace',
];

export default function SocialProof() {
  const shouldReduceMotion = useReducedMotion();

  const toolVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative px-6 py-16 md:py-20 overflow-x-clip">
      <div className="mx-auto max-w-5xl">
        {/* Tool Ecosystem Pills */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-gray-600">
            Example integrations to explore in your audit
          </p>
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {toolStack.map((tool, i) => (
              <motion.span
                key={i}
                variants={toolVariants}
                className="rounded-full border border-charcoal-border bg-charcoal-elevated px-4 py-1.5 text-xs font-medium text-gray-400 transition-all duration-300 hover:border-sky-400/30 hover:text-gray-200"
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
