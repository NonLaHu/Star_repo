import { HUD } from "./HUD.js";
import { Stats } from "./Stats.js";
import { Tooltip } from "./Tooltip.js";
import { Legend } from "./Legend.js";

export class UI {
  constructor(root) {
    this.root = root;

    this.hud = new HUD(root);
    this.stats = new Stats(root);
    this.tooltip = new Tooltip(root);
    this.legend = new Legend(root);
  }

  update(commits) {
    const branches =
      new Set(
        commits.map(
          commit => commit.branch
        )
      );

    this.stats.update({
      commits: commits.length,
      branches: branches.size
    });
  }
}