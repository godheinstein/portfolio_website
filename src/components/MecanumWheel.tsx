import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function WheelModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF("/assets/mecanum_wheel.glb");

  const mecanumScene = useMemo(() => {
    const clonedScene = gltf.scene.clone(true);

    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    // Standing + slightly angled
    clonedScene.rotation.set(0, Math.PI / 4, Math.PI / 12);

    // Scale (tune as needed)
    clonedScene.scale.setScalar(75);

    return clonedScene;
  }, [gltf.scene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Scroll-based rotation (choose axis you want)
    groupRef.current.rotation.x = scrollProgress * Math.PI * 4;

    // slow turntable spin
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.25;

    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <primitive object={mecanumScene} dispose={null} />
    </group>
  );
}

export default function MecanumWheel({
  scrollProgress = 0,
}: {
  scrollProgress?: number;
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [6, 4, 6], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.6;
        }}
      >
        <ambientLight intensity={0.9} />

        <directionalLight
          position={[8, 10, 6]}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <directionalLight
          position={[0, 12, 0]}   // directly above
          intensity={1.5}
          castShadow={false}      // usually OFF for fill
        />

        <directionalLight
          position={[-6, 4, -6]}
          intensity={1.5}
          color="#4da3ff"
        />

        <Environment preset="studio" intensity={1.2} />

        <Suspense fallback={null}>
          <WheelModel scrollProgress={scrollProgress} />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/assets/mecanum_wheel.glb");
