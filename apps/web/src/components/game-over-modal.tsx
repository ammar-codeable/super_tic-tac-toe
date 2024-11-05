import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Link } from "react-router-dom";

function GameOverModal({ gameResult }: { gameResult: string | null }) {
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

  console.log(gameResult);
  

  const [open, setOpen] = useState(!!gameResult);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex h-fit flex-col items-center justify-around gap-6">
        <DialogHeader className="flex items-center">
          <DialogTitle className="text-3xl">{gameStatus}</DialogTitle>
          <DialogDescription>Game Over</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"secondary"}>
              Go back to game
            </Button>
          </DialogClose>
          <Link to="/play">
            <Button>Go back to home</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default GameOverModal;
