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
  globalIndex, // Add this prop
}: {
  handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void;
  boardId: number;
  cellId: number;
  cellValue: string | null;
  isActiveSquare: boolean;
  isLastClickedSquare: boolean;
  currentPlayerTurn: string;
  globalIndex: number;
}) {
  let value;

  if (cellValue === "X") {
    value = <X size="" />;
  } else if (cellValue === "O") {
    value = <Circle size="" />;
  } else if (isActiveSquare) {
    value = currentPlayerTurn === "X" ? <X /> : <Circle />;
  }

  const item = {
    hidden: { opacity: 0, scale: 0.3 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      custom={globalIndex}
      variants={item}
      whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
    >
      <Button
        disabled={!isActiveSquare}
        variant={
          isLastClickedSquare
            ? "default"
            : isActiveSquare
              ? "secondary"
              : "outline"
        }
        className={cn("aspect-square md:size-full size-11/12 p-2 md:rounded-md rounded-sm", {
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
