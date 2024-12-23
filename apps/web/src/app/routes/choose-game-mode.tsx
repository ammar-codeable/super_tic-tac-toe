import { GameModeCard } from "@/components/game-mode-card";
import { Badge } from "@/components/ui/badge";
import { GAME_MODES, GAME_MODE_LIST, type GameMode } from "@/constants/game-modes";
import { usePlayerCount } from "@/hooks/use-player-count";
import {
  GAME_TIPS,
  getRandomTip,
} from "@super-tic-tac-toe/constants/game-tips";
import { motion } from "framer-motion";
import { Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function ChooseGameMode() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [currentTip, setCurrentTip] = useState(GAME_TIPS[0]);
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
      className="flex flex-1 flex-col items-center justify-center text-center"
    >
      <motion.h1
        className="my-2 text-5xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose Game Mode
      </motion.h1>

      <motion.div
        className="mb-2 max-w-md text-center text-sm text-muted-foreground"
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
        className="mb-2 hidden flex-col items-center gap-2 md:flex"
        variants={item}
      >
        <div className="text-xs tracking-wider text-muted-foreground">
          Use ↑ ↓ ← → arrows to navigate, Enter to confirm
        </div>
      </motion.div>

      <motion.div className="mb-6 flex items-center gap-4" variants={item}>
        <div className="inline-flex items-center gap-2">
          <Wifi className="h-4 w-4 animate-pulse text-green-500" />
          <span className="text-sm text-muted-foreground">
            {playerCount} players online
          </span>
        </div>
      </motion.div>

      <div className="grid w-full max-w-4xl gap-4 px-4 sm:grid-cols-2 md:pl-0 lg:px-0">
        {GAME_MODE_LIST.map((mode) => (
          <GameModeCard
            key={mode}
            mode={mode}
            isSelected={selectedMode === mode}
            {...GAME_MODES[mode]}
            extraBadge={
              <Badge variant="secondary">
                {GAME_MODES[mode].isOnline ? "Online" : "Offline"}
              </Badge>
            }
          />
        ))}
        <GameModeCard mode={null} isSelected={false} />
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
