import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GAME_TIPS, getRandomTip } from "@repo/constants/game-tips";
import { motion } from "framer-motion";
import { Globe, Timer, Users, Wifi, WifiOff, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="mx-auto mb-4 grid h-24 w-24 select-none grid-cols-3 gap-1 rounded-lg border border-primary/10 p-1">
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

function ChooseGameMode() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<"online" | "offline" | null>(
    null,
  );
  const [currentTip, setCurrentTip] = useState(GAME_TIPS[0]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setSelectedMode("offline");
      if (e.key === "ArrowRight") setSelectedMode("online");
      if (e.key === "Enter") {
        navigate(`/play/${selectedMode}`);
      }
    };
    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [selectedMode, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(getRandomTip());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="flex min-h-screen flex-col items-center justify-center"
    >
      <motion.h1
        className="mb-6 text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose Game Mode
      </motion.h1>

      <motion.div
        className="mb-4 max-w-md text-center text-sm text-muted-foreground"
        variants={item}
      >
        <motion.p
          key={currentTip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="italic"
        >
          💡 {currentTip}
        </motion.p>
      </motion.div>

      <motion.div
        className="mb-8 hidden flex-col items-center gap-2 md:flex"
        variants={item}
      >
        <div className="text-xs tracking-wider text-muted-foreground">
          Use ← → arrows to select, Enter to confirm
        </div>
      </motion.div>

      <motion.div className="mb-12 flex items-center gap-4" variants={item}>
        <div className="inline-flex items-center gap-2">
          <Wifi className="h-4 w-4 animate-pulse text-green-500" />
          <span className="text-sm text-muted-foreground">
            {Math.floor(Math.random() * 100) + 50} players online
          </span>
        </div>
      </motion.div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          variants={item}
          whileTap={{ scale: 0.98 }}
          className="h-full"
        >
          <Link to="/play/offline" className="group block h-full">
            <Card
              className={`h-full cursor-pointer border-2 p-6 transition-all ${selectedMode === "offline" ? "scale-105 border-primary shadow-lg" : "border-transparent"} hover:scale-105 hover:border-primary hover:shadow-lg`}
            >
              <GameModePreview />
              <CardHeader className="items-center gap-4 text-center">
                <Users className="h-12 w-12 text-primary transition-transform group-hover:scale-110" />
                <div className="space-y-2">
                  <CardTitle>Offline Mode</CardTitle>
                  <Badge variant="secondary" className="mb-2">
                    <WifiOff className="mr-1 h-3 w-3" /> No Internet Required
                  </Badge>
                  <CardDescription>
                    Challenge a friend sitting next to you in a local
                    multiplayer game
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="flex-col gap-2 pt-4">
                <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Timer className="h-4 w-4" /> No Time Limit
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="h-4 w-4" /> Instant Start
                  </span>
                </div>
              </CardFooter>
              <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ opacity: selectedMode === "offline" ? 0.1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </Card>
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          whileTap={{ scale: 0.98 }}
          className="h-full"
        >
          <Link to="/play/online" className="group block h-full">
            <Card
              className={`relative h-full cursor-pointer border-2 p-6 transition-all ${selectedMode === "online" ? "scale-105 border-primary shadow-lg" : "border-transparent"} hover:scale-105 hover:border-primary hover:shadow-lg`}
            >
              <GameModePreview />
              <div className="absolute right-2 top-2">
                <Badge variant="destructive" className="animate-pulse">
                  LIVE
                </Badge>
              </div>
              <CardHeader className="items-center gap-4 text-center">
                <Globe className="h-12 w-12 text-primary transition-transform group-hover:scale-110" />
                <div className="space-y-2">
                  <CardTitle>Online Mode</CardTitle>
                  <Badge variant="secondary" className="mb-2">
                    <Wifi className="mr-1 h-3 w-3" /> Real-time Multiplayer
                  </Badge>
                  <CardDescription>
                    Connect with players worldwide and compete in real-time
                    matches
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="flex-col gap-2 pt-4">
                <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> Match Making
                  </span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 text-center text-xs text-muted-foreground"
        variants={item}
      >
        Choose your preferred way to play Super Tic Tac Toe
      </motion.div>
    </motion.div>
  );
}

export default ChooseGameMode;
