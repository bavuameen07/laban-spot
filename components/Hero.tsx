'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FloatingDecorations } from './FloatingDecorations';
import { HeroSceneLoader } from './HeroSceneLoader';

export function Hero() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [threeEnabled, setThreeEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 761px)');
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const capable = memory === undefined || memory >= 4;
    const update = () => setThreeEnabled(desktop.matches && capable && !reduced);
    update();
    desktop.addEventListener('change', update);
    return () => desktop.removeEventListener('change', update);
  }, [reduced]);

  return <section className="presentation-section hero-section blue-field" id="home" aria-labelledby="hero-title">
    <FloatingDecorations />
    <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .75, delay: reduced ? 0 : .12, ease: [.2, .72, .24, 1] }}>
      <h1 className="hero-heading" id="hero-title">A PYRAMID OF<br />PURE INDULGENCE.</h1>
      <div className="hero-cream" aria-label="Creamy. Crunchy."><span>CREAMY</span><span>CRUNCHY</span></div>
    </motion.div>
    <motion.div className="hero-scene" initial={reduced ? false : { opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduced ? 0 : .9, delay: reduced ? 0 : .24 }}>
      <div className={`hero-scene-poster${ready && threeEnabled ? ' is-hidden' : ''}`}><Image src="/images/laban/hero-art-cutout.webp" alt="The Laban Spot's red Lotus Biscoff dessert box above the Laban panda mascot" fill sizes="(max-width: 760px) 96vw, 42vw" priority /></div>
      {threeEnabled && <div className="hero-scene-canvas" aria-label="Interactive dimensional Laban dessert composition"><HeroSceneLoader onReady={() => setReady(true)} /></div>}
    </motion.div>
    <motion.a className="order-pill" href="#products" whileHover={reduced ? undefined : { scale: 1.035, y: -3 }} whileTap={reduced ? undefined : { scale: .98 }}>ORDER NOW</motion.a>
  </section>;
}
