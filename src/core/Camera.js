import * as THREE from "three";

export class Camera {
  constructor() {
    this.object = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );

    this.object.position.set(
      0,
      100,
      250
    );
  }

  resize() {
    this.object.aspect =
      window.innerWidth /
      window.innerHeight;

    this.object.updateProjectionMatrix();
  }
}