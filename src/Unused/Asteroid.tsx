// AsteroidScene.tsx
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Stars, Html } from '@react-three/drei'
import * as THREE from 'three'
import * as React from 'react'
// import asteroidColor from './textures/asteroid_diffuse.jpg'
// import asteroidNormal from './textures/asteroid_normal.jpg'
// import fireTexture from './textures/fire_trail.png'

function Asteroid() {
  const ref = useRef<THREE.Mesh>(null!)
  const [flyIn, setFlyIn] = useState(true)

  // const colorMap = useLoader(THREE.TextureLoader, asteroidColor)
  // const normalMap = useLoader(THREE.TextureLoader, asteroidNormal)

  useFrame(() => {
    if (flyIn) {
      ref.current.position.x += 0.1
      ref.current.position.y -= 0.05

      if (ref.current.position.x > 3) setFlyIn(false)
    }

    ref.current.rotation.x += 0.005
    ref.current.rotation.y += 0.003
  })

  return (
    <group>
      <mesh ref={ref} position={[-4, 4, -2]} castShadow>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          // map={colorMap}
          // normalMap={normalMap}
          // roughness={1}
          metalness={0.2}
        />
      </mesh>

      {/* Fire trail */}
      <mesh position={[-4.5, 4.5, -2]}>
        <planeGeometry args={[2, 0.5]} />
        <meshBasicMaterial
          // map={useLoader(THREE.TextureLoader, fireTexture)}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export default function AsteroidScene() {
  return (
    <Canvas shadows style={{ position: 'absolute', top: 0, left: 0, zIndex: 5 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 10]} intensity={2} castShadow />
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      <Asteroid />
    </Canvas>
  )
}
