import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Camera rig — smooth lerp + subtle mouse parallax                  */
/* ------------------------------------------------------------------ */
function CameraRig({ activeReel }: { activeReel: number }) {
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    switch (activeReel) {
      case 0:  targetPos.set(0, 0, 5.5);    targetLook.set(0, 0, 0);       break;
      case 1:  targetPos.set(1.5, 0.5, 6.0); targetLook.set(0.5, 0, 0);   break;
      case 2:  targetPos.set(-1.5, -0.5, 5.5); targetLook.set(-0.2, 0.2, 0); break;
      case 3:  targetPos.set(0, -1.0, 6.5); targetLook.set(0, -0.2, 0);    break;
      case 4:  targetPos.set(0, 0.5, 5.0);  targetLook.set(0, 0.1, 0);     break;
      default: targetPos.set(0, 0, 5.5);    targetLook.set(0, 0, 0);
    }

    const mouseOffset = new THREE.Vector3(
      state.pointer.x * 0.3,
      state.pointer.y * 0.3,
      0,
    );
    state.camera.position.lerp(targetPos.clone().add(mouseOffset), 0.03);

    const currentLook = new THREE.Vector3(0, 0, 0);
    currentLook.lerp(targetLook, 0.04);
    state.camera.lookAt(currentLook);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Focal 3D object — glass icosahedron + inner glow + orbiting ring  */
/* ------------------------------------------------------------------ */
function HeroFocalObject() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.1;
      outerRef.current.rotation.y += delta * 0.16;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.22;
      innerRef.current.rotation.z += delta * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.06;
      ringRef.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={1.1}>
      <group>
        {/* Outer Glass Icosahedron */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.8, 0]} />
          <meshPhysicalMaterial
            roughness={0.04}
            transmission={0.93}
            thickness={2}
            ior={1.5}
            color="#e0e7ff"
            transparent
            opacity={0.45}
            envMapIntensity={1}
          />
        </mesh>

        {/* Inner Glowing Core */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#6d28d9"
            emissiveIntensity={2.2}
            roughness={0.12}
            metalness={0.9}
          />
        </mesh>

        {/* Orbiting Cyan Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.012, 16, 120]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={1.8}
            transparent
            opacity={0.55}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene canvas                                                      */
/* ------------------------------------------------------------------ */
export default function Scene({ activeReel }: { activeReel: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Ambient */}
        <ambientLight intensity={0.35} />

        {/* Key + fill lights */}
        <directionalLight position={[5, 5, 5]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />

        {/* Coloured point accents */}
        <pointLight position={[3, 2, 4]} intensity={0.7} color="#06b6d4" distance={15} />
        <pointLight position={[-3, -2, -4]} intensity={0.4} color="#f43f5e" distance={12} />

        <CameraRig activeReel={activeReel} />
        <HeroFocalObject />

        {/* Dual-colour ambient particles */}
        <Sparkles count={70} scale={12} size={2} speed={0.12} color="#8b5cf6" opacity={0.14} />
        <Sparkles count={25} scale={9} size={1.5} speed={0.07} color="#22d3ee" opacity={0.08} />
      </Canvas>
    </div>
  );
}
