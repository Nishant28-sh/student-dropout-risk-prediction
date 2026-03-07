'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ risk }) {
  const sphereRef = useRef();
  const materialRef = useRef();

  const colorMap = {
    'HIGH': '#ef4444',    // var(--red)
    'MEDIUM': '#f59e0b',  // var(--yellow)
    'LOW': '#10b981',     // var(--green)
    'default': '#2563eb'  // var(--accent)
  };
  
  const emissiveMap = {
    'HIGH': '#4f0a0a',
    'MEDIUM': '#4f3000',
    'LOW': '#0a4f20',
    'default': '#0a204f'
  };

  const targetColor = useMemo(() => new THREE.Color(colorMap[risk] || colorMap['default']), [risk]);
  const targetEmissive = useMemo(() => new THREE.Color(emissiveMap[risk] || emissiveMap['default']), [risk]);

  useEffect(() => {
    if (materialRef.current && !risk) {
      materialRef.current.color.copy(targetColor);
      materialRef.current.emissive.copy(targetEmissive);
    }
  }, [targetColor, targetEmissive, risk]);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      // Slow rotation on Y axis
      sphereRef.current.rotation.y += delta * 0.15;
      sphereRef.current.rotation.x += delta * 0.05;
      
      const time = state.clock.elapsedTime;
      // Gentle breathing scale every 3s (Math.sin goes -1 to 1)
      const breath = Math.sin(time * (Math.PI * 2 / 3));
      const scale = 1.03 + breath * 0.03;
      sphereRef.current.scale.set(scale, scale, scale);

      if (materialRef.current) {
        // Color transition lerp
        materialRef.current.color.lerp(targetColor, 0.03);
        materialRef.current.emissive.lerp(targetEmissive, 0.03);
        
        // Emissive glow intensity pulses with the breathing
        materialRef.current.emissiveIntensity = 0.5 + breath * 0.3; // 0.2 to 0.8
      }
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1.5, 64, 64]}>
      <MeshDistortMaterial
        ref={materialRef}
        color={colorMap['default']}
        emissive={emissiveMap['default']}
        emissiveIntensity={0.5}
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.15}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </Sphere>
  );
}

export default function RiskSphere({ risk }) {
  const glowColor = risk === 'HIGH' ? 'var(--red-glow)' : risk === 'MEDIUM' ? 'var(--yellow-glow)' : risk === 'LOW' ? 'var(--green-glow)' : 'var(--accent-glow)';
  
  return (
    <div className="w-[400px] h-[400px] flex items-center justify-center relative z-10 group">
      <Canvas camera={{ position: [0, 0, 4.5] }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />
        <AnimatedSphere risk={risk} />
      </Canvas>
      {/* Decorative glows behind canvas */}
      <div 
        className="absolute inset-0 opacity-40 rounded-full blur-[80px] -z-10 mix-blend-screen scale-110 transition-colors duration-1000 pointer-events-none" 
        style={{ backgroundColor: glowColor }}
      />
    </div>
  );
}
