import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

export default function FinalCTA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [timeDrain, setTimeDrain] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="audit-form" className="relative overflow-hidden bg-charcoal-elevated px-6 py-[120px] md:py-[180px]">
      {/* Ambient glow behind form */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.05), transparent 70%)',
        }}
      />

      {/* Pulsing accent dot */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-8 flex items-center justify-center gap-3"
      >
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(59,130,246,0.6)]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-gray-50 md:text-4xl lg:text-5xl">
          If your operations have room to improve, the audit will show you where.
        </h2>

        <p className="mt-6 text-pretty text-lg font-light leading-relaxed text-gray-500">
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
                  className="glow-input w-full rounded-lg border border-charcoal-border bg-charcoal-base px-4 py-3.5 text-base text-gray-100 placeholder-gray-600 outline-none focus:border-accent"
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
                  className="glow-input w-full rounded-lg border border-charcoal-border bg-charcoal-base px-4 py-3.5 text-base text-gray-100 placeholder-gray-600 outline-none focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="timeDrain"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                What's taking up the most time right now?
                <span className="ml-2 font-normal text-gray-600">
                  (optional)
                </span>
              </label>
              <textarea
                id="timeDrain"
                value={timeDrain}
                onChange={(e) => setTimeDrain(e.target.value)}
                placeholder="A sentence or two about where your team's time is going..."
                rows={3}
                className="glow-input w-full resize-none rounded-lg border border-charcoal-border bg-charcoal-base px-4 py-3.5 text-base text-gray-100 placeholder-gray-600 outline-none focus:border-accent"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="glow-button group mt-2 inline-flex items-center justify-center gap-3 rounded-lg bg-accent px-8 py-4 text-base font-medium text-white hover:bg-accent-hover"
            >
              Request an Automation Audit
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <p className="text-center text-sm text-gray-600">
              We'll be in touch within one business day. No newsletters, no
              follow-up sequences.
            </p>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-14 flex max-w-md flex-col items-center rounded-2xl border border-accent/20 bg-charcoal-base p-10 shadow-[0_0_40px_rgba(59,130,246,0.08)]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Check className="h-6 w-6 text-accent" />
            </div>
            <p className="text-balance text-xl font-medium leading-relaxed text-gray-100">
              We'll be in touch within one business day.
            </p>
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-gray-500">
              Thanks, {name || 'there'}. We'll review what you shared and reach
              out shortly to schedule the intro call.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
