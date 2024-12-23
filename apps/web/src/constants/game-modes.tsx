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

export const GAME_MODE_LIST = ['classic', 'online', 'offline'] as const;
export type GameMode = typeof GAME_MODE_LIST[number];

export type GameModeConfig = {
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
  navIcon: React.ReactNode;
  label: string;
  isOnline: boolean;
};

export const GAME_MODES: Record<GameMode, GameModeConfig> = {
  classic: {
    icon: <Grid className="rotate-45" />,
    title: "Classic Mode",
    badge: {
      icon: <Grid className="mr-1 h-3 w-3" />,
      text: "Traditional",
    },
    description: "Play the traditional 3x3 Tic-tac-toe game you know and love",
    features: [
      { icon: <Timer className="h-4 w-4" />, text: "Quick Games" },
      { icon: <BrainCircuit className="h-4 w-4" />, text: "Simple Rules" },
    ],
    navIcon: <Grid className="size-4" />,
    label: "Classic Mode",
    isOnline: false,
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
    navIcon: <Users className="size-4" />,
    label: "Online Mode",
    isOnline: true,
  },
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
    navIcon: <Users className="size-4" />,
    label: "Offline Mode",
    isOnline: false,
  },
} as const;

