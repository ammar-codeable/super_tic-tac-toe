import SubBoard from "@/components/sub-board";

function MainBoard({
  mainBoardState,
  nextActiveBoard,
  currentPlayerTurn,
  handlePlay,
}: {
  mainBoardState: (string | null)[][];
  nextActiveBoard: (number | null)[] | null;
  currentPlayerTurn: string;
  handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void;
}) {
  return (
    <div className="grid aspect-square size-[95%] xl:min-h-[33rem] xl:min-w-[33rem] grid-cols-3">
      {Array(9)
        .fill(null)
        .map((_, i) => (
          <SubBoard
            key={i}
            boardId={i}
            subBoardState={mainBoardState[i]}
            isActiveSubBoard={(nextActiveBoard && nextActiveBoard.includes(i))!}
            currentPlayerTurn={currentPlayerTurn}
            handlePlay={handlePlay}
          />
        ))}
    </div>
  );
}

export default MainBoard;
