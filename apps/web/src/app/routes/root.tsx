import logo from "@/assets/logo.png";
import playIcon from "@/assets/play-icon.png";
import ThemeToggle from "@/components/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";

function MobileHeader() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex h-16 items-center justify-between border-b border-sidebar-border bg-sidebar"
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
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={label}
                >
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
      </Sidebar>
    </>
  );
}

function Root() {
  const isMobile = useIsMobile();

  return (
    <div className="flex w-screen">
      <AppSidebar />
      <main className="flex flex-1">
        <div className="relative flex flex-1">
          {!isMobile && (
            <>
              <div className="flex h-full flex-col pl-2 pt-2">
                <SidebarTrigger />
              </div>
              <div className="absolute right-3 top-3 z-50">
                <ThemeToggle />
              </div>
            </>
          )}

          <div className="flex flex-1 flex-col">
            {isMobile && <MobileHeader />}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Root;
