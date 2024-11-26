import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Link } from "react-router-dom";

function GameOverModal({
  gameResult,
  onRestart,
  isOnlineGame,
}: {
  gameResult: "X_RESIGNED" | "O_RESIGNED" | "X" | "O" | "DRAW" | null;
  onRestart: () => void;
  isOnlineGame?: boolean;
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
      <DialogContent className="flex h-fit flex-col items-center justify-around gap-6">
        <DialogHeader className="flex items-center">
          <DialogTitle className="text-3xl">{gameStatus}</DialogTitle>
          <DialogDescription>Game Over</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link to="/play">
            <Button variant={"secondary"}>Go back to home</Button>
          </Link>
          {!isOnlineGame && (
            <Button type="button" onClick={onRestart}>
              Start New Game
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default GameOverModal;
