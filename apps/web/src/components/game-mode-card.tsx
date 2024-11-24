import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { cloneElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function checkWinner(squares: string[]): { winner: string | null; line: number[] | null; } {
  const lines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
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
      const available = board.map((v, i) => v ? -1 : i).filter(i => i !== -1);
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
      setMoves(prev => [...prev, 1]);
    };

    const timeoutId = setTimeout(makeMove, 800);
    return () => clearTimeout(timeoutId);
  }, [board, moves]);

  return (
    <div className="mx-auto mb-4 grid h-24 w-24 select-none grid-cols-3 gap-1 rounded-lg border border-primary/10 p-2">
      {board.map((value, i) => (
        <div
          key={i}
          className={cn(
            "flex aspect-square items-center justify-center rounded-sm text-xs",
            value && "bg-primary/5",
            winningLine?.includes(i) && "animate-pulse bg-primary/20"
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

export function GameModeCard({ mode, isSelected, icon, title, badge, description, features, extraBadge }: {
	mode: "online" | "offline";
	isSelected: boolean;
	icon: React.ReactNode;
	title: string;
	badge: {
	  icon: React.ReactNode;
	  text: string;
	};
	description: string;
	features: Array<{
	  icon: React.ReactNode;
	  text: string;
	}>;
	extraBadge?: React.ReactNode;
  }) {
  return (
    <motion.div variants={item} whileTap={{ scale: 0.98 }} className="h-full">
      <Link to={`/play/${mode}`} className="group block h-full">
        <Card className={cn(
          "relative h-full my-3 cursor-pointer border-2 p-6 transition-all hover:scale-105 hover:border-primary hover:shadow-lg",
          isSelected ? "scale-105 border-primary shadow-lg" : "border-transparent"
        )}>
          {extraBadge && (
            <div className="absolute right-3 top-3 z-10">
              {extraBadge}
            </div>
          )}
          <div className="relative">
            <div>
              <GameModePreview />
            </div>
          </div>
          <CardHeader className="items-center gap-4 text-center">
            {cloneElement(icon as React.ReactElement, {
              className: "h-12 w-12 text-primary transition-transform group-hover:scale-110"
            })}
            <div className="space-y-2">
              <CardTitle>{title}</CardTitle>
              <Badge variant="secondary" className="mb-2">
                {badge.icon} {badge.text}
              </Badge>
              <CardDescription>{description}</CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="flex-col gap-2 pt-4">
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              {features.map((feature, index) => (
                <span key={index} className="flex items-center gap-1">
                  {feature.icon} {feature.text}
                </span>
              ))}
            </div>
          </CardFooter>
          <motion.div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100"
            initial={false}
            animate={{ opacity: isSelected ? 0.1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </Card>
      </Link>
    </motion.div>
  );
}