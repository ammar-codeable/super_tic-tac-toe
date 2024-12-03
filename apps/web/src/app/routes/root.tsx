import logo from "@/assets/logo.png";
import playIcon from "@/assets/play-icon.png";
import TutorialModal from "@/components/rules-modal";
import ThemeToggle from "@/components/theme-toggle";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Gamepad2,
  Github,
  HelpCircle,
  Home,
  User,
  Users,
} from "lucide-react";
import { Fragment, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

function BreadcrumbNav() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  const routeMetadata = {
    "": { label: "Home", icon: <Home className="size-4" /> },
    play: { label: "Play", icon: <Gamepad2 className="size-4" /> },
    classic: { label: "Classic Mode", icon: <Gamepad2 className="size-4" /> },
    offline: { label: "Offline Mode", icon: <User className="size-4" /> },
    online: { label: "Online Mode", icon: <Users className="size-4" /> },
  } as const;

  const gameModePaths = ["classic", "offline", "online"] as const;

  const renderBreadcrumbContent = (
    path: string,
    to: string,
    isLast: boolean,
  ) => {
    const metadata = routeMetadata[path as keyof typeof routeMetadata];
    const isGameMode = gameModePaths.includes(path as any);

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
              {gameModePaths.map((mode) => (
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

function Header() {
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

function NavigationItems() {
  const NAVIGATION_ITEMS = [
    {
      label: "Play",
      icon: playIcon,
      href: "/play",
    },
  ] as const;

  return (
    <SidebarGroup>
      <SidebarMenu>
        {NAVIGATION_ITEMS.map(({ label, icon, href }) => (
          <SidebarMenuItem key={href}>
            <NavLink to={href}>
              {({ isActive }) => (
                <SidebarMenuButton isActive={isActive} tooltip={label}>
                  <img className="size-12" src={icon} alt={`${label} Icon`} />
                  <span className="text-xl">{label}</span>
                  <ChevronRight className="ml-auto" />
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function AppSidebar() {
  const isMobile = useIsMobile();
  const [showRules, setShowRules] = useState(false);

  return (
    <>
      <Sidebar collapsible={isMobile ? "offcanvas" : "icon"} variant="floating">
        <SidebarHeader>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-16" />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <NavigationItems />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton
            onClick={() => setShowRules(true)}
            tooltip="Game Rules"
          >
            <HelpCircle className="size-6" />
            <span>How to Play?</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger className="mx-1 mt-2.5 hidden md:block" />
      <TutorialModal open={showRules} onOpenChange={setShowRules} />
    </>
  );
}

function TicTacToeBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 opacity-[0.06]"
      style={{
        background: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
        backgroundSize: "33.33% 33.33%",
        animation: "moveBg 60s linear infinite",
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-6xl font-bold opacity-100"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            "--rotation": `${Math.random() * 360}deg`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `float ${5 + Math.random() * 5}s infinite alternate ease-in-out`,
          }}
        >
          {Math.random() > 0.5 ? "X" : "O"}
        </div>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <motion.footer
      className="flex h-8 items-center justify-end px-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <a
        href="https://github.com/ammar-codeable/super_tic-tac-toe"
        target="_blank"
        className="text-md flex items-center gap-2 transition-transform hover:scale-105"
      >
        <Github className="size-4" />
        <span>View on GitHub</span>
      </a>
    </motion.footer>
  );
}

function Root() {
  return (
    <ScrollArea className="w-screen">
      <TicTacToeBackground />
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col justify-between">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
      <Toaster />
    </ScrollArea>
  );
}

export default Root;
