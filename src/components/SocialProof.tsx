import { motion, useReducedMotion } from 'framer-motion';

const customerLogos = [
  'Acme Corp',
  'Nexus AI',
  'Vertex Labs',
  'Solari',
  'Omnia Data',
  'Hyperion Ops',
];

const toolStack = [
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

  const logoVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 0.5,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

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
        {/* Customer Logos */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-gray-600">
            Trusted by operations teams at
          </p>
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
          >
            {customerLogos.map((logo, i) => (
              <motion.span
                key={i}
                variants={logoVariants}
                className="text-sm font-semibold tracking-tight text-gray-500 transition-colors duration-300 hover:text-gray-300"
              >
                {logo}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="mx-auto my-12 h-px max-w-md bg-gradient-to-r from-transparent via-charcoal-border to-transparent" />

        {/* Tool Ecosystem Pills */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-gray-600">
            We work with your existing stack
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
