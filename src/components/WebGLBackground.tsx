import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 800;

function FloatingGrid() {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speeds[i] = 0.1 + Math.random() * 0.3;
    }
    return { positions, speeds };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3 + 1] += Math.sin(t * speeds[i] + i) * 0.002;
      pos[i3] += Math.cos(t * speeds[i] * 0.5 + i) * 0.001;
    }
    geo.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = t * 0.015;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00e5ff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WireframeSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.03;
    ref.current.rotation.y = t * 0.05;
  });

  return (
    <mesh ref={ref} position={[6, 0, -5]}>
      <icosahedronGeometry args={[3, 1]} />
      <meshBasicMaterial
        color="#a855f7"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function WireframeTorus() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.04;
    ref.current.rotation.z = t * 0.02;
  });

  return (
    <mesh ref={ref} position={[-7, -3, -8]}>
      <torusGeometry args={[2.5, 0.3, 16, 40]} />
      <meshBasicMaterial
        color="#00e5ff"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

const WebGLBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <FloatingGrid />
        <WireframeSphere />
        <WireframeTorus />
      </Canvas>
    </div>
  );
};

export default WebGLBackground;
