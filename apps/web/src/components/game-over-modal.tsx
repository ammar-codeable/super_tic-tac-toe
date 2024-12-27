import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { Link } from "react-router";

function GameOverModal({
  gameResult,
  onRestart,
  isOnlineGame,
  onRematch,
  disconnected,
  rematchDeclined,
}: {
  gameResult: "X_RESIGNED" | "O_RESIGNED" | "X" | "O" | "DRAW" | null;
  onRestart: () => void;
  isOnlineGame?: boolean;
  onRematch?: () => void;
  disconnected?: boolean;
  rematchDeclined?: boolean;
}) {
  let gameStatus: string | undefined;

  if (gameResult === "X_RESIGNED") {
    gameStatus = "Player X resigned!";
  } else if (gameResult === "O_RESIGNED") {
    gameStatus = "Player O resigned!";
  } else if (gameResult === "X") {
    gameStatus = "Player X wins!";
  } else if (gameResult === "O") {
    gameStatus = "Player O wins!";
  } else if (gameResult === "DRAW") {
    gameStatus = "It's a tie...";
  }

  const [open, setOpen] = useState(!!gameResult);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{gameStatus}</DialogTitle>
          <DialogDescription>Game Over</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link to="/play">
            <Button variant={"secondary"}>Go back to home</Button>
          </Link>
          {!isOnlineGame ? (
            <Button type="button" onClick={onRestart}>
              Start New Game
            </Button>
          ) : (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button
                      type="button"
                      onClick={onRematch}
                      disabled={disconnected || rematchDeclined}
                      className={
                        disconnected || rematchDeclined
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }
                    >
                      Request Rematch
                    </Button>
                  </span>
                </TooltipTrigger>
                {(disconnected || rematchDeclined) && (
                  <TooltipContent side="top">
                    <p>
                      {disconnected
                        ? "Opponent has disconnected"
                        : "Opponent declined rematch"}
                    </p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default GameOverModal;
