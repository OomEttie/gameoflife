type Cell = "X" | "0";

const cell = (state: Cell, neighbors: [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]) => {
  const liveNeighbours = neighbors.filter(c => c == "X");

  if (state === "0" && liveNeighbours.length == 3) {
    return "X";
  }

  if (state === "X" && (liveNeighbours.length > 3 || liveNeighbours.length < 2)) {
    return "0";
  }

  return state;
};

describe("game of life cell", () => {
  test("1. Any live cell with fewer than two live neighbours dies, as if by underpopulation", () => {
    expect(cell("X", ["X", "0", "0", "0", "0", "0", "0", "0"])).toEqual("0");
  });

  test("2.1 Any live cell with two live neighbours lives on to the next generation.", () => {
    expect(cell("X", ["X", "X", "0", "0", "0", "0", "0", "0"])).toEqual("X");
  });

  test("2.2 Any live cell with three live neighbours lives on to the next generation.", () => {
    expect(cell("X", ["X", "X", "X", "0", "0", "0", "0", "0"])).toEqual("X");
  });

  test("3. Any live cell with more than three live neighbours dies, as if by overpopulation.", () => {
    expect(cell("X", ["X", "X", "X", "X", "0", "0", "0", "0"])).toEqual("0");
  });

  test("4.1 Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", () => {
    expect(cell("0", ["X", "X", "X", "0", "0", "0", "0", "0"])).toEqual("X");
  });

  test("4.2 Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", () => {
    expect(cell("0", ["X", "0", "X", "0", "0", "0", "0", "0"])).toEqual("0");
  });

  test("4.3 Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", () => {
    expect(cell("0", ["X", "0", "0", "0", "0", "0", "0", "0"])).toEqual("0");
  });

  test("4.3 Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", () => {
    expect(cell("0", ["X", "X", "X", "X", "X", "X", "X", "X"])).toEqual("0");
  });
});

const board = (x: number, y: number, previousState: Cell[][]) => {
  return new Array(x).fill([]).map((_, xi) => {
    return new Array(y).fill(0).map((_, yi) => {
      return cell(previousState[xi][yi], [
        (previousState[xi] || [])[yi - 1] || "0",
        (previousState[xi + 1] || [])[yi - 1] || "0",
        (previousState[xi + 1] || [])[yi] || "0",
        (previousState[xi + 1] || [])[yi + 1] || "0",
        (previousState[xi] || [])[yi + 1] || "0",
        (previousState[xi - 1] || [])[yi + 1] || "0",
        (previousState[xi - 1] || [])[yi] || "0",
        (previousState[xi - 1] || [])[yi - 1] || "0"
      ]);
    });
  });
};

describe("game of life board", () => {
  test("gives us a board of 5X5 defaulting to dead cells", () => {
    expect(
      board(5, 5, [
        ["0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0"]
      ])
    ).toEqual([
      ["0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0"]
    ]);
  });

  test("takes a previous generation and applies rules", () => {
    let starts: Cell[][] = [
      ["0", "0", "0", "0", "0"],
      ["0", "0", "X", "0", "0"],
      ["0", "0", "0", "X", "0"],
      ["0", "X", "X", "X", "0"],
      ["0", "0", "0", "0", "0"]
    ];
    new Array(10).fill(1).forEach(() => {
      console.log(starts);
      starts = board(5, 5, starts);
    });
    expect(
      board(5, 5, [
        ["0", "0", "0", "0", "0"],
        ["0", "0", "X", "0", "0"],
        ["0", "0", "X", "0", "0"],
        ["0", "0", "X", "0", "0"],
        ["0", "0", "0", "0", "0"]
      ])
    ).toEqual([
      ["0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
      ["0", "X", "X", "X", "0"],
      ["0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0"]
    ]);
  });
});
