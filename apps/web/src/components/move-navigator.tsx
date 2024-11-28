import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="bg-secondary/30 backdrop-blur-md border border-border/40 rounded-xl py-1 w-full sm:py-2 px-0.5 sm:px-3 shadow-lg">
      <div className="flex items-center justify-between gap-0.5 sm:gap-4 w-full">
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 sm:h-9 sm:w-9 hover:bg-secondary/80 hover:scale-105 active:scale-95 transition-all"
          onClick={() => setCurrentMove(0)}
        >
          <ChevronLeft className="h-2.5 w-2.5 sm:h-4 sm:w-4 text-muted-foreground" />
          <ChevronLeft className="h-2.5 w-2.5 sm:h-4 sm:w-4 -ml-1.5 sm:-ml-3 text-muted-foreground" />
        </Button>

        <div className="hidden lg:block text-muted-foreground/60 font-mono text-lg tracking-wider">···</div>

        <Button
          variant="ghost"
          className="flex-grow h-5 sm:h-9 basis-0 sm:basis-auto hover:bg-secondary/80 hover:scale-105 active:scale-95 transition-all px-0.5 sm:px-4"
          onClick={() => currentMove > 0 && setCurrentMove(currentMove - 1)}
        >
          <ChevronLeft className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline ml-2 text-sm">Previous</span>
        </Button>

        {isOnlineGame ? (
          <div className="flex gap-1">
            <Button 
              variant="secondary" 
              className="h-5 sm:h-9 px-1 sm:px-4 text-[9px] sm:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              onClick={onDrawOffer}
            >
              Offer Draw
            </Button>
            <Button 
              variant="destructive" 
              className="h-5 sm:h-9 px-1 sm:px-4 text-[9px] sm:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              onClick={onResign}
            >
              Resign
            </Button>
          </div>
        ) : (
          <Button 
            className="h-5 sm:h-9 px-1 sm:px-4 text-[9px] sm:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            onClick={onRestart}
          >
            Restart
          </Button>
        )}
        <Button
          variant="ghost"
          className="flex-grow h-5 sm:h-9 basis-0 sm:basis-auto hover:bg-secondary/80 hover:scale-105 active:scale-95 transition-all px-0.5 sm:px-4"
          onClick={() => 
            currentMove !== moveHistory.length - 1 && setCurrentMove(currentMove + 1)
          }
        >
          <span className="hidden sm:inline mr-2 text-sm">Next move</span>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>

        <div className="hidden lg:block text-muted-foreground/60 font-mono text-lg tracking-wider">···</div>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 sm:h-9 sm:w-9 hover:bg-secondary/80 hover:scale-105 active:scale-95 transition-all"
          onClick={() => 
            currentMove !== moveHistory.length - 1 && setCurrentMove(moveHistory.length - 1)
          }
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 -mr-2 sm:-mr-3 text-muted-foreground" />
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}

export default MoveNavigator;
