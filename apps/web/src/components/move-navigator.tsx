import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
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
  onDrawOffer,
}: {
  moveHistory: number[][];
  currentMove: number;
  setCurrentMove: (currentMove: number) => void;
  isOnlineGame?: boolean;
  onResign?: () => void;
  onRestart: () => void;
  onDrawOffer?: () => void;
}) {
  return (
    <Pagination className="w-full max-w-2xl">
      <PaginationContent className="flex items-center justify-between gap-3">
        <PaginationItem>
          <PaginationFirst
            className="h-9 w-8 p-0"
            onClick={() => setCurrentMove(0)}
          />
        </PaginationItem>

        <PaginationEllipsis className="hidden w-4 sm:flex" />

        <PaginationItem>
          <PaginationPrevious
            className="h-9 px-2 sm:w-16 sm:min-w-[4rem]"
            onClick={() => currentMove > 0 && setCurrentMove(currentMove - 1)}
          />
        </PaginationItem>

        <PaginationItem className="flex-shrink-0">
          {isOnlineGame ? (
            <div className="inline-flex h-10 w-32 divide-x divide-border overflow-hidden rounded-md border">
              <Button
                onClick={onDrawOffer}
                variant="ghost"
                className="h-full w-1/2 rounded-none px-0 text-sm font-medium"
              >
                Draw
              </Button>
              <Button
                onClick={onResign}
                variant="ghost"
                className="h-full w-1/2 rounded-none px-0 text-sm font-medium text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                Resign
              </Button>
            </div>
          ) : (
            <Button
              className="h-10 w-32 px-0 text-sm"
              variant="outline"
              onClick={onRestart}
            >
              Restart
            </Button>
          )}
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            className="h-9 px-2 sm:w-16 sm:min-w-[4rem]"
            onClick={() =>
              currentMove !== moveHistory.length - 1 &&
              setCurrentMove(currentMove + 1)
            }
          />
        </PaginationItem>

        <PaginationEllipsis className="hidden w-4 sm:flex" />

        <PaginationItem>
          <PaginationLast
            className="h-9 w-8 p-0"
            onClick={() =>
              currentMove !== moveHistory.length - 1 &&
              setCurrentMove(moveHistory.length - 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default MoveNavigator;
