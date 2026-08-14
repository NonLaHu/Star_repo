import { SceneManager } from "./SceneManager.js";

import { Galaxy } from "../features/galaxy/Galaxy.js";

import { mockCommits } from "../git/mockCommits.js";

import { UI } from "../ui/index.js";

import { StarInteraction } from "../interaction/StarInteraction.js";

export class App {
  constructor() {
    this.root =
      document.querySelector("#app");

    this.ui =
      new UI(this.root);

    this.scene =
      new SceneManager(
        this.root
      );

    this.galaxy =
      new Galaxy(
        this.scene
      );

    this.commits =
      mockCommits;

    this.interaction = null;
  }

  start() {
    this.galaxy.load(
      this.commits
    );

    this.ui.update(
      this.commits
    );

    this.interaction =
      new StarInteraction({
        camera:
          this.scene.camera.object,

        domElement:
          this.scene.renderer.canvas,

        stars:
          this.galaxy.getStars(),

        tooltip:
          this.ui.tooltip
      });

    this.scene.start();
  }

  destroy() {
    this.interaction?.destroy();
    this.scene.destroy();
  }
}