import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { ThemeProvider } from "./components/Theme-provider.tsx";
import "./index.css";


// TODO: Add types to entire project.
// TODO: Fix git history.
// TODO: Style Project
// TODO: Make it responsive
createRoot(document.querySelector("#root")!).render(
	<>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</>
);
