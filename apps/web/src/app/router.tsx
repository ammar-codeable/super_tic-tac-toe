import ChooseGameMode from "@/app/routes/choose-game-mode";
import OfflineGame from "@/app/routes/offline-game";
import OnlineGame from "@/app/routes/online-game";
import Root from "@/app/routes/root";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import ClassicGame from "./routes/classic-game";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to="/play" />} />
      <Route path="/play" element={<ChooseGameMode />} />
      <Route path="/play/offline" element={<OfflineGame />} />
      <Route path="/play/online" element={<OnlineGame />} />
      <Route path="/play/classic" element={<ClassicGame />} />
    </Route>,
  ),
);

export default router;
