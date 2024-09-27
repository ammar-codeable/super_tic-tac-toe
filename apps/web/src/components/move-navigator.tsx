import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import resetGame from "@repo/utils/reset-game";

function MoveNavigator({
  moveHistory,
  currentMove,
  setCurrentMove,
  setMoveHistory,
}: {
  moveHistory: number[][];
  currentMove: number;
  setCurrentMove: (currentMove: number) => void;
  setMoveHistory: (moveHistory: number[][]) => void;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              setCurrentMove(0);
            }}
          />
        </PaginationItem>
        <PaginationEllipsis />
        <PaginationItem>
          <PaginationPrevious
            className="w-36"
            value="Previous move"
            onClick={() => {
              currentMove > 0 ? setCurrentMove(currentMove - 1) : null;
            }}
          />
        </PaginationItem>
        <PaginationItem className="flex-grow text-center">
          <Button
            onClick={() => {
              resetGame(setMoveHistory, setCurrentMove);
            }}
          >
            Restart Game
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="w-36"
            value="Next move"
            onClick={() => {
              currentMove !== moveHistory.length - 1
                ? setCurrentMove(currentMove + 1)
                : null;
            }}
          />
        </PaginationItem>
        <PaginationEllipsis />
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              currentMove !== moveHistory.length - 1
                ? setCurrentMove(moveHistory.length - 1)
                : null;
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default MoveNavigator;
