import * as THREE from "three";

import { Camera } from "./Camera.js";
import { Renderer } from "./Renderer.js";
import { Controls } from "./Controls.js";

export class SceneManager {
  constructor(container) {
    this.scene =
      new THREE.Scene();

    this.scene.background =
      new THREE.Color(0x02030a);

    this.camera =
      new Camera();

    this.renderer =
      new Renderer(container);

    this.controls =
      new Controls(
        this.camera.object,
        this.renderer.canvas
      );

    this.handleResize =
      this.handleResize.bind(this);

    window.addEventListener(
      "resize",
      this.handleResize
    );
  }

  add(object) {
    this.scene.add(object);
  }

  remove(object) {
    this.scene.remove(object);
  }

  start() {
    this.animate();
  }

  animate() {
    requestAnimationFrame(
      () => this.animate()
    );

    this.controls.update();

    this.renderer.object.render(
      this.scene,
      this.camera.object
    );
  }

  handleResize() {
    this.camera.resize();
    this.renderer.resize();
  }

  destroy() {
    window.removeEventListener(
      "resize",
      this.handleResize
    );

    this.renderer.destroy();
  }
}