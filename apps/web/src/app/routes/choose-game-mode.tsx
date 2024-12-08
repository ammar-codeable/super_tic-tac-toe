import { GameModeCard } from "@/components/game-mode-card";
import { Badge } from "@/components/ui/badge";
import { usePlayerCount } from "@/hooks/use-player-count";
import { GAME_TIPS, getRandomTip } from "@repo/constants/game-tips";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Globe,
  Grid,
  HandshakeIcon,
  MessageSquare,
  Timer,
  Users,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function ChooseGameMode() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<
    "online" | "offline" | "classic" | null
  >(null);
  const [currentTip, setCurrentTip] = useState(GAME_TIPS[0]);
  const playerCount = usePlayerCount();

  useEffect(() => {
    const modes = ["offline", "online", "classic", null] as const; // null represents the "coming soon" card
    const handleKeyboard = (e: KeyboardEvent) => {
      const currentIndex = modes.indexOf(selectedMode as any);
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

  const gameModes = {
    offline: {
      icon: <HandshakeIcon className="scale-[1.2]" />,
      title: "Local Play",
      badge: {
        icon: <WifiOff className="mr-1 h-3 w-3" />,
        text: "No Internet Required",
      },
      description:
        "Challenge a friend sitting next to you in a local multiplayer game",
      features: [
        { icon: <Timer className="h-4 w-4" />, text: "No Time Limit" },
        { icon: <Zap className="h-4 w-4" />, text: "Instant Start" },
      ],
      extraBadge: <Badge variant="secondary">Offline</Badge>,
    },
    online: {
      icon: <Globe />,
      title: "Quick Match",
      badge: {
        icon: <Wifi className="mr-1 h-3 w-3" />,
        text: "Quick Play",
      },
      description: "Jump into fast-paced online matches with players worldwide",
      features: [
        { icon: <Users className="h-4 w-4" />, text: "Auto Match" },
        { icon: <MessageSquare className="h-4 w-4" />, text: "Live Chat" },
      ],
      extraBadge: (
        <div className="flex gap-1">
          <Badge variant="secondary">Online</Badge>
        </div>
      ),
    },
    classic: {
      icon: <Grid className="rotate-45" />,
      title: "Classic Mode",
      badge: {
        icon: <Grid className="mr-1 h-3 w-3" />,
        text: "Traditional",
      },
      description:
        "Play the traditional 3x3 Tic-tac-toe game you know and love",
      features: [
        { icon: <Timer className="h-4 w-4" />, text: "Quick Games" },
        { icon: <BrainCircuit className="h-4 w-4" />, text: "Simple Rules" },
      ],
      extraBadge: <Badge variant="secondary">Offline</Badge>,
    },
  };

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

      <div className="grid w-full lg:px-0 md:pl-0 px-4 max-w-4xl gap-4 sm:grid-cols-2">
        {(["offline", "online", "classic"] as const).map((mode) => (
          <GameModeCard
            key={mode}
            mode={mode}
            isSelected={selectedMode === mode}
            {...gameModes[mode]}
          />
        ))}
        <div className="relative h-full">
          <div className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20">
            <p className="text-sm text-muted-foreground">
              More modes coming soon...
            </p>
          </div>
        </div>
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
