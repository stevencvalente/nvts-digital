import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float wave(vec2 p, float t, float freq, float speed) {
    return sin(p.x * freq + t * speed) * sin(p.y * freq * 0.8 + t * speed * 0.6);
  }

  void main() {
    vec2 uv = vUv;
    
    float w1 = wave(uv, uTime, 3.0, 0.3) * 0.5;
    float w2 = wave(uv + 0.5, uTime, 5.0, 0.2) * 0.3;
    float w3 = wave(uv * 1.5, uTime, 7.0, 0.15) * 0.2;
    
    float pattern = (w1 + w2 + w3) * 0.5 + 0.5;
    
    vec3 col = mix(
      vec3(0.035, 0.035, 0.06),
      vec3(0.06, 0.07, 0.12),
      pattern
    );
    
    // Subtle cyan tint on wave peaks
    col += vec3(0.0, 0.02, 0.03) * smoothstep(0.55, 0.75, pattern);
    
    gl_FragColor = vec4(col, 1.0);
  }
`;

function WavePlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

const WebGLBackground = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none">
    <Canvas dpr={[1, 1.5]} gl={{ antialias: false, alpha: false }}>
      <WavePlane />
    </Canvas>
  </div>
);

export default WebGLBackground;
