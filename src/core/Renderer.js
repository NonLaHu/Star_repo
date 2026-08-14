import * as THREE from "three";

export class Renderer {
  constructor(container) {
    this.canvas =
      document.createElement("canvas");

    this.canvas.className =
      "scene";

    container.appendChild(
      this.canvas
    );

    this.object =
      new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: false
      });

    this.object.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );

    this.object.setSize(
      window.innerWidth,
      window.innerHeight
    );

    this.object.outputColorSpace =
      THREE.SRGBColorSpace;
  }

  resize() {
    this.object.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }

  destroy() {
    this.object.dispose();

    this.canvas.remove();
  }
}