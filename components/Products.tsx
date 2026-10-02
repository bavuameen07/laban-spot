'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from './Reveal';
import { FloatingDecorations } from './FloatingDecorations';

const products = [
  { position: 'dessert-1', color: 'cream', delay: .05 },
  { position: 'dessert-2', color: 'blue', delay: .13 },
  { position: 'dessert-3', color: 'cream', delay: .21 },
  { position: 'dessert-4', color: 'blue', delay: .08 },
  { position: 'dessert-5', color: 'blue', delay: .18 },
  { position: 'dessert-6', color: 'cream', delay: .26 },
  { position: 'dessert-7', color: 'cream', delay: .32 },
];

export function Products() {
  const reduced = useReducedMotion();
  return <section className="presentation-section products-section blue-field" id="products" aria-labelledby="products-title">
    <FloatingDecorations page="products" />
    <Reveal className="products-title"><h2 id="products-title">OUR<br />PRODUCTS</h2></Reveal>
    <motion.div className="products-environment" aria-hidden="true" animate={reduced ? undefined : { y: [0, -5, 0] }} transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}><Image src="/images/laban/product-environment.webp" alt="" fill sizes="(max-width: 760px) 116vw, 52vw" /></motion.div>
    {products.map((product, index) => <motion.button key={product.position} type="button" className={`dessert-orbit ${product.position}`} aria-label={`Signature Laban dessert ${index + 1}`} initial={reduced ? false : { opacity: 0, scale: .86, rotate: index % 2 ? 4 : -4 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true, amount: .14 }} transition={{ duration: reduced ? 0 : .6, delay: reduced ? 0 : product.delay, ease: [.2, .72, .24, 1] }} whileHover={reduced ? undefined : { scale: 1.075, rotateX: 5, rotateY: index % 2 ? -5 : 5, z: 16 }} whileTap={reduced ? undefined : { scale: .97 }}><Image src={`/images/laban/dessert-${product.color}.webp`} alt="" fill sizes="(max-width: 760px) 30vw, 16vw" /></motion.button>)}
  </section>;
}
