import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { ThemeProvider } from "./app/Theme-provider.tsx";
import "./index.css";

// TODO: Add types to entire project.
// TODO: Fix git history.
// TODO: Style Project.
// TODO: Make it responsive.
// TODO: Go through all code and make it cleaner.
// TODO: Implement offline and online multiplayer modes separately.

createRoot(document.querySelector("#root")!).render(
	<StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</StrictMode>,
);
