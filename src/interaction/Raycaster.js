import * as THREE from "three";

export class Raycaster {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.updatePointer =
      this.updatePointer.bind(this);

    domElement.addEventListener(
      "pointermove",
      this.updatePointer
    );
  }

  updatePointer(event) {
    const rect =
      this.domElement.getBoundingClientRect();

    this.pointer.x =
      ((event.clientX - rect.left) /
        rect.width) *
        2 -
      1;

    this.pointer.y =
      -(
        (event.clientY - rect.top) /
        rect.height
      ) *
        2 +
      1;
  }

  intersect(objects) {
    this.raycaster.setFromCamera(
      this.pointer,
      this.camera
    );

    return this.raycaster.intersectObjects(
      objects,
      true
    );
  }

  destroy() {
    this.domElement.removeEventListener(
      "pointermove",
      this.updatePointer
    );
  }
}