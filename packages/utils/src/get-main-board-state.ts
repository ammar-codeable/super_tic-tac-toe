import { useRef } from "react";

function getMainBoardState(
  currentMove: number,
  moveHistory: [number, number][],
) {
  const mainBoardState = useRef<(string | null)[][]>(
    Array(9).fill(Array(9).fill(null)),
  );

  if (currentMove === 0) {
    mainBoardState.current = Array(9).fill(Array(9).fill(null));
  }

  if (moveHistory.length > 1) {
    const newMainBoardState = JSON.parse(
      JSON.stringify(mainBoardState.current),
    );

    for (let i = moveHistory.length - 1; i > 0; i--) {
      const [boardId, cellId] = moveHistory[i];
      if (i > currentMove) {
        newMainBoardState[boardId][cellId] = null;
      } else {
        newMainBoardState[boardId][cellId] = i % 2 === 0 ? "O" : "X";
      }
    }
    mainBoardState.current = newMainBoardState;
  }
  return mainBoardState.current;
}

export default getMainBoardState;
