import ChooseGameMode from "@/app/routes/choose-game-mode";
import OfflineGame from "@/app/routes/offline-game";
import OnlineGame from "@/app/routes/online-game";
import Root from "@/app/routes/root";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/play" element={<ChooseGameMode />} />
      <Route path="/play/offline" element={<OfflineGame />} />
      <Route path="/play/online" element={<OnlineGame />} />
    </Route>,
  ),
);

export default router;
