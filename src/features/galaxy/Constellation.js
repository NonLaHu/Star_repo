import * as THREE from "three";

export class Constellation {
  constructor(
    commits,
    mapper,
    color = 0x66ccff
  ) {
    this.commits = commits;

    const points =
      commits.map(commit =>
        mapper.position(commit)
      );

    const geometry =
      new THREE.BufferGeometry()
        .setFromPoints(points);

    const material =
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4
      });

    this.object =
      new THREE.Line(
        geometry,
        material
      );
  }
}