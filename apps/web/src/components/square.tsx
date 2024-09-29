import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Circle, X } from "lucide-react";

function Square({
  handlePlay,
  boardId,
  cellId,
  cellValue,
  isActiveSquare,
  isLastClickedSquare,
  currentPlayerTurn,
}: {
  handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void;
  boardId: number;
  cellId: number;
  cellValue: string | null;
  isActiveSquare: boolean;
  isLastClickedSquare: boolean;
  currentPlayerTurn: string;
}) {
  let value;

  if (cellValue === "X") {
    value = <X size="" />;
  } else if (cellValue === "O") {
    value = <Circle size="" />;
  } else if (isActiveSquare) {
    value = currentPlayerTurn === "X" ? <X /> : <Circle />;
  }

  return (
    <motion.div whileTap={{ scale: 0.9 }}>
      <Button
        disabled={!isActiveSquare}
        variant={
          isLastClickedSquare
            ? "default"
            : isActiveSquare
              ? "secondary"
              : "outline"
        }
        className={cn("aspect-square size-full", {
          "opacity-50": !isActiveSquare,
          "opacity-80": isActiveSquare || value,
        })}
        onClick={() => {
          handlePlay(boardId, cellId, true);
        }}
      >
        {value}
      </Button>
    </motion.div>
  );
}

export default Square;
