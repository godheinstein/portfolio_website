import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function WheelModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Scroll-based rotation (wheel rolling effect)
    // Rotates around local X-axis to simulate rolling
    groupRef.current.rotation.x = scrollProgress * Math.PI * 4;

    // Subtle floating animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Main wheel body */}
      <mesh castShadow>
        <cylinderGeometry args={[2, 2, 1, 32]} />
        <meshStandardMaterial
          color="#2c2c2c"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Rollers (mecanum wheel characteristic) - angled at 45 degrees */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 2;
        const z = Math.sin(angle) * 2;
        
        return (
          <group key={i} position={[x, 0, z]} rotation={[0, angle + Math.PI / 2, Math.PI / 4]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
              <meshStandardMaterial
                color="#1a1a1a"
                metalness={0.3}
                roughness={0.7}
              />
            </mesh>
          </group>
        );
      })}

      {/* Center hub */}
      <mesh castShadow>
        <cylinderGeometry args={[0.8, 0.8, 1.2, 32]} />
        <meshStandardMaterial
          color="#0d203b"
          metalness={0.9}
          roughness={0.1}
          emissive="#0d203b"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Hub details - spokes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={`spoke-${i}`}
            position={[Math.cos(angle) * 1.2, 0, Math.sin(angle) * 1.2]}
            rotation={[0, angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.8, 0.1, 0.1]} />
            <meshStandardMaterial
              color="#0d203b"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function MecanumWheel({ scrollProgress = 0 }: { scrollProgress?: number }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ 
          position: [6, 4, 6], // Isometric-like view (45° angle)
          fov: 45 
        }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0d203b" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
          color="#0d203b"
        />

        {/* Wheel Model */}
        <WheelModel scrollProgress={scrollProgress} />

        {/* Ground plane for shadow */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.3} />
        </mesh>

        {/* OrbitControls for interactive exploration */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
