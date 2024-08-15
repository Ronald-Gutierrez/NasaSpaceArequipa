import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;

    const main = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 2;
      scene.add(camera);

      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.autoClear = false;
      renderer.setClearColor(0x000000, 0.0);

      // Create earth geometry
      const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

      const earthTexture = new THREE.TextureLoader().load('src/texture/earthmap1k.jpg');
      const bumpTexture = new THREE.TextureLoader().load('src/texture/earthbump.jpg');

      const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.3,
        emissive: new THREE.Color(0x555555), // Add emissive color to increase perceived brightness
        emissiveIntensity: 0.5, // Adjust the intensity of the emissive color
      });

      const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earthMesh);

      // Set ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Increase intensity
      scene.add(ambientLight);

      // Set point light
      const pointLight = new THREE.PointLight(0xffffff, 1.2); // Increase intensity
      pointLight.position.set(5, 3, 5);
      scene.add(pointLight);

      // Cloud
      const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);
      const cloudTexture = new THREE.TextureLoader().load('src/texture/earthCloud.png');

      const cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
      });

      const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
      scene.add(cloudMesh);

      // Star
      const starGeometry = new THREE.SphereGeometry(80, 64, 64);
      const starTexture = new THREE.TextureLoader().load('src/texture/galaxy.png');

      const starMaterial = new THREE.MeshBasicMaterial({
        map: starTexture,
        side: THREE.BackSide,
      });

      const starMesh = new THREE.Mesh(starGeometry, starMaterial);
      scene.add(starMesh);

      const animate = () => {
        requestAnimationFrame(animate);
        earthMesh.rotation.y -= 0.0005;
        cloudMesh.rotation.y += 0.00015;
        starMesh.rotation.y += 0.0005;

        render();
      };

      const render = () => {
        renderer.render(scene, camera);
      };

      animate();
    };

    main();

    const handleResize = () => {
      if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
      if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="c" />;
};

export default App;
