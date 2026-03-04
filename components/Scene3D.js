"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Particles({ count = 5000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 50;
      p[i * 3 + 1] = (Math.random() - 0.5) * 50;
      p[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return p;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#3b82f6"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function GlowPoints() {
  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[10, 10, -10]}>
          <sphereGeometry args={[5, 32, 32]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={1} floatIntensity={3}>
        <mesh position={[-15, -10, -5]}>
          <sphereGeometry args={[8, 32, 32]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.03} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Background() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "#0f172a",
      }}
    >
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <Particles />
        <GlowPoints />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}
