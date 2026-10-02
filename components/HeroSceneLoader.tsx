'use client';

import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('./HeroScene').then((module) => module.HeroScene), { ssr: false, loading: () => null });

export function HeroSceneLoader({ onReady }: { onReady: () => void }) { return <HeroScene onReady={onReady} />; }
