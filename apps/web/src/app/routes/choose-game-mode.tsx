import { GameModeCard } from "@/components/game-mode-card";
import { Badge } from "@/components/ui/badge";
import { usePlayerCount } from "@/hooks/use-player-count";
import { GAME_TIPS, getRandomTip } from "@repo/constants/game-tips";
import { motion } from "framer-motion";
import { Globe, MessageSquare, Timer, Users, Wifi, WifiOff, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function ChooseGameMode() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<"online" | "offline" | null>(
    null,
  );
  const [currentTip, setCurrentTip] = useState(GAME_TIPS[0]);
  const playerCount = usePlayerCount();

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

  const gameModes = {
    offline: {
      icon: <Users />,
      title: "Offline Mode",
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
    },
    online: {
      icon: <Globe />,
      title: "Online Mode",
      badge: {
        icon: <Wifi className="mr-1 h-3 w-3" />,
        text: "Real-time Multiplayer",
      },
      description:
        "Connect with players worldwide and compete in real-time matches",
      features: [
        { icon: <Users className="h-4 w-4" />, text: "Match Making" },
        { icon: <MessageSquare className="h-4 w-4" />, text: "Live Chat" },
      ],
      extraBadge: (
        <Badge variant="destructive" className="animate-pulse">
          LIVE
        </Badge>
      ),
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
      className="flex flex-1 flex-col items-center justify-center p-4 md:min-h-screen md:p-8"
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
            {playerCount} players online
          </span>
        </div>
      </motion.div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {(["offline", "online"] as const).map((mode) => (
          <GameModeCard
            key={mode}
            mode={mode}
            isSelected={selectedMode === mode}
            {...gameModes[mode]}
          />
        ))}
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
