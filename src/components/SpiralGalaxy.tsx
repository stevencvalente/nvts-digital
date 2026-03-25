import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 40000;
const BRANCHES = 5;
const RADIUS = 6;
const SPIN = 1;
const RANDOMNESS = 1.8;
const RANDOMNESS_POWER = 2.2;
const INSIDE_COLOR = new THREE.Color("#2235c9");
const OUTSIDE_COLOR = new THREE.Color("#fcfcfc");

function GalaxyParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const radius = Math.random() * RADIUS;
      const spinAngle = radius * SPIN;
      const branchAngle = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), RANDOMNESS_POWER) *
        (Math.random() < 0.5 ? 1 : -1) *
        RANDOMNESS *
        radius;
      const randomY =
        Math.pow(Math.random(), RANDOMNESS_POWER) *
        (Math.random() < 0.5 ? 1 : -1) *
        RANDOMNESS *
        radius;
      const randomZ =
        Math.pow(Math.random(), RANDOMNESS_POWER) *
        (Math.random() < 0.5 ? 1 : -1) *
        RANDOMNESS *
        radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = INSIDE_COLOR.clone();
      mixedColor.lerp(OUTSIDE_COLOR, radius / RADIUS);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef} rotation={[0.6, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const SpiralGalaxy = () => {
  return (
    <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 3, 7], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <GalaxyParticles />
      </Canvas>
    </div>
  );
};

export default SpiralGalaxy;
