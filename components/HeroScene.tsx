'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { SRGBColorSpace, TextureLoader, type Group } from 'three';

function FoodComposition() {
  const art = useLoader(TextureLoader, '/images/laban/hero-art-cutout.webp');
  const group = useRef<Group>(null);
  art.colorSpace = SRGBColorSpace;
  art.generateMipmaps = true;
  art.anisotropy = 4;
  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * .052 - group.current.rotation.y) * .045;
    group.current.rotation.x += (-pointer.y * .038 - group.current.rotation.x) * .045;
    group.current.position.y = Math.sin(clock.elapsedTime * .62) * .045;
  });
  return <mesh ref={group} position={[0, 0, 0]}>
    <planeGeometry args={[8, 6.28, 1, 1]} />
    <meshBasicMaterial map={art} toneMapped={false} />
  </mesh>;
}

export function HeroScene({ onReady }: { onReady: () => void }) {
  return <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 10], fov: 35 }} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }} onCreated={() => requestAnimationFrame(onReady)}><Suspense fallback={null}><FoodComposition /></Suspense></Canvas>;
}
