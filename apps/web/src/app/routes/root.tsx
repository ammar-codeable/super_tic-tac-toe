import imgUrl from "@/assets/logo.png";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";

function Header({ className }: { className: string }) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn("flex h-14 items-center", className)}
    >
      <Button variant="ghost" className="rounded-none p-0 md:hidden">
        <Menu size="44" />
      </Button>
      <Link to="/" className="h-4/5">
        <img src={imgUrl} alt="Logo" className="h-full" />
      </Link>
    </motion.div>
  );
}

function SideBar() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex h-screen w-20 flex-col justify-start gap-8 border-r-2 xl:w-40"
    >
      <Link to="/">
        <img src={imgUrl} alt="Logo" />
      </Link>
      <NavLink
        className={({ isActive }) => {
          let style = "h-14 w-full";
          style += isActive ? " " + "bg-accent" : "";
          return style;
        }}
        to="/play"
      >
        <Button
          variant="ghost"
          className="size-full rounded-none text-lg font-extrabold"
        >
          Play
        </Button>
      </NavLink>
      <ThemeToggle className="m-3 mt-auto self-end" />
    </motion.div>
  );
}

function Root() {
  return (
    <div className="flex flex-col md:flex-row">
      <Header className="md:hidden" />
      <div className="hidden md:block">
        <SideBar />
      </div>
      <div className="flex h-screen w-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
