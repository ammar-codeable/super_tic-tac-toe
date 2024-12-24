import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GameMode, GameModeConfig } from "@/constants/game-modes";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { cloneElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function checkWinner(squares: string[]): {
  winner: string | null;
  line: number[] | null;
} {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: null };
}

function GameModePreview() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [moves, setMoves] = useState<number[]>([]);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  useEffect(() => {
    const resetGame = () => {
      setBoard(Array(9).fill(""));
      setMoves([]);
      setWinningLine(null);
    };

    const makeMove = () => {
      const available = board
        .map((v, i) => (v ? -1 : i))
        .filter((i) => i !== -1);
      if (!available.length) {
        setTimeout(resetGame, 1000);
        return;
      }

      const move = available[Math.floor(Math.random() * available.length)];
      const newBoard = [...board];
      newBoard[move] = moves.length % 2 === 0 ? "X" : "O";

      const { winner, line } = checkWinner(newBoard);
      if (winner) {
        setBoard(newBoard);
        setWinningLine(line);
        setTimeout(resetGame, 1000);
        return;
      }

      setBoard(newBoard);
      setMoves((prev) => [...prev, 1]);
    };

    const timeoutId = setTimeout(makeMove, 800);
    return () => clearTimeout(timeoutId);
  }, [board, moves]);

  return (
    <div className="mx-auto mb-2 grid h-16 w-16 select-none grid-cols-3 gap-1 rounded-lg border border-primary/10">
      {board.map((value, i) => (
        <div
          key={i}
          className={cn(
            "flex aspect-square items-center justify-center rounded-sm text-xs",
            value && "bg-primary/5",
            winningLine?.includes(i) && "animate-pulse bg-primary/20",
          )}
        >
          {value && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={value === "X" ? "text-primary/70" : "text-primary/70"}
            >
              {value}
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}

export function GameModeCard({
  mode,
  icon,
  title,
  badge,
  description,
  features,
  isSelected,
  extraBadge,
}: GameModeConfig & {
  mode: GameMode;
  isSelected?: boolean;
  extraBadge?: React.ReactNode;
}) {
  if (mode === null) {
    return (
      <motion.div variants={item} className="h-full">
        <Card className="relative h-full border-2 border-dashed border-muted-foreground/20 bg-transparent">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              More modes coming soon...
            </p>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div variants={item} whileTap={{ scale: 0.98 }} className="h-full">
      <Link to={`/play/${mode}`} className="group block h-full">
        <Card
          className={cn(
            "relative h-full cursor-pointer border-2 p-2 transition-all hover:scale-105 hover:border-primary hover:shadow-lg",
            isSelected
              ? "scale-105 border-primary shadow-lg"
              : "border-transparent",
          )}
        >
          {extraBadge && (
            <div className="absolute right-3 top-3 z-10">{extraBadge}</div>
          )}
          <div className="relative">
            <div>
              <GameModePreview />
            </div>
          </div>
          <CardHeader className="items-center gap-2 p-3 text-center">
            {cloneElement(icon as React.ReactElement, {
              className:
                "h-8 w-8 text-primary transition-transform group-hover:scale-110",
            })}
            <div className="space-y-1">
              <CardTitle>{title}</CardTitle>
              <Badge variant="secondary" className="mb-2">
                {badge.icon} {badge.text}
              </Badge>
              <CardDescription>{description}</CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="flex justify-center gap-4 text-sm text-muted-foreground">
            {features.map((feature, index) => (
              <span key={index} className="flex items-center gap-1">
                {feature.icon} {feature.text}
              </span>
            ))}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
