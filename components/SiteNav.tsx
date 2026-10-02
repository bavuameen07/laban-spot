'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const items = [
  { label: 'HOME', href: '#home', section: 'home' },
  { label: 'SERVICES', href: '#story', section: 'story' },
  { label: 'SIGNATURES', href: '#products', section: 'products' },
  { label: 'DESSERTS', href: '#products', section: 'products' },
];

export function SiteNav() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const sections = [...new Set([...items.map((item) => item.section), 'stores'])].map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.2, 0.5, 0.8] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <header className={`laban-nav-shell${active === 'home' ? '' : ' condensed'}`}><div className="laban-nav">
    <a className="laban-brand" href="#home" aria-label="The Laban Spot home" onClick={() => setMenuOpen(false)}><Image src="/images/laban/laban-logo.png" alt="The Laban Spot" fill sizes="180px" priority /></a>
    <nav className="nav-pill" aria-label="Main navigation">{items.map((item, index) => <a key={`${item.label}-${index}`} className={`nav-link${item.section === active && (item.label === 'HOME' || item.label === 'SERVICES' || index === 2) ? ' active' : ''}${index > 0 ? ' nav-wide' : ''}`} href={item.href}>{item.label}</a>)}</nav>
    <button className="nav-menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="laban-mobile-nav" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
    <AnimatePresence>{menuOpen && <motion.nav id="laban-mobile-nav" className="nav-mobile" aria-label="Mobile navigation" initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduced ? 0 : .2 }}>{items.map((item, index) => <a key={`${item.label}-mobile-${index}`} className={`nav-link${item.section === active && (item.label === 'HOME' || item.label === 'SERVICES' || index === 2) ? ' active' : ''}`} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</motion.nav>}</AnimatePresence>
  </div></header>;
}
