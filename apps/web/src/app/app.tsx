import { AppProvider } from "@/app/provider";
import { BrowserRouter } from "react-router";
import { routes } from "./router";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>{routes}</BrowserRouter>
    </AppProvider>
  );
}

export default App;
