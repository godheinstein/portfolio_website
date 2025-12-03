# Mecanum Wheel Model Editing Guide

## Overview

The Mecanum wheel is a procedurally generated 3D model created using Three.js geometry primitives. It's defined in the file:

```
client/src/components/MecanumWheel.tsx
```

## File Structure

The component consists of two main parts:

1. **WheelModel Component**: Contains the 3D geometry and animation logic
2. **MecanumWheel Component**: Sets up the Three.js Canvas, camera, lighting, and controls

## Editing the Wheel Geometry

### Main Wheel Body

Located in the `WheelModel` component around line 20:

```tsx
<mesh castShadow>
  <cylinderGeometry args={[2, 2, 1, 32]} />
  <meshStandardMaterial
    color="#2c2c2c"
    metalness={0.8}
    roughness={0.2}
  />
</mesh>
```

**Parameters to modify:**
- `args={[radiusTop, radiusBottom, height, radialSegments]}`
  - `radiusTop`: 2 (top radius of cylinder)
  - `radiusBottom`: 2 (bottom radius)
  - `height`: 1 (thickness of wheel)
  - `radialSegments`: 32 (smoothness - higher = smoother)
- `color`: "#2c2c2c" (hex color code)
- `metalness`: 0.8 (0-1, how metallic it looks)
- `roughness`: 0.2 (0-1, how rough the surface is)

### Rollers (Mecanum Characteristic)

Located around line 30:

```tsx
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
```

**Parameters to modify:**
- `length: 12` - Number of rollers around the wheel
- `rotation={[0, angle + Math.PI / 2, Math.PI / 4]}` - The last value (Math.PI / 4) is the 45° angle characteristic of mecanum wheels
- Roller geometry `args={[0.15, 0.15, 1.2, 16]}`:
  - First two values: roller radius
  - Third value: roller length
  - Fourth value: smoothness

### Center Hub

Located around line 45:

```tsx
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
```

**Parameters to modify:**
- Hub size via `args` parameter
- `color` and `emissive` for the glowing blue effect
- `emissiveIntensity` controls glow strength

### Hub Spokes

Located around line 55:

```tsx
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
```

**Parameters to modify:**
- `length: 6` - Number of spokes
- `boxGeometry args={[0.8, 0.1, 0.1]}` - Spoke dimensions [length, height, width]

## Camera and View Settings

Located in the `MecanumWheel` component around line 75:

```tsx
<Canvas
  camera={{ 
    position: [6, 4, 6], // Isometric-like view (45° angle)
    fov: 45 
  }}
```

**Parameters to modify:**
- `position: [x, y, z]` - Camera position (current is isometric view)
- `fov: 45` - Field of view (lower = more zoomed in)

## Animation Settings

Located in the `useFrame` hook around line 10:

```tsx
useFrame((state) => {
  if (!groupRef.current) return;

  // Scroll-based rotation (wheel rolling effect)
  groupRef.current.rotation.x = scrollProgress * Math.PI * 4;

  // Subtle floating animation
  groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
});
```

**Parameters to modify:**
- `scrollProgress * Math.PI * 4` - Controls rotation speed (higher multiplier = more rotations per scroll)
- `0.5` in floating animation - Speed of bobbing motion
- `0.1` in floating animation - Amplitude of bobbing motion

## Lighting

Located around line 80:

```tsx
<ambientLight intensity={0.4} />
<directionalLight
  position={[10, 10, 5]}
  intensity={1.2}
  castShadow
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
```

**Parameters to modify:**
- `intensity` values - Brightness of each light
- `position` arrays - Light positions
- `color` - Light color (affects mood)

## Using External 3D Models

If you want to replace the procedural model with a custom 3D file (e.g., from CAD software):

1. Export your model as `.glb` or `.gltf` format
2. Place the file in `client/public/assets/models/`
3. Use the `useGLTF` hook from `@react-three/drei`:

```tsx
import { useGLTF } from "@react-three/drei";

function WheelModel({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF("/assets/models/mecanum-wheel.glb");
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = scrollProgress * Math.PI * 4;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}
```

## Tips

- **Colors**: Use hex codes for precise color control
- **Performance**: Lower `radialSegments` values improve performance but reduce smoothness
- **Shadows**: `castShadow` and `receiveShadow` props control shadow rendering
- **Materials**: Try different materials like `MeshPhysicalMaterial` for more realistic effects

## Common Modifications

### Make the wheel bigger
Change all radius values proportionally (multiply by same factor)

### Change rotation axis
Modify `rotation.x` to `rotation.y` or `rotation.z` in the `useFrame` hook

### Add more detail
Increase `radialSegments` values and add more geometry elements

### Change colors to match brand
Update all `color` and `emissive` properties to your brand colors
