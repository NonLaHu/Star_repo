import * as THREE from "three";

export class Star {
  constructor(commit, position) {
    this.commit = commit;

    this.baseColor =
      new THREE.Color(0xffffff);

    const radius =
      THREE.MathUtils.clamp(
        1.5 +
          commit.totalChanges *
            0.008,
        1.5,
        8
      );

    const geometry =
      new THREE.SphereGeometry(
        radius,
        16,
        16
      );

    const material =
      new THREE.MeshBasicMaterial({
        color: this.baseColor
      });

    this.object =
      new THREE.Mesh(
        geometry,
        material
      );

    this.object.position.copy(
      position
    );

    this.object.userData = {
      type: "commit",
      commit,
      star: this
    };
  }

  setHovered(hovered) {
    if (hovered) {
      this.object.scale.setScalar(
        1.35
      );

      this.object.material.color.set(
        0x88ccff
      );
    } else {
      this.object.scale.setScalar(
        1
      );

      this.object.material.color.copy(
        this.baseColor
      );
    }
  }
}