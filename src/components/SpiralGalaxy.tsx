import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 120;
const CONNECTION_DISTANCE = 1.8;
const SPREAD = 5;
const INSIDE_COLOR = new THREE.Color("#2235c9");
const OUTSIDE_COLOR = new THREE.Color("#fcfcfc");

function ConnectedNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const timeRef = useRef(0);

  const { nodes, nodeColors, basePositions } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const colors = new Float32Array(NODE_COUNT * 3);
    const base: { x: number; y: number; z: number; speedX: number; speedY: number; speedZ: number }[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * SPREAD;
      const y = (Math.random() - 0.5) * SPREAD * 0.7;
      const z = (Math.random() - 0.5) * SPREAD * 0.5;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      const dist = Math.sqrt(x * x + y * y + z * z);
      const maxDist = SPREAD * 0.5;
      const mixedColor = INSIDE_COLOR.clone().lerp(OUTSIDE_COLOR, Math.min(dist / maxDist, 1));

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      base.push({
        x, y, z,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        speedZ: (Math.random() - 0.5) * 0.08,
      });
    }

    return { nodes: positions, nodeColors: colors, basePositions: base };
  }, []);

  const maxLines = NODE_COUNT * NODE_COUNT;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    if (!pointsRef.current || !linesRef.current) return;

    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Animate nodes with gentle drift
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      const b = basePositions[i];
      posArr[i3] = b.x + Math.sin(t * b.speedX + i) * 0.4;
      posArr[i3 + 1] = b.y + Math.cos(t * b.speedY + i * 1.3) * 0.3;
      posArr[i3 + 2] = b.z + Math.sin(t * b.speedZ + i * 0.7) * 0.2;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Build connections
    let lineIdx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const i3 = i * 3;
        const j3 = j * 3;
        const dx = posArr[i3] - posArr[j3];
        const dy = posArr[i3 + 1] - posArr[j3 + 1];
        const dz = posArr[i3 + 2] - posArr[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const opacity = 1 - dist / CONNECTION_DISTANCE;
          const idx = lineIdx * 6;

          linePositions[idx] = posArr[i3];
          linePositions[idx + 1] = posArr[i3 + 1];
          linePositions[idx + 2] = posArr[i3 + 2];
          linePositions[idx + 3] = posArr[j3];
          linePositions[idx + 4] = posArr[j3 + 1];
          linePositions[idx + 5] = posArr[j3 + 2];

          const c = INSIDE_COLOR.clone().lerp(OUTSIDE_COLOR, 0.5);
          lineColors[idx] = c.r * opacity;
          lineColors[idx + 1] = c.g * opacity;
          lineColors[idx + 2] = c.b * opacity;
          lineColors[idx + 3] = c.r * opacity;
          lineColors[idx + 4] = c.g * opacity;
          lineColors[idx + 5] = c.b * opacity;

          lineIdx++;
        }
      }
    }

    // Zero out remaining
    for (let i = lineIdx * 6; i < linePositions.length; i++) {
      linePositions[i] = 0;
      lineColors[i] = 0;
    }

    const lineGeo = linesRef.current.geometry;
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIdx * 2);

    // Gentle rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0.1]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT}
            array={nodes}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={NODE_COUNT}
            array={nodeColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          sizeAttenuation
          depthWrite={false}
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxLines * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={maxLines * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

const SpiralGalaxy = () => {
  return (
    <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ConnectedNodes />
      </Canvas>
    </div>
  );
};

export default SpiralGalaxy;
