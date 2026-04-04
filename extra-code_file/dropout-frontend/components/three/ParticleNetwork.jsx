'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const { mouse, viewport } = useThree();
  const pointsRef = useRef();
  const linesRef = useRef();
  const count = 150;
  const maxDistance = 2.5;

  const { positions, velocities, phases, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const phs = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const color1 = new THREE.Color('#2563eb'); 
    const color2 = new THREE.Color('#7c5cbf'); 

    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

        vel[i * 3] = (Math.random() - 0.5) * 0.015;     
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.015;

        phs[i * 3] = Math.random() * Math.PI * 2;
        phs[i * 3 + 1] = Math.random() * Math.PI * 2;
        phs[i * 3 + 2] = Math.random() * Math.PI * 2;

        const mixRatio = Math.random();
        const mixedColor = color1.clone().lerp(color2, mixRatio);
        col[i * 3] = mixedColor.r;
        col[i * 3 + 1] = mixedColor.g;
        col[i * 3 + 2] = mixedColor.b;
    }
    return { positions: pos, velocities: vel, phases: phs, colors: col };
  }, [count]);

  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ 
    color: 0x3b82f6, 
    transparent: true, 
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }), []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;
    
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const posArray = positionsAttr.array;
    const time = state.clock.elapsedTime;
    
    const targetX = (mouse.x * viewport.width) / 10;
    const targetY = (mouse.y * viewport.height) / 10;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      posArray[idx] += velocities[idx];
      posArray[idx + 1] += velocities[idx + 1];
      posArray[idx + 2] += velocities[idx + 2];
      
      posArray[idx] += Math.sin(time * 0.5 + phases[idx]) * 0.003;
      posArray[idx + 1] += Math.cos(time * 0.3 + phases[idx + 1]) * 0.003;

      if (Math.abs(posArray[idx]) > 12) posArray[idx] *= -0.9;
      if (Math.abs(posArray[idx + 1]) > 12) posArray[idx + 1] *= -0.9;
      if (Math.abs(posArray[idx + 2]) > 8) posArray[idx + 2] *= -0.9;
    }
    
    pointsRef.current.rotation.x += (targetY * 0.02 - pointsRef.current.rotation.x) * 0.02;
    pointsRef.current.rotation.y += (targetX * 0.02 - pointsRef.current.rotation.y) * 0.02;
    linesRef.current.rotation.copy(pointsRef.current.rotation);

    positionsAttr.needsUpdate = true;

    const linePositions = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          linePositions.push(
            posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
            posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
          );
        }
      }
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.06} 
          vertexColors 
          transparent 
          opacity={0.8} 
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </>
  );
}

export default function ParticleNetwork() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto mix-blend-screen opacity-70">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true }}>
        <Particles />
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />
    </div>
  );
}
