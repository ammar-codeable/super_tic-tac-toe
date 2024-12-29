import logo from "@/assets/logo.png";
import playIcon from "@/assets/play-icon.png";
import TutorialModal from "@/components/rules-modal";
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
import { ChevronRight, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

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

export function AppSidebar() {
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
