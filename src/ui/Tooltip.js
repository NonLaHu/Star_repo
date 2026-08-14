export class Tooltip {
  constructor(root) {
    this.element =
      document.createElement("div");

    this.element.className =
      "tooltip";

    root.appendChild(
      this.element
    );
  }

  show(commit, x, y) {
    this.element.innerHTML = `
      <div class="tooltip__message">
        ${commit.message}
      </div>

      <div class="tooltip__meta">
        <div>${commit.hash}</div>
        <div>branch: ${commit.branch}</div>
        <div>author: ${commit.author}</div>
        <div>
          +${commit.additions}
          -${commit.deletions}
        </div>
        <div>
          ${commit.date.toLocaleString()}
        </div>
      </div>
    `;

    this.element.style.left =
      `${x + 16}px`;

    this.element.style.top =
      `${y + 16}px`;

    this.element.classList.add(
      "tooltip--visible"
    );
  }

  hide() {
    this.element.classList.remove(
      "tooltip--visible"
    );
  }
}