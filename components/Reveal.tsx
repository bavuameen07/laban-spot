'use client';

import { motion, useReducedMotion, type MotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export function Reveal({ children, className, delay = 0, ...props }: { children: ReactNode; className?: string; delay?: number } & Omit<MotionProps, 'children' | 'className'>) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: reduced ? 0 : 0.66, delay: reduced ? 0 : delay, ease: [0.2, 0.72, 0.24, 1] }} {...props}>{children}</motion.div>;
}
