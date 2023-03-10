import { Mode } from "./gameStateConstants";
import { expect, it } from "vitest";
import { board, findValidGroups, validatePlanet } from "./gameStateHelpers";

it("board", () => {
  expect(
    board(
      [
        { id: "1", vector: [0] },
        { id: "2", vector: [1] },
        { id: "3", vector: [2] },
        { id: "4", vector: [2] },
      ],
      2
    )
  ).toStrictEqual([
    { id: "1", vector: [0] },
    { id: "2", vector: [1] },
  ]);
});

it("findValidGroups", () => {
  expect(
    findValidGroups(
      [
        { id: "1", vector: [0, 0, 0, 0] },
        { id: "2", vector: [0, 0, 0, 1] },
        { id: "3", vector: [1, 0, 1, 0] },
        { id: "4", vector: [1, 1, 0, 0] },
        { id: "5", vector: [0, 0, 0, 2] },
        { id: "6", vector: [1, 0, 2, 0] },
        { id: "7", vector: [1, 2, 0, 0] },
      ],
      Mode.Set
    )
  ).toStrictEqual([
    [
      { id: "1", vector: [0, 0, 0, 0] },
      { id: "2", vector: [0, 0, 0, 1] },
      { id: "5", vector: [0, 0, 0, 2] },
    ],
  ]);
  expect(
    findValidGroups(
      [
        { id: "1", vector: [0, 0, 0, 0] },
        { id: "2", vector: [0, 0, 0, 1] },
        { id: "5", vector: [0, 0, 0, 2] },
      ],
      Mode.Set
    )
  ).toStrictEqual([
    [
      { id: "1", vector: [0, 0, 0, 0] },
      { id: "2", vector: [0, 0, 0, 1] },
      { id: "5", vector: [0, 0, 0, 2] },
    ],
  ]);
});

it("findValidPlanets", () => {
  expect(
    validatePlanet([
      { id: "1", vector: [2, 1, 0, 2] },
      { id: "2", vector: [0, 0, 2, 2] },
      { id: "3", vector: [0, 2, 0, 2] },
      { id: "4", vector: [2, 1, 2, 2] },
    ])
  ).toEqual(false);

  expect(
    validatePlanet([
      { id: "1", vector: [0, 1, 0, 2] },
      { id: "2", vector: [1, 2, 0, 1] },
      { id: "3", vector: [2, 2, 1, 0] },
      { id: "4", vector: [1, 1, 1, 1] },
    ])
  ).toEqual(true);

  expect(
    validatePlanet([
      { id: "1", vector: [0, 0, 2, 1] },
      { id: "2", vector: [0, 1, 2, 2] },
      { id: "3", vector: [0, 0, 2, 2] },
      { id: "4", vector: [0, 1, 2, 1] },
    ])
  ).toEqual(true);

  expect(
    validatePlanet([
      { id: "1", vector: [0, 0, 2, 1] },
      { id: "2", vector: [0, 1, 2, 2] },
      { id: "4", vector: [0, 1, 2, 1] },
      { id: "3", vector: [0, 0, 2, 2] },
    ])
  ).toEqual(true);

  expect(
    validatePlanet([
      { id: "1", vector: [0, 0, 2, 1] },
      { id: "4", vector: [0, 1, 2, 1] },
      { id: "2", vector: [0, 1, 2, 2] },
      { id: "3", vector: [0, 0, 2, 2] },
    ])
  ).toEqual(true);

  expect(
    validatePlanet([
      { id: "4", vector: [0, 1, 2, 1] },
      { id: "1", vector: [0, 0, 2, 1] },
      { id: "2", vector: [0, 1, 2, 2] },
      { id: "3", vector: [0, 0, 2, 2] },
    ])
  ).toEqual(true);

  expect(
    validatePlanet([
      { id: "4", vector: [0, 1, 2, 1] },
      { id: "1", vector: [0, 0, 2, 1] },
      { id: "3", vector: [0, 0, 2, 2] },
      { id: "2", vector: [0, 1, 2, 2] },
    ])
  ).toEqual(true);

  expect(
    validatePlanet([
      { id: "4", vector: [0, 1, 0, 0] },
      { id: "1", vector: [0, 2, 0, 0] },
      { id: "3", vector: [0, 0, 1, 0] },
      { id: "2", vector: [0, 0, 2, 0] },
    ])
  ).toEqual(true);

  expect(
    validatePlanet([
      { id: "4", vector: [0, 1, 0, 0] },
      { id: "1", vector: [0, 1, 0, 2] },
      { id: "3", vector: [1, 1, 0, 1] },
      { id: "2", vector: [2, 1, 0, 2] },
    ])
  ).toEqual(false);
});
