'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';

type HeartKind = 'biscoff' | 'cream' | 'chocolate';
const confetti = [
  [10.2, 22, 3, -18], [12.4, 24.2, 4, 18], [12.9, 28.1, 3, -10], [25.3, 46, 4, 12], [27.1, 43.6, 3, -14], [30.8, 48.2, 5, 15],
  [73.1, 24.7, 4, 9], [75.7, 27.4, 5, -9], [77.4, 21.5, 3, 17], [80, 14.1, 4, -10], [86.2, 11.2, 4, 19], [88.7, 16.6, 5, -18],
  [72.2, 66, 4, 14], [75.1, 68.5, 3, -12], [78.3, 73.2, 4, 11], [94.2, 62, 4, -12], [91.7, 67.4, 3, 15], [18, 68, 4, -9],
];

function Heart({ kind, className, delay = 0, rotation = 0 }: { kind: HeartKind; className: string; delay?: number; rotation?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={`heart ${className} heart-${kind}`} aria-hidden="true" animate={reduced ? undefined : { y: [0, -10, 0], rotate: [rotation, rotation + 2, rotation] }} transition={{ duration: 5.5, delay, repeat: Infinity, ease: 'easeInOut' }}><svg viewBox="0 0 140 130" role="presentation"><path d="M70 119 18 70C-4 45 11 12 41 12c14 0 24 8 29 19 7-12 18-19 32-19 30 0 43 33 21 58Z" /></svg></motion.div>;
}

export function FloatingDecorations({ page = 'hero' }: { page?: 'hero' | 'story' | 'products' | 'store' }) {
  const reduced = useReducedMotion();
  return <>
    {(page === 'hero' || page === 'products') && <div className="confetti" aria-hidden="true">{confetti.map(([left, top, size, angle], index) => <motion.i key={index} className="confetti-piece" style={{ left: `${left}%`, top: `${top}%`, '--piece': `${size}px`, rotate: `${angle}deg` } as CSSProperties} animate={reduced ? undefined : { y: [0, index % 2 ? -8 : 7, 0], x: [0, index % 3 ? 2 : -3, 0], rotate: [angle, angle + 7, angle] }} transition={{ duration: 4 + (index % 4) * .7, delay: index * .09, repeat: Infinity, ease: 'easeInOut' }} />)}</div>}
    {page === 'hero' && <>
      <Heart kind="biscoff" className="heart-left" delay={.2} rotation={-12} /><Heart kind="cream" className="heart-top-right" delay={1.1} rotation={-9} /><Heart kind="cream" className="heart-right" delay={.6} rotation={11} /><Heart kind="chocolate" className="heart-bottom-right" delay={1.8} rotation={-10} />
    </>}
    {page === 'story' && <><div className="circle-line story-orbit-one" /><div className="circle-line story-orbit-two" /></>}
    {page === 'products' && <><div className="circle-line products-orbit-one" /><div className="circle-line products-orbit-two" /></>}
  </>;
}
