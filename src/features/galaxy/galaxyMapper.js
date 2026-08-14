import * as THREE from "three";

const TIME_SCALE = 400;
const ADDITIONS_SCALE = 0.25;
const DELETIONS_SCALE = 0.8;

export function createGalaxyMapper(
  commits
) {
  const sorted = [...commits].sort(
    (a, b) =>
      a.date - b.date
  );

  const first =
    sorted[0].date.getTime();

  const last =
    sorted[
      sorted.length - 1
    ].date.getTime();

  const range =
    Math.max(
      last - first,
      1
    );

  return {
    position(commit) {
      const timestamp =
        commit.date.getTime();

      const progress =
        (timestamp - first) /
        range;

      const x =
        progress *
          TIME_SCALE -
        TIME_SCALE / 2;

      const y =
        commit.additions *
        ADDITIONS_SCALE;

      const z =
        -commit.deletions *
        DELETIONS_SCALE;

      return new THREE.Vector3(
        x,
        y,
        z
      );
    }
  };
}