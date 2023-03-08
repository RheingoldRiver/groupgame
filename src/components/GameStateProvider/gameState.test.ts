import { board } from "./gameStateHelpers";

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("board", () => {
    expect(
      board(
        [
          { id: "1", vector: [0] },
          { id: "2", vector: [1] },
          { id: "3", vector: [2] },
        ],
        2
      )
    ).toBe([
      { id: "1", vector: [0] },
      { id: "2", vector: [1] },
    ]);
  });
}
