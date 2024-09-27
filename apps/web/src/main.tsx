import App from "@/app/app.tsx";
import "@/index.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { createRoot } from "react-dom/client";

createRoot(document.querySelector("#root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
