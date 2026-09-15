import { motion, useReducedMotion } from 'framer-motion';
import { FileText, TrendingUp, Clock, CircleCheck as CheckCircle2 } from 'lucide-react';

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
    <section id="audit-offer" className="relative overflow-hidden bg-charcoal-elevated px-6 py-[120px] md:py-[160px]">
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
        className="relative mx-auto max-w-5xl"
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

        {/* Sample Audit Deliverable Preview */}
        <motion.div variants={itemVariants} className="mt-12">
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-base shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            {/* Ambient glow on hover */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
              <div
                className="absolute -top-20 right-1/4 h-40 w-[60%] rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08), transparent 70%)' }}
              />
            </div>

            {/* Report header */}
            <div className="relative flex items-center justify-between border-b border-charcoal-border px-6 py-4 md:px-8">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-sky-400/70" />
                <span className="text-xs font-medium uppercase tracking-widest text-gray-500">
                  Confidential — Operations Audit Preview
                </span>
              </div>
              <span className="text-xs tabular-nums text-gray-600">Page 3 of 12</span>
            </div>

            {/* Report body */}
            <div className="relative px-6 py-8 md:px-8">
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-300">Prioritization Matrix — Impact vs Effort</p>
                <p className="mt-1 text-xs text-gray-600">Top 3 findings ranked by potential time recovered</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Inbound Lead Qualification & Routing',
                    impact: 'High Impact',
                    effort: 'Low Effort',
                    saved: '+18 hrs/mo saved',
                    impactColor: 'text-sky-400',
                    effortColor: 'text-emerald-400',
                  },
                  {
                    title: 'PDF Invoice Extraction to Accounting',
                    impact: 'High Impact',
                    effort: 'Medium Effort',
                    saved: '+24 hrs/mo saved',
                    impactColor: 'text-sky-400',
                    effortColor: 'text-amber-400',
                  },
                  {
                    title: 'Multi-Tool Client Onboarding Provisioning',
                    impact: 'Medium Impact',
                    effort: 'Low Effort',
                    saved: '+14 hrs/mo saved',
                    impactColor: 'text-indigo-400',
                    effortColor: 'text-emerald-400',
                  },
                ].map((finding, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-3 rounded-xl border border-charcoal-border bg-charcoal-elevated/50 p-4 transition-colors duration-200 hover:border-charcoal-subtle md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-charcoal-border bg-charcoal-base text-xs font-medium tabular-nums text-gray-500">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-200">{finding.title}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pl-10 md:pl-0">
                      <span className={`flex items-center gap-1.5 text-xs font-medium ${finding.impactColor}`}>
                        <TrendingUp className="h-3 w-3" />
                        {finding.impact}
                      </span>
                      <span className={`flex items-center gap-1.5 text-xs font-medium ${finding.effortColor}`}>
                        <Clock className="h-3 w-3" />
                        {finding.effort}
                      </span>
                      <span className="rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
                        {finding.saved}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guarantee badge */}
              <div className="mt-8 flex items-center gap-3 border-t border-charcoal-border pt-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-400/30 bg-sky-500/10 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                  <CheckCircle2 className="h-4 w-4 text-sky-400" />
                </div>
                <p className="text-sm text-gray-400">
                  Yours to keep — regardless of whether we work together afterward.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
