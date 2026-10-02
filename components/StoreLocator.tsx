import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { FloatingDecorations } from './FloatingDecorations';

const stores = Array.from({ length: 12 }, (_, index) => ({ id: index + 1, name: 'Koranghad', phone: '+91 2562 253 3221' }));

export function StoreLocator() {
  return <section className="presentation-section locator-section" id="stores" aria-labelledby="locator-title">
    <FloatingDecorations page="store" />
    <div className="locator-halo" aria-hidden="true" />
    <div className="circle-line locator-orbit-top" aria-hidden="true" />
    <div className="circle-line locator-orbit-bottom" aria-hidden="true" />
    <Reveal className="locator-title-block"><h2 className="locator-title" id="locator-title">Store Locator</h2><p className="locator-subtitle">Search for a Sign Laban store near you.</p></Reveal>
    <div className="store-grid">{stores.map((store, index) => <Reveal key={store.id} delay={(index % 3) * .045}><a className="store-pill" href={`tel:${store.phone.replace(/\s/g, '')}`} aria-label={`${store.name} store, call ${store.phone}`}><span className="store-name">{store.name}</span><span className="store-phone">{store.phone}</span><ArrowUpRight className="store-arrow" size={16} aria-hidden="true" /></a></Reveal>)}</div>
  </section>;
}
