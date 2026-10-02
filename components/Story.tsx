import Image from 'next/image';
import { Reveal } from './Reveal';
import { FloatingDecorations } from './FloatingDecorations';

const founders = [
  { src: 'founder-one.webp', alt: 'Founder of The Laban Spot' },
  { src: 'founder-two.webp', alt: 'Co-founder of The Laban Spot' },
  { src: 'founder-three.webp', alt: 'Co-founder of The Laban Spot' },
  { src: 'founder-four.webp', alt: 'Founder of The Laban Spot' },
];

const story = 'We bring the rich heritage of authentic Egyptian sweets to life with every bite. Crafted from time-honored recipes and the finest ingredients, our signature desserts are loved for their creamy texture, premium quality and unforgettable taste. Our legacy began in 1940 with the iconic Farsa Restaurant, a name deeply rooted in culinary excellence. Building on this heritage, we launched Sign Restaurant in 2019, followed by Sign Café and Thekyrat Arabic Restaurant in 2023. In July 2024, Sign Laban was introduced as a unique dessert destination bringing the authentic taste of Egypt to India. Today, with 50+ outlets across Kerala and a growing presence in Karnataka, Sign Laban has become the fastest-growing dessert brand. With overwhelming customer love and support, we are now expanding even further with upcoming outlets in Hyderabad and Mumbai. Behind every dessert is a passionate and expertly trained team dedicated to preserving authenticity while embracing innovation. At Sign Laban, we don’t just serve desserts, we create experiences where tradition, culture and sweetness come together in every bite.';

export function Story() {
  return <section className="presentation-section story-section blue-field" id="story" aria-labelledby="story-title">
    <FloatingDecorations page="story" />
    <Reveal className="story-title"><h2 id="story-title">OUR STORY</h2></Reveal>
    <Reveal className="story-photo" delay={.08}><Image src="/images/laban/story-photo.webp" alt="A Laban Spot team member presenting a collection of signature dessert gift boxes" fill sizes="(max-width: 760px) 100vw, 41vw" /></Reveal>
    <Reveal className="story-copy" delay={.17}><p>{story}</p></Reveal>
    <div className="founders"><Reveal><h3>FOUNDERS</h3></Reveal><div className="founder-grid">{founders.map((founder, index) => <Reveal key={founder.src} delay={index * .1}><div className="founder-photo"><Image src={`/images/laban/${founder.src}`} alt={founder.alt} fill sizes="(max-width: 760px) 42vw, 12vw" /></div></Reveal>)}</div></div>
  </section>;
}
