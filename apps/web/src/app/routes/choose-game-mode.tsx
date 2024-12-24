import { GameModeCard } from "@/components/game-mode-card";
import { Card } from "@/components/ui/card";
import { GAME_MODE_LIST, type GameMode } from "@/constants/game-modes";
import { usePlayerCount } from "@/hooks/use-player-count";
import { getRandomTip } from "@super-tic-tac-toe/constants/game-tips";
import { motion } from "framer-motion";
import { Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function EmptyGameModeCard() {
  return (
    <motion.div variants={item} className="h-full">
      <Card className="relative h-full border-2 border-dashed border-muted-foreground/20 bg-transparent">
        <p className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
          More modes coming soon...
        </p>
      </Card>
    </motion.div>
  );
}

function ChooseGameMode() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  const [currentTip, setCurrentTip] = useState(getRandomTip());
  const playerCount = usePlayerCount();

  useEffect(() => {
    const modes = [...GAME_MODE_LIST, null] as const;
    const handleKeyboard = (e: KeyboardEvent) => {
      const currentIndex = GAME_MODE_LIST.indexOf(selectedMode as GameMode);
      let newIndex = currentIndex;

      switch (e.key) {
        case "ArrowLeft":
          newIndex =
            currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex - 1;
          break;
        case "ArrowRight":
          newIndex =
            currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex - 1;
          break;
        case "ArrowUp":
          newIndex = currentIndex < 2 ? currentIndex + 2 : currentIndex - 2;
          break;
        case "ArrowDown":
          newIndex = currentIndex >= 2 ? currentIndex - 2 : currentIndex + 2;
          break;
        case "Enter":
          if (selectedMode) {
            navigate(`/play/${selectedMode}`);
          }
          return;
      }

      if (modes[newIndex] !== null) {
        setSelectedMode(modes[newIndex] as any);
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
      className="flex flex-col items-center"
    >
      <motion.h1
        className="mb-2 text-5xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose Game Mode
      </motion.h1>

      <motion.p
        key={currentTip}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-2 max-w-md text-center text-sm italic text-muted-foreground"
      >
        💡 {currentTip}
      </motion.p>

      <motion.div
        className="mb-2 hidden text-xs tracking-wider text-muted-foreground md:flex"
        variants={item}
      >
        Use ↑ ↓ ← → arrows to navigate, Enter to confirm
      </motion.div>

      <motion.div className="mb-6 flex gap-2" variants={item}>
        <Wifi className="size-5 animate-pulse text-green-500" />
        <span className="text-sm text-muted-foreground">
          {playerCount} players online
        </span>
      </motion.div>

      <div className="grid w-full max-w-4xl gap-4 px-4 sm:grid-cols-2 md:pl-0 lg:px-0">
        {GAME_MODE_LIST.map((mode) => (
          <GameModeCard
            key={mode}
            mode={mode}
            isSelected={selectedMode === mode}
          />
        ))}
        <EmptyGameModeCard />
      </div>

      <motion.div
        className="mt-4 text-center text-xs text-muted-foreground"
        variants={item}
      >
        Choose your preferred way to play Super Tic Tac Toe
      </motion.div>
    </motion.div>
  );
}

export default ChooseGameMode;
