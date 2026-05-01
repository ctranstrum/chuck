"use strict";
const jscad = require("@jscad/modeling");
const { union, subtract } = jscad.booleans;
const { cuboid, cylinder, roundedCylinder, torus } = jscad.primitives;
const { translateX, translateY, translateZ } = jscad.transforms;

const segments = 180;

function main() {
  const knob = roundedCylinder({
    center: [0, 0, 8.5],
    height: 19.1,
    radius: 13.5,
    roundRadius: 4,
    segments,
  });

  const hollow = cylinder({
    center: [0, 0, 4],
    height: 8.1,
    radius: 10,
    segments,
  });

  const floor = cylinder({
    center: [0, 0, -1],
    height: 3,
    radius: 12.5,
    segments,
  });

  const ceiling = translateZ(18, floor);

  const cyl = roundedCylinder({
    center: [0, 0, 3],
    height: 6,
    radius: 1.35,
    roundRadius: 0.3,
    segments,
  });
  const opening = cylinder({
    center: [0, 0, -1],
    height: 2.3,
    radius: 1.4,
    segments,
  });
  const notch = cuboid({
    center: [1.1, 0, 3],
    size: [1, 2.7, 8],
  });

  const shaft = translateZ(8.9, subtract(union(cyl, opening), notch));

  const bevel = translateZ(
    11,
    torus({
      innerRadius: 1,
      outerRadius: 14,
      innerSegments: segments,
      outerSegments: segments,
    }),
  );

  return [subtract(knob, hollow, shaft, floor, ceiling, bevel)];
}

module.exports = { main };
