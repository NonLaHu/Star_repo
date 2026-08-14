import { Raycaster } from "./Raycaster.js";
export class StarInteraction {
  constructor({
    camera,
    domElement,
    stars,
    tooltip
  }) {
    this.raycaster =
      new Raycaster(
        camera,
        domElement
      );

    this.stars = stars;
    this.tooltip = tooltip;

    this.hoveredStar = null;

    this.handlePointerMove =
      this.handlePointerMove.bind(this);

    domElement.addEventListener(
      "pointermove",
      this.handlePointerMove
    );
  }

  handlePointerMove(event) {
    const intersections =
      this.raycaster.intersect(
        this.stars.map(
          star => star.object
        )
      );

    if (
      intersections.length === 0
    ) {
      this.clearHover();
      return;
    }

    const object =
      this.findStar(
        intersections[0].object
      );

    if (!object) {
      this.clearHover();
      return;
    }

    const star =
      object.userData.star;

    if (
      this.hoveredStar !== star
    ) {
      this.clearHover();
      this.setHover(star);
    }

    this.tooltip.show(
      star.commit,
      event.clientX,
      event.clientY
    );
  }

  findStar(object) {
    let current = object;

    while (current) {
      if (
        current.userData?.star
      ) {
        return current;
      }

      current = current.parent;
    }

    return null;
  }

  setHover(star) {
    this.hoveredStar = star;

    star.setHovered(true);
  }

  clearHover() {
    if (!this.hoveredStar) {
      this.tooltip.hide();
      return;
    }

    this.hoveredStar.setHovered(
      false
    );

    this.hoveredStar = null;

    this.tooltip.hide();
  }

  destroy() {
    this.raycaster.destroy();

    this.clearHover();
  }
}