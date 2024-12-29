import { AppSidebar } from "@/components/layouts/app-sidebar";
import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import { TicTacToeBackground } from "@/components/tic-tac-toe-background";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

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
