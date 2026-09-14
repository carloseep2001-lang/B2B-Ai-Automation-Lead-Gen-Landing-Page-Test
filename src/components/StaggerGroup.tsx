import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
};

export default function StaggerGroup({ children, className = '' }: StaggerGroupProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
