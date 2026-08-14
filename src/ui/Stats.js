export class Stats {
  constructor(root) {
    this.element =
      document.createElement("div");

    this.element.className =
      "stats";

    this.element.innerHTML = `
      <div class="stat">
        <span class="stat__label">
          COMMITS
        </span>

        <span
          class="stat__value"
          data-stat="commits"
        >
          0
        </span>
      </div>

      <div class="stat">
        <span class="stat__label">
          BRANCHES
        </span>

        <span
          class="stat__value"
          data-stat="branches"
        >
          0
        </span>
      </div>
    `;

    root.appendChild(
      this.element
    );

    this.commits =
      this.element.querySelector(
        '[data-stat="commits"]'
      );

    this.branches =
      this.element.querySelector(
        '[data-stat="branches"]'
      );
  }

  update({
    commits,
    branches
  }) {
    this.commits.textContent =
      commits;

    this.branches.textContent =
      branches;
  }
}1