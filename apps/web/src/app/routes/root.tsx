import logo from "@/assets/logo.png";
import playIcon from "@/assets/play-icon.png";
import TutorialModal from "@/components/rules-modal";
import ThemeToggle from "@/components/theme-toggle";
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
import { motion } from "framer-motion";
import { ChevronRight, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

function MobileHeader() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex h-16 w-screen items-center justify-between border-b border-sidebar-border bg-sidebar mb-4"
    >
      <SidebarTrigger className="ml-2" />
      <Link to="/" className="h-full">
        <img src={logo} alt="Logo" className="h-full" />
      </Link>
      <ThemeToggle className="mr-2" />
    </motion.header>
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
      <Sidebar collapsible={isMobile ? "offcanvas" : "icon"}>
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
      {Array.from({ length: 6 }).map((_, i) => (
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

function Root() {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 flex overflow-hidden">
      <TicTacToeBackground />
      <AppSidebar />
      <div className="flex flex-1">
        {!isMobile && (
          <>
            <div className="flex h-full flex-col pl-2 pt-2">
              <SidebarTrigger />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex justify-end pr-2 pt-2">
                <ThemeToggle />
              </div>
              <div className="flex-1 overflow-hidden">
                <Outlet />
              </div>
            </div>
          </>
        )}
        {isMobile && (
          <div className="flex w-full flex-col">
            <MobileHeader />
            <div className="flex-1 overflow-hidden">
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Root;
