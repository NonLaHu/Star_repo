export class HUD {
  constructor(root) {
    this.element =
      document.createElement("header");

    this.element.className =
      "hud";

    this.element.innerHTML = `
      <div class="hud__brand">
        <div class="hud__title">
          COSMIC-GIT
        </div>

        <div class="hud__subtitle">
          Git history visualized as a stellar system
        </div>
      </div>
    `;

    root.appendChild(
      this.element
    );
  }
}