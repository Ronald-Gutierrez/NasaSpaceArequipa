import * as THREE from 'three';

export class Planet {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  planet: THREE.Mesh;
  point: THREE.Mesh | null = null;
  rings: THREE.Mesh | null = null; // Añadido para los anillos

  constructor(
    private mountElement: HTMLDivElement,
    geometry: THREE.SphereGeometry,
    material: THREE.MeshStandardMaterial,
    cameraPosition: THREE.Vector3,
    lighting: { ambient: THREE.AmbientLight; directional: THREE.DirectionalLight },
    pointPosition?: THREE.Vector3,
    pointMaterial?: THREE.MeshBasicMaterial,
    ringGeometry?: THREE.RingGeometry, // Parámetro opcional para los anillos
    ringMaterial?: THREE.MeshStandardMaterial // Material para los anillos
  ) {
    this.scene = new THREE.Scene();
    const width = mountElement.clientWidth;
    const height = mountElement.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    mountElement.appendChild(this.renderer.domElement);

    this.planet = new THREE.Mesh(geometry, material);
    this.scene.add(this.planet);

    if (pointPosition && pointMaterial) {
      const pointGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      this.point = new THREE.Mesh(pointGeometry, pointMaterial);
      this.point.position.copy(pointPosition);
      this.planet.add(this.point);
    }

    if (ringGeometry && ringMaterial) {
      this.rings = new THREE.Mesh(ringGeometry, ringMaterial);
      this.rings.rotation.x = Math.PI / 1.7; // Orientar los anillos
      this.planet.add(this.rings);
    }

    this.setupLighting(lighting);
    this.setupCamera(cameraPosition);

    this.animate();
  }

  private setupLighting(lighting: { ambient: THREE.AmbientLight; directional: THREE.DirectionalLight }) {
    this.scene.add(lighting.ambient);
    this.scene.add(lighting.directional);
  }

  private setupCamera(cameraPosition: THREE.Vector3) {
    this.camera.position.copy(cameraPosition);
    this.camera.lookAt(this.planet.position);
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.planet.rotation.y += 0.001;
    this.renderer.render(this.scene, this.camera);
  };

  public cleanup() {
    if (this.mountElement.contains(this.renderer.domElement)) {
      this.mountElement.removeChild(this.renderer.domElement);
    }
  }
}
