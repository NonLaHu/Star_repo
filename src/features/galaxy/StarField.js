import * as THREE from "three";

export class StarField {
  constructor({
    count = 1800,
    radius = 1800
  } = {}) {
    this.count = count;
    this.radius = radius;

    this.object =
      this.createStarField();
  }

  createStarField() {
    const positions =
      new Float32Array(
        this.count * 3
      );

    const sizes =
      new Float32Array(
        this.count
      );

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;

      /*
       * Spherical distribution.
       *
       * This prevents the stars from
       * forming an obvious cube.
       */
      const theta =
        Math.random() *
        Math.PI *
        2;

      const phi =
        Math.acos(
          2 * Math.random() - 1
        );

      /*
       * sqrt gives a more natural
       * volume distribution.
       */
      const distance =
        Math.sqrt(
          Math.random()
        ) * this.radius;

      positions[i3] =
        distance *
        Math.sin(phi) *
        Math.cos(theta);

      positions[i3 + 1] =
        distance *
        Math.cos(phi);

      positions[i3 + 2] =
        distance *
        Math.sin(phi) *
        Math.sin(theta);

      /*
       * Mostly tiny stars with a
       * handful of brighter ones.
       */
      sizes[i] =
        Math.random() < 0.08
          ? 2.5 + Math.random() * 2
          : 0.6 + Math.random() * 1.2;
    }

    const geometry =
      new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    geometry.setAttribute(
      "size",
      new THREE.BufferAttribute(
        sizes,
        1
      )
    );

    const material =
      new THREE.PointsMaterial({
        color: 0xffffff,

        size: 1.2,

        transparent: true,

        opacity: 0.7,

        depthWrite: false,

        sizeAttenuation: true
      });

    return new THREE.Points(
      geometry,
      material
    );
  }

  update(time) {
    /*
     * Extremely slow movement.
     * Almost imperceptible.
     */
    this.object.rotation.y =
      time * 0.002;
  }

  destroy() {
    this.object.geometry.dispose();
    this.object.material.dispose();
  }
}