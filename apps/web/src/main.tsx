import App from "@/app/app.tsx";
import "@/index.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { createRoot } from "react-dom/client";
import { SidebarProvider } from "./components/ui/sidebar";

createRoot(document.querySelector("#root")!).render(
  <SidebarProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </SidebarProvider>,
);
