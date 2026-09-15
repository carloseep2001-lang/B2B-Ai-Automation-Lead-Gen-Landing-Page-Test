import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FileSpreadsheet, Table, Database, Mail, Zap, BrainCircuit, RefreshCw, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

type Mode = 'manual' | 'automated';

const manualSteps = [
  { icon: FileSpreadsheet, label: 'Form CSV export', detail: 'Manual download & formatting' },
  { icon: Table, label: 'Spreadsheet formatting', detail: 'Hand-sorting & cleaning rows' },
  { icon: Database, label: 'Manual CRM entry', detail: 'Copy-pasting field by field' },
  { icon: Mail, label: 'Manual email ping', detail: 'Typing follow-up individually' },
];

const automatedSteps = [
  { icon: Zap, label: 'Instant Webhook Trigger', detail: 'Form submission fires in real-time' },
  { icon: BrainCircuit, label: 'AI Enrichment & Scoring', detail: 'Auto-categorize, enrich, prioritize' },
  { icon: RefreshCw, label: 'CRM Sync & Slack Ping', detail: 'Real-time database + team notification' },
];

export default function WorkflowTeaser() {
  const [mode, setMode] = useState<Mode>('automated');
  const shouldReduceMotion = useReducedMotion();

  const isManual = mode === 'manual';
  const steps = isManual ? manualSteps : automatedSteps;

  return (
    <section className="relative px-6 py-16 md:py-20 overflow-x-clip">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            See the difference
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-gray-50 md:text-3xl">
            The same workflow, before and after automation
          </h2>
        </motion.div>

        {/* Toggle */}
        <div className="mb-10 flex items-center justify-center">
          <div className="relative flex items-center rounded-full border border-charcoal-border bg-charcoal-elevated p-1">
            <button
              onClick={() => setMode('manual')}
              className={`relative z-10 rounded-full px-5 py-2 text-xs font-medium transition-colors duration-200 sm:px-6 sm:text-sm ${
                isManual ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Manual Drag
            </button>
            <button
              onClick={() => setMode('automated')}
              className={`relative z-10 rounded-full px-5 py-2 text-xs font-medium transition-colors duration-200 sm:px-6 sm:text-sm ${
                !isManual ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Automated Pipeline
            </button>
            <motion.div
              layout
              className="absolute inset-y-1 rounded-full"
              initial={false}
              animate={{
                left: isManual ? '4px' : '50%',
                right: isManual ? '50%' : '4px',
                backgroundColor: isManual
                  ? 'rgba(239, 68, 68, 0.2)'
                  : 'rgba(56, 189, 248, 0.2)',
                boxShadow: isManual
                  ? '0 0 16px rgba(239, 68, 68, 0.3)'
                  : '0 0 16px rgba(56, 189, 248, 0.3)',
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: 'auto' }}
            />
          </div>
        </div>

        {/* Pipeline visualization */}
        <div className="relative overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-elevated p-6 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[80px] transition-colors duration-500"
            style={{
              background: isManual
                ? 'radial-gradient(circle, rgba(239, 68, 68, 0.1), transparent 70%)'
                : 'radial-gradient(circle, rgba(56, 189, 248, 0.12), transparent 70%)',
            }}
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Steps */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {steps.map((step, i) => (
                  <div key={i} className="flex flex-1 items-center gap-4 md:flex-col md:text-center">
                    {/* Connector arrow */}
                    {i > 0 && (
                      <div
                        className={`hidden md:block h-px flex-1 self-center ${
                          isManual ? 'bg-gray-700' : 'bg-gradient-to-r from-sky-400/40 to-sky-400/60'
                        }`}
                      >
                        {isManual ? null : (
                          <div className="h-full w-full bg-gradient-to-r from-sky-400/50 to-sky-400/70 shadow-[0_0_6px_rgba(56,189,248,0.4)]" />
                        )}
                      </div>
                    )}
                    {i > 0 && (
                      <div
                        className={`md:hidden h-px w-6 self-start ${
                          isManual ? 'bg-gray-700' : 'bg-sky-400/50'
                        }`}
                      />
                    )}

                    {/* Step node */}
                    <div className="flex flex-1 items-center gap-3 md:flex-col md:gap-2">
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                          isManual
                            ? 'border-gray-700 bg-gray-800/50'
                            : 'border-sky-400/30 bg-sky-500/10 shadow-[0_0_14px_rgba(56,189,248,0.2)]'
                        }`}
                      >
                        <step.icon
                          className={`h-5 w-5 ${
                            isManual ? 'text-gray-500' : 'text-sky-400'
                          }`}
                        />
                      </div>
                      <div className="md:mt-1">
                        <p
                          className={`text-sm font-medium tracking-tight ${
                            isManual ? 'text-gray-400' : 'text-gray-100'
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-600">{step.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Metrics tags */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-charcoal-border pt-6">
                <div
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium ${
                    isManual
                      ? 'border border-red-500/20 bg-red-500/10 text-red-400'
                      : 'border border-sky-400/20 bg-sky-500/10 text-sky-400'
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  {isManual ? '~4.5 hrs average delay' : '< 2.3 seconds end-to-end'}
                </div>
                <div
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium ${
                    isManual
                      ? 'border border-red-500/20 bg-red-500/10 text-red-400'
                      : 'border border-emerald-400/20 bg-emerald-500/10 text-emerald-400'
                  }`}
                >
                  {isManual ? (
                    <>
                      <AlertTriangle className="h-3.5 w-3.5" />
                      High human error risk
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="h-3.5 w-3.5" />
                      0% human entry error
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Summary indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          {isManual ? (
            <>
              <AlertTriangle className="h-4 w-4 text-red-500/70" />
              <span>4 fragmented manual steps — slow, error-prone, time-consuming</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4 text-sky-400/80" />
              <span>3 streamlined steps — instant, reliable, fully automated</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
