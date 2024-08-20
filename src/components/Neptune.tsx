import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Planet } from './Planet';

const Earth: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  let planetInstance: Planet | null = null;

  useEffect(() => {
    const mountElement = mountRef.current;
    if (mountElement) {
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load('/src/texture/neptune.jpg');
      const material = new THREE.MeshStandardMaterial({ map: texture });

      const cameraPosition = new THREE.Vector3(0.5, 0, 2.4);

      const ambientLight = new THREE.AmbientLight(0x404040);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(5, 5, 5).normalize();

      planetInstance = new Planet(
        mountElement,
        geometry,
        material,
        cameraPosition,
        { ambient: ambientLight, directional: directionalLight }
      );
    }

    return () => {
      planetInstance?.cleanup();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Earth;
