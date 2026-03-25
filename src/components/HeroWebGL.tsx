import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useCallback, useEffect } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    float baseNoise = snoise(position * 1.0 + uTime * 0.15) * 0.2
                    + snoise(position * 2.0 + uTime * 0.25) * 0.08;
    
    // Mouse proximity distortion
    float mouseInfluence = uHover * 0.15;
    vec3 mouseDir = normalize(vec3(uMouse, 0.0) - position);
    float mouseDist = length(vec3(uMouse, 0.0) - position);
    float mouseEffect = mouseInfluence * smoothstep(2.0, 0.0, mouseDist);
    
    float noise = baseNoise + mouseEffect;
    
    vec3 newPosition = position + normal * noise;
    vDisplacement = noise;
    vNormal = normalMatrix * normal;
    vPosition = (modelViewMatrix * vec4(newPosition, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uHover;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    // Muted, desaturated blue-grey palette
    vec3 baseColor = vec3(0.25, 0.35, 0.50);
    vec3 highlightColor = vec3(0.45, 0.55, 0.72);
    vec3 deepColor = vec3(0.10, 0.14, 0.22);
    
    // Subtle blue tint on hover
    vec3 hoverTint = vec3(0.15, 0.35, 0.75);

    vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
    float diffuse = max(dot(normalize(vNormal), lightDir), 0.0);
    
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(-vPosition))), 3.0);
    
    vec3 color = mix(deepColor, baseColor, diffuse * 0.6 + 0.3);
    color = mix(color, highlightColor, fresnel * 0.4);
    color += vDisplacement * 0.15 * highlightColor;
    
    // Blend in primary blue only on hover
    color = mix(color, hoverTint, uHover * fresnel * 0.3);
    
    float alpha = 0.22 + fresnel * 0.06 + uHover * 0.05;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

function MorphBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const hoverRef = useRef(0);
  const { gl } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0 },
    }),
    []
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = gl.domElement.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }, [gl]);

  const handleMouseEnter = useCallback(() => { hoverRef.current = 1; }, []);
  const handleMouseLeave = useCallback(() => { hoverRef.current = 0; }, []);

  useEffect(() => {
    const el = gl.domElement.parentElement;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [gl, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    uniforms.uTime.value = t;
    
    // Smooth mouse lerp
    uniforms.uMouse.value.lerp(mouseRef.current, 0.05);
    // Smooth hover transition
    uniforms.uHover.value += (hoverRef.current - uniforms.uHover.value) * 0.04;
    
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.05;
      meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.7}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroWebGL() {
  return (
    <div className="absolute top-0 right-0 w-[55%] h-full" style={{ pointerEvents: "auto" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <MorphBlob />
      </Canvas>
    </div>
  );
}
