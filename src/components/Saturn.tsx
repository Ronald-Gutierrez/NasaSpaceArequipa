import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Planet } from './Planet';

const Saturn: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  let planetInstance: Planet | null = null;

  useEffect(() => {
    const mountElement = mountRef.current;
    if (mountElement) {
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load('/src/texture/saturn.jpg');
      const material = new THREE.MeshStandardMaterial({ map: texture });

      const ringTexture = textureLoader.load('/src/texture/saturn_ring.png'); // Textura de los anillos
      const ringGeometry = new THREE.RingGeometry(1.1, 1.5, 64); // Crear geometría para los anillos

      // Crear el material para los anillos y rotar la textura
      const ringMaterial = new THREE.MeshStandardMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
      });

      // Rotar la textura de los anillos
      ringTexture.wrapS = THREE.RepeatWrapping;
      ringTexture.wrapT = THREE.RepeatWrapping;
      ringTexture.repeat.set(1, 1);
      ringTexture.offset.set(0, 0);

      // Aplicar rotación a la textura
      const angle = Math.PI / 2; // Ángulo de rotación en radianes (45 grados como ejemplo)
      ringTexture.rotation = angle;

      const cameraPosition = new THREE.Vector3(0.5, 0, 2.4);

      const ambientLight = new THREE.AmbientLight(0x404040);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(5, 5, 5).normalize();

      planetInstance = new Planet(
        mountElement,
        geometry,
        material,
        cameraPosition,
        { ambient: ambientLight, directional: directionalLight },
        undefined,
        undefined,
        ringGeometry,
        ringMaterial
      );
    }

    return () => {
      planetInstance?.cleanup();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Saturn;
