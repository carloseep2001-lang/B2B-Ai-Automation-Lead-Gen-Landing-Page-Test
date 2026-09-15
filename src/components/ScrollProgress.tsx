import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#818CF8] shadow-[0_0_10px_rgba(56,189,248,0.7),0_0_4px_rgba(129,140,248,0.4)]"
      aria-hidden="true"
    />
  );
}
