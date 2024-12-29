import logo from "@/assets/logo.png";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  GAME_MODES,
  GAME_MODE_LIST,
  type GameMode,
} from "@/constants/game-modes";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { Gamepad2, Home } from "lucide-react";
import { Fragment } from "react";
import { Link, useLocation } from "react-router";
import ThemeToggle from "@/components/theme-toggle";

function BreadcrumbNav() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  type RouteMetadata = {
    "": { label: string; icon: React.ReactNode };
    play: { label: string; icon: React.ReactNode };
    
  } | Record<GameMode, { label: string; icon: React.ReactNode }>;

  const routeMetadata: RouteMetadata = {
    "": { label: "Home", icon: <Home className="size-4" /> },
    play: { label: "Play", icon: <Gamepad2 className="size-4" /> },
    ...Object.fromEntries(
      GAME_MODE_LIST.map((mode) => [
        mode,
        { label: GAME_MODES[mode].label, icon: GAME_MODES[mode].navIcon },
      ]),
    ),
  } as const;

  const renderBreadcrumbContent = (
    path: string,
    to: string,
    isLast: boolean,
  ) => {
    const metadata = routeMetadata[path as keyof typeof routeMetadata];
    const isGameMode = GAME_MODE_LIST.includes(path as GameMode);

    if (isGameMode) {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-9 w-9 items-center justify-center hover:text-foreground">
                <BreadcrumbEllipsis />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              {GAME_MODE_LIST.map((mode) => (
                <DropdownMenuItem key={mode}>
                  <BreadcrumbLink
                    to={`/play/${mode}`}
                    className="flex items-center gap-1.5"
                  >
                    {routeMetadata[mode].icon}
                    {routeMetadata[mode].label}
                  </BreadcrumbLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <BreadcrumbSeparator className="text-muted-foreground/50" />

          <BreadcrumbLink
            to={to}
            className={cn("flex items-center gap-1.5", {
              "font-medium": isLast,
            })}
          >
            {metadata.icon}
            {metadata.label}
          </BreadcrumbLink>
        </>
      );
    }

    return (
      <BreadcrumbLink to={to} className="flex items-center gap-1.5">
        {metadata.icon}
        {metadata.label}
      </BreadcrumbLink>
    );
  };

  return (
    <Breadcrumb>
      <BreadcrumbList className="bg-background/50 px-3">
        <BreadcrumbItem>
          <BreadcrumbLink to="/" className="flex items-center gap-1.5">
            {routeMetadata[""].icon}
            {routeMetadata[""].label}
          </BreadcrumbLink>
        </BreadcrumbItem>

        {paths.map((path, index) => {
          const to = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;

          return (
            <Fragment key={path}>
              <BreadcrumbSeparator className="text-muted-foreground/50" />
              <BreadcrumbItem
                className={cn({
                  "font-bold": isLast,
                })}
              >
                {renderBreadcrumbContent(path, to, isLast)}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function Header() {
  return (
    <div>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex h-16 items-center justify-between border-sidebar border-b-sidebar bg-sidebar md:h-12 md:justify-between md:bg-inherit"
      >
        <div className="flex h-full items-center">
          <SidebarTrigger className="ml-2 block md:hidden" />
          <Separator orientation="vertical" className="hidden h-7 md:block" />
          <div className="hidden md:block">
            <BreadcrumbNav />
          </div>
        </div>
        <Link to="/" className="block h-full md:hidden">
          <img src={logo} alt="Logo" className="h-full" />
        </Link>
        <ThemeToggle className="mr-2" />
      </motion.header>
      <div className="md:hidden">
        <BreadcrumbNav />
      </div>
    </div>
  );
}
