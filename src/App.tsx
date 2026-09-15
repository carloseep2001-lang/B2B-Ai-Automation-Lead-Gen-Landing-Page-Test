import Hero from './components/Hero';
import Audience from './components/Audience';
import AuditOffer from './components/AuditOffer';
import Process from './components/Process';
import FinalCTA from './components/FinalCTA';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const scrollToForm = () => {
    document.getElementById('audit-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="relative min-h-screen bg-charcoal-base antialiased selection:bg-accent/30 selection:text-white">
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Fixed background texture layers */}
      <div className="bg-dot-grid pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      <div className="bg-noise pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay" aria-hidden="true" />

      {/* Content */}
      <main className="relative z-10">
        <Hero onRequestAudit={scrollToForm} />
        <Audience />
        <AuditOffer />
        <Process />
        <FinalCTA />
      </main>
    </div>
  );
}

export default App;
