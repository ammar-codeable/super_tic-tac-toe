import SubBoard from "@/components/sub-board";

function MainBoard({
  mainBoardState,
  currentPlayerTurn,
  lastClickedBoardId,
  lastClickedCellId,
  nextActiveBoard,
  handlePlay,
}: {
  mainBoardState: (string | null)[][];
  currentPlayerTurn: string;
  lastClickedBoardId: number | null;
  lastClickedCellId: number | null;
  nextActiveBoard: (number | null)[] | null;
  handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void;
}) {
  return (
    <div className="grid aspect-square size-[95%] grid-cols-3 xl:min-h-[33rem] xl:min-w-[33rem]">
      {Array(9)
        .fill(null)
        .map((_, i) => (
          <SubBoard
            key={i}
            boardId={i}
            subBoardState={mainBoardState[i]}
            lastClickedCellId={
              lastClickedBoardId === i ? lastClickedCellId : null
            }
            isActiveSubBoard={(nextActiveBoard && nextActiveBoard.includes(i))!}
            currentPlayerTurn={currentPlayerTurn}
            handlePlay={handlePlay}
          />
        ))}
    </div>
  );
}

export default MainBoard;
