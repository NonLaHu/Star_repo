import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class Controls {
  constructor(camera, domElement) {
    this.object =
      new OrbitControls(
        camera,
        domElement
      );

    this.object.enableDamping = true;
    this.object.dampingFactor = 0.04;

    this.object.minDistance = 20;
    this.object.maxDistance = 1000;
  }

  update() {
    this.object.update();
  }
}