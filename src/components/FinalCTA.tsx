import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Lock,
  ShieldX,
  Zap,
  Calendar,
} from 'lucide-react';

const bottlenecks = [
  'Repetitive manual data entry & copy-pasting across tools',
  'Slow inbound lead response & disconnected CRM routing',
  'Disconnected tools, messy spreadsheets, and siloed data',
  'High-volume document/invoice processing delays',
];

const toolOptions = [
  'HubSpot',
  'Salesforce',
  'Slack',
  'Airtable',
  'Google Workspace',
  'Notion',
  'QuickBooks',
  'Custom ERP',
];

const hoursOptions = ['1 – 5 hrs / person', '5 – 15 hrs / person', '15+ hrs / person'];

const totalSteps = 4;

export default function FinalCTA() {
  const [step, setStep] = useState(0);
  const [selectedBottlenecks, setSelectedBottlenecks] = useState<number[]>([]);
  const [selectedTools, setSelectedTools] = useState<number[]>([]);
  const [selectedHours, setSelectedHours] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const toggleBottleneck = (i: number) => {
    setSelectedBottlenecks((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const toggleTool = (i: number) => {
    setSelectedTools((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const canProceed = () => {
    if (step === 0) return selectedBottlenecks.length > 0;
    if (step === 1) return selectedTools.length > 0;
    if (step === 2) return selectedHours !== null;
    if (step === 3) return name.trim().length > 0 && email.trim().length > 0;
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed()) return;
    setSubmitted(true);
  };

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const progress = ((step + 1) / totalSteps) * 100;

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
          <div className="mt-14 text-left">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">
                  Step {step + 1} of {totalSteps}
                </span>
                <span className="text-xs font-medium tabular-nums text-gray-500">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-charcoal-base">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Bottlenecks */}
                {step === 0 && (
                  <motion.div
                    key="step-0"
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="mb-5 text-sm font-medium text-gray-300">
                      What's your primary operational bottleneck?
                      <span className="ml-2 font-normal text-gray-500">Select 1 or more</span>
                    </p>
                    <div className="flex flex-col gap-3">
                      {bottlenecks.map((b, i) => {
                        const selected = selectedBottlenecks.includes(i);
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => toggleBottleneck(i)}
                            className={`group flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-200 ${
                              selected
                                ? 'border-sky-400/40 bg-sky-500/10 shadow-[0_0_16px_rgba(56,189,248,0.12)]'
                                : 'border-charcoal-border bg-charcoal-base hover:border-gray-600'
                            }`}
                          >
                            <span
                              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
                                selected
                                  ? 'border-sky-400 bg-sky-500 text-white'
                                  : 'border-gray-600 group-hover:border-gray-500'
                              }`}
                            >
                              {selected && <Check className="h-3 w-3" />}
                            </span>
                            <span className={`text-sm ${selected ? 'text-gray-100' : 'text-gray-400'}`}>
                              {b}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Tool Ecosystem */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="mb-5 text-sm font-medium text-gray-300">
                      Which tools are in your core stack?
                      <span className="ml-2 font-normal text-gray-500">Select all that apply</span>
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {toolOptions.map((tool, i) => {
                        const selected = selectedTools.includes(i);
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => toggleTool(i)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                              selected
                                ? 'border-sky-400/40 bg-sky-500/15 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.1)]'
                                : 'border-charcoal-border bg-charcoal-base text-gray-400 hover:border-gray-600 hover:text-gray-300'
                            }`}
                          >
                            {selected && <Check className="mr-1.5 inline h-3.5 w-3.5" />}
                            {tool}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Hours Lost */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="mb-5 text-sm font-medium text-gray-300">
                      How many hours per person are lost to manual work each week?
                    </p>
                    <div className="flex flex-col gap-3">
                      {hoursOptions.map((opt, i) => {
                        const selected = selectedHours === i;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedHours(i)}
                            className={`group flex items-center justify-between rounded-xl border px-5 py-4 transition-all duration-200 ${
                              selected
                                ? 'border-sky-400/40 bg-sky-500/10 shadow-[0_0_16px_rgba(56,189,248,0.12)]'
                                : 'border-charcoal-border bg-charcoal-base hover:border-gray-600'
                            }`}
                          >
                            <span className={`text-sm font-medium ${selected ? 'text-gray-100' : 'text-gray-400'}`}>
                              {opt}
                            </span>
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-200 ${
                                selected
                                  ? 'border-sky-400 bg-sky-500'
                                  : 'border-gray-600 group-hover:border-gray-500'
                              }`}
                            >
                              {selected && <Check className="h-3 w-3 text-white" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact Info */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="mb-5 text-sm font-medium text-gray-300">
                      Where should we send your custom audit?
                    </p>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
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
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
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
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="mt-8 flex items-center justify-between gap-4">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="flex items-center gap-2 rounded-lg border border-charcoal-border bg-charcoal-base px-5 py-3 text-sm font-medium text-gray-400 transition-colors hover:border-gray-600 hover:text-gray-200"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                ) : (
                  <span />
                )}

                {step < totalSteps - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canProceed()}
                    className="glow-button group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <motion.button
                    type="submit"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.015 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    disabled={!canProceed()}
                    className="glow-button group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                  >
                    Request My Custom Automation Audit
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </motion.button>
                )}
              </div>
            </form>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Lock className="h-3.5 w-3.5 text-sky-400/60" />
                100% Confidential
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <ShieldX className="h-3.5 w-3.5 text-sky-400/60" />
                Zero Sales Spam
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Zap className="h-3.5 w-3.5 text-sky-400/60" />
                Delivered in 48h
              </span>
            </div>

            {/* Calendar fallback */}
            <div className="mt-6 border-t border-charcoal-border pt-6 text-center">
              <p className="text-sm text-gray-500">
                Need urgent review?{' '}
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 font-medium text-sky-400 transition-colors hover:text-sky-300"
                >
                  <Calendar className="h-4 w-4" />
                  Book a 20-minute call directly on Cal.com
                </a>
              </p>
            </div>
          </div>
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
