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
      const texture = textureLoader.load('/src/texture/tierra.png');
      const material = new THREE.MeshStandardMaterial({ map: texture });

      const cameraPosition = new THREE.Vector3(0.5, 0, 2.4);

      const ambientLight = new THREE.AmbientLight(0x404040);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(5, 5, 5).normalize();

      const latitude = -14.7090;
      const longitude = -106.5375;
      const radius = 0.99;

      const phi = (90 - latitude) * (Math.PI / 180);
      const theta = (longitude + 180) * (Math.PI / 180);

      const pointPosition = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );

      const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

      planetInstance = new Planet(
        mountElement,
        geometry,
        material,
        cameraPosition,
        { ambient: ambientLight, directional: directionalLight },
        pointPosition,
        pointMaterial
      );
    }

    return () => {
      planetInstance?.cleanup();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Earth;
