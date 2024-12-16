function calculateResult(
  boardState: (string | null)[],
): "X" | "O" | "DRAW" | null {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ] as const;

  for (const [a, b, c] of WIN_CONDITIONS) {
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return boardState[a] as "X" | "O";
    }
  }

  return boardState.includes(null) ? null : "DRAW";
}

export default calculateResult;
