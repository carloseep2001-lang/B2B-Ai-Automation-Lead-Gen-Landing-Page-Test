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
    <div className="relative min-h-screen bg-charcoal-base antialiased">
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Background texture layers */}
      <div className="bg-dot-grid pointer-events-none fixed inset-0 z-0" />
      <div className="bg-noise pointer-events-none fixed inset-0 z-0 opacity-[0.015]" />

      {/* Section gradient transition: Hero -> Audience */}
      <div className="pointer-events-none absolute top-[80vh] left-0 z-0 h-[20vh] w-full bg-gradient-to-b from-transparent via-charcoal-base/50 to-charcoal-base" />

      {/* Section gradient transition: Audience -> AuditOffer */}
      <div className="pointer-events-none absolute top-[200vh] left-0 z-0 h-[20vh] w-full bg-gradient-to-b from-charcoal-base via-[#0d0d0d] to-charcoal-elevated" />

      {/* Section gradient transition: AuditOffer -> Process */}
      <div className="pointer-events-none absolute top-[320vh] left-0 z-0 h-[20vh] w-full bg-gradient-to-b from-charcoal-elevated via-[#0d0d0d] to-charcoal-base" />

      {/* Section gradient transition: Process -> FinalCTA */}
      <div className="pointer-events-none absolute top-[440vh] left-0 z-0 h-[20vh] w-full bg-gradient-to-b from-charcoal-base via-[#0d0d0d] to-charcoal-elevated" />

      {/* Content */}
      <div className="relative z-10">
        <Hero onRequestAudit={scrollToForm} />
        <Audience />
        <AuditOffer />
        <Process />
        <FinalCTA />
      </div>
    </div>
  );
}

export default App;
