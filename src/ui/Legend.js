export class Legend {
  constructor(root) {
    this.element =
      document.createElement("div");

    this.element.className =
      "legend";

    this.element.innerHTML = `
      <div class="legend__item">
        <span class="legend__star"></span>
        <span>Commit</span>
      </div>

      <div class="legend__item">
        <span class="legend__line"></span>
        <span>Branch</span>
      </div>
    `;

    root.appendChild(
      this.element
    );
  }
}