import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function MoveNavigator({
  moveHistory,
  currentMove,
  setCurrentMove,
  isOnlineGame,
  onResign,
  onRestart,
}: {
  moveHistory: number[][];
  currentMove: number;
  setCurrentMove: (currentMove: number) => void;
  isOnlineGame?: boolean;
  onResign?: () => void;
  onRestart: () => void;
}) {
  return (
    <>
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
            {isOnlineGame ? (
              <Button variant="destructive" onClick={onResign}>
                Resign Game
              </Button>
            ) : (
              <Button onClick={onRestart}>Restart Game</Button>
            )}
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
    </>
  );
}

export default MoveNavigator;
