import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Earth: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;

    const width = mountElement.clientWidth;
    const height = mountElement.clientHeight;

    // Crear la escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountElement.appendChild(renderer.domElement);

    // Crear la esfera (Tierra)
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/src/texture/tierra.png');
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Posicionar el punto rojo en Arequipa
    const pointGeometry = new THREE.SphereGeometry(0.02, 16, 16); // Pequeña esfera
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Material rojo
    const point = new THREE.Mesh(pointGeometry, pointMaterial);

    // Coordenadas de Arequipa
    const latitude = -14.7090; // Latitud de Arequipa
    const longitude = -106.5375; // Longitud de Arequipa

    // Convertir latitud y longitud a radianes
    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);

    // Calcular la posición en la superficie de la esfera
    const radius = 0.99; // Radio de la esfera Tierra + un poco más para que esté sobre la superficie
    point.position.x = radius * Math.sin(phi) * Math.cos(theta);
    point.position.y = radius * Math.cos(phi);
    point.position.z = radius * Math.sin(phi) * Math.sin(theta);

    // Agregar el punto como hijo de la Tierra
    earth.add(point);

    // Configurar la cámara
    camera.position.set(0.5, 0, 2.4); // Desplazar la cámara ligeramente hacia la derecha
    camera.lookAt(earth.position);    // Asegurar que la cámara apunte a la esfera

    // Configurar la iluminación
    const ambientLight = new THREE.AmbientLight(0x404040); // Luz ambiental suave
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Luz direccional más fuerte
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.001; // Rotar la Tierra
      renderer.render(scene, camera);
    };
    animate();

    // Limpieza
    return () => {
      if (mountElement.contains(renderer.domElement)) {
        mountElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}

const App: React.FC = () => {
  return (
    <div>
      <Earth />
    </div>
  );
}

export default App;
