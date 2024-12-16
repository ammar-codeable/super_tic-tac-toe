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

function ChoosePlayerModal({
  socket,
  gameId,
}: {
  socket: (message: any) => void;
  gameId: string;
}) {
  const [chosenMark, setChosenMark] = useState("");

  return (
    <Dialog open={true}>
      <DialogContent className="flex h-fit flex-col items-center justify-around gap-6">
        <DialogHeader className="flex items-center">
          <DialogTitle className="text-3xl">
            {!chosenMark ? "Select Player" : "Waiting for opponent..."}
          </DialogTitle>
          <DialogDescription className="text-pretty text-center">
            Players will be assigned randomly if both players choose the same
            option.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={chosenMark === "X" ? "secondary" : "default"}
              onClick={() => {
                setChosenMark("X");
                socket({ type: "player", player: "X" });
              }}
            >
              Player X
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant={chosenMark === "O" ? "secondary" : "default"}
              onClick={() => {
                setChosenMark("O");
                socket({ type: "player", player: "O" });
              }}
            >
              Player O
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChoosePlayerModal;
