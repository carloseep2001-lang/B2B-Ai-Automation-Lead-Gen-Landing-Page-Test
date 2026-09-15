import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

export default function FinalCTA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [timeDrain, setTimeDrain] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="audit-form"
      className="relative overflow-hidden bg-charcoal-elevated px-6 py-[120px] md:py-[180px]"
    >
      {/* Seamless gradient transition band from Process (charcoal-base) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-charcoal-base to-transparent"
        aria-hidden="true"
      />

      {/* Diffused ambient glow behind form */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 opacity-25 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.12), rgba(99, 102, 241, 0.05) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Breathing indicator dot with outer pulsing ring */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8 flex items-center justify-center gap-3"
      >
        <span className="relative flex h-3 w-3 items-center justify-center">
          <span className="breathing-dot absolute inline-flex h-full w-full rounded-full bg-sky-400/80" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
        </span>
        <span className="text-xs font-medium uppercase tracking-widest text-sky-400/85">
          Request Free Audit
        </span>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-gray-50 md:text-4xl lg:text-5xl">
          If your operations have room to improve, the audit will show you where.
        </h2>

        <p className="mt-6 text-pretty text-lg font-light leading-relaxed text-gray-400">
          No promises, no guarantees — just a clear picture of where time is
          being spent that doesn't need to be.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mt-14 flex flex-col gap-5 text-left"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="glow-input w-full rounded-lg border border-charcoal-border bg-charcoal-base px-4 py-3.5 text-base text-gray-100 placeholder-gray-600 outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Business email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="glow-input w-full rounded-lg border border-charcoal-border bg-charcoal-base px-4 py-3.5 text-base text-gray-100 placeholder-gray-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="timeDrain"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                What's taking up the most time right now?
                <span className="ml-2 font-normal text-gray-500">
                  (optional)
                </span>
              </label>
              <textarea
                id="timeDrain"
                value={timeDrain}
                onChange={(e) => setTimeDrain(e.target.value)}
                placeholder="A sentence or two about where your team's time is going..."
                rows={3}
                className="glow-input w-full resize-none rounded-lg border border-charcoal-border bg-charcoal-base px-4 py-3.5 text-base text-gray-100 placeholder-gray-600 outline-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={shouldReduceMotion ? {} : { scale: 1.015 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="glow-button group mt-2 inline-flex items-center justify-center gap-3 rounded-lg bg-accent px-8 py-4 text-base font-medium text-white hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
            >
              Request an Automation Audit
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>

            <p className="text-center text-sm text-gray-500">
              We'll be in touch within one business day. No newsletters, no
              follow-up sequences.
            </p>
          </form>
        ) : (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-14 flex max-w-md flex-col items-center rounded-2xl border border-sky-400/30 bg-charcoal-base p-10 shadow-[0_0_40px_rgba(56,189,248,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/40 bg-sky-500/15 shadow-[0_0_24px_rgba(56,189,248,0.3)]">
              <Check className="h-6 w-6 text-sky-400" />
            </div>
            <p className="text-balance text-xl font-medium leading-relaxed text-gray-100">
              We'll be in touch within one business day.
            </p>
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-gray-400">
              Thanks, {name || 'there'}. We'll review what you shared and reach
              out shortly to schedule the intro call.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
