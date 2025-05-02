import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, useTexture, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  const gltf = useGLTF('/3D/Close-Up-EARTH.glb');
  const texture = useTexture('/textures/earth.jpg');
  const modelRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const indiaLongitude = 82.5;
  const indiaLatitude = 20.6;

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: texture,
            metalness: 0.3,
            roughness: 1,
          });

          child.material.map.wrapT = THREE.RepeatWrapping;
          child.material.map.repeat.set(1, -1);
          child.material.map.needsUpdate = true;
        }
      });

      gltf.scene.rotation.y = THREE.MathUtils.degToRad(indiaLongitude - 180);
      gltf.scene.rotation.x = THREE.MathUtils.degToRad(indiaLatitude);
    }
  }, [gltf, texture]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        mouse.x * Math.PI,
        0.05
      );
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        -mouse.y * Math.PI,
        0.05
      );
    }
  });

  return (
    <group ref={modelRef} scale={1.3} position={[0, 0, 0]} rotateOnAxis={[90, 15, 90]} rotation={[0, 0, 60]}>
      <primitive object={gltf.scene} />
      <mesh>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshBasicMaterial color="deepskyblue" transparent opacity={0.01} />
      </mesh>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <Canvas
      className="absolute top-0 left-0 w-full h-full z-0"
      dpr={[2, 2]}
      camera={{ position: [0, 1, 3], fov: 50 }}
    >
      <ambientLight intensity={4} />
      <directionalLight position={[1, 1, 2]} intensity={2} />
      <Suspense fallback={null}>
        <Stars radius={100} depth={25} count={5000} factor={4} saturation={1} />
        <Model />
        <Environment preset="night" />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
