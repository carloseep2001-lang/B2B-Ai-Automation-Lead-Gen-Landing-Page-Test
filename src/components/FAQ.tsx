import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: 'How much time will this audit require from my team?',
    answer:
      'Only the initial 20–30 minute discovery call. We do all the heavy lifting, workflow mapping, and documentation review.',
  },
  {
    question: 'Will you need access to our sensitive customer data or passwords?',
    answer:
      'Never. We examine workflow structure, API capabilities, and data flows — not your confidential customer records.',
  },
  {
    question: 'What tools and platforms do you support?',
    answer:
      'CRMs (Salesforce, HubSpot), internal databases, Slack, Google Workspace, Airtable, ERPs, accounting software, and modern AI APIs.',
  },
  {
    question: 'What happens after we receive the audit report?',
    answer:
      'The report is 100% yours to keep. You can implement the recommendations yourself, hire another team, or partner with us to build them.',
  },
  {
    question: 'What if our workflows are messy and undocumented?',
    answer:
      'That is normal and expected. The audit is designed to bring clarity to messy, disconnected systems.',
  },
  {
    question: 'Is this really free, or a sales pitch in disguise?',
    answer:
      'There is zero high-pressure sales pitch. We deliver a detailed written document with genuine standalone engineering value.',
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  shouldReduceMotion,
}: {
  faq: (typeof faqs)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <div className="border-b border-charcoal-border/70">
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/30 focus-visible:ring-inset rounded-lg px-2"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-4">
          <span className="text-xs font-medium tabular-nums text-gray-600">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[15px] font-medium tracking-tight text-gray-200 transition-colors duration-200 group-hover:text-white">
            {faq.question}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-charcoal-border bg-charcoal-base text-gray-500 transition-colors duration-200 group-hover:border-sky-400/30 group-hover:text-sky-400"
        >
          <Plus className="h-3.5 w-3.5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { height: 'auto', opacity: 0 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={shouldReduceMotion ? { height: 'auto', opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-2 pb-5 pl-11 text-pretty text-sm leading-relaxed text-gray-500">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="faq" className="relative px-6 py-[120px] md:py-[160px] overflow-x-clip">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/3 h-[400px] w-[400px] opacity-20 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.06), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-3xl"
      >
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            FAQ
          </p>
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-gray-50 md:text-4xl lg:text-5xl">
            Questions, answered
          </h2>
        </div>

        <div className="rounded-2xl border border-charcoal-border bg-charcoal-elevated/50 px-5 md:px-8">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
