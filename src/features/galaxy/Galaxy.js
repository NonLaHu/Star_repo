import * as THREE from "three";

import { Star } from "./Star.js";
import { Constellation } from "./Constellation.js";
import { createGalaxyMapper } from "./galaxyMapper.js";
import { StarField } from "./StarField.js";

export class Galaxy {
  constructor(scene) {
    this.scene = scene;

    this.object =
      new THREE.Group();

    this.scene.add(
      this.object
    );

    this.starField =
      new StarField({
        count: 1800,
        radius: 1800
      });

    this.scene.add(
      this.starField.object
    );

    this.stars = [];
    this.constellations = [];
  }

  load(commits) {
    this.clear();

    const mapper =
      createGalaxyMapper(
        commits
      );

    this.createStars(
      commits,
      mapper
    );

    this.createConstellations(
      commits,
      mapper
    );
  }

  update(time) {
    this.starField.update(time);
  }

  createStars(
    commits,
    mapper
  ) {
    for (const commit of commits) {
      const position =
        mapper.position(
          commit
        );

      const star =
        new Star(
          commit,
          position
        );

      this.stars.push(star);

      this.object.add(
        star.object
      );
    }
  }

  createConstellations(
    commits,
    mapper
  ) {
    const branches =
      this.groupByBranch(
        commits
      );

    for (const [
      branch,
      branchCommits
    ] of branches) {
      if (
        branchCommits.length < 2
      ) {
        continue;
      }

      const constellation =
        new Constellation(
          branchCommits,
          mapper,
          this.getBranchColor(
            branch
          )
        );

      this.constellations.push(
        constellation
      );

      this.object.add(
        constellation.object
      );
    }
  }

  groupByBranch(commits) {
    const groups =
      new Map();

    for (const commit of commits) {
      if (
        !groups.has(
          commit.branch
        )
      ) {
        groups.set(
          commit.branch,
          []
        );
      }

      groups
        .get(commit.branch)
        .push(commit);
    }

    return groups;
  }

  getBranchColor(branch) {
    const colors = [
      0x66ccff,
      0xff66cc,
      0x66ff99,
      0xffcc66,
      0xcc99ff,
      0xff7777
    ];

    let hash = 0;

    for (
      let i = 0;
      i < branch.length;
      i++
    ) {
      hash =
        branch.charCodeAt(i) +
        ((hash << 5) - hash);
    }

    return colors[
      Math.abs(hash) %
        colors.length
    ];
  }

  getStars() {
    return this.stars;
  }

  clear() {
    for (const star of this.stars) {
      star.object.geometry.dispose();
      star.object.material.dispose();
    }

    for (
      const constellation
      of this.constellations
    ) {
      constellation.object.geometry.dispose();
      constellation.object.material.dispose();
    }

    this.stars = [];
    this.constellations = [];

    while (
      this.object.children.length
    ) {
      this.object.remove(
        this.object.children[0]
      );
    }
  }

  clear() {
    for (const star of this.stars) {
      star.object.geometry.dispose();
      star.object.material.dispose();
    }

    for (
      const constellation
      of this.constellations
    ) {
      constellation.object.geometry.dispose();
      constellation.object.material.dispose();
    }

    this.stars = [];
    this.constellations = [];

    while (
      this.object.children.length
    ) {
      this.object.remove(
        this.object.children[0]
      );
    }
  }
}