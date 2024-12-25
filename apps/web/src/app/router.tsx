import ChooseGameMode from "@/app/routes/choose-game-mode";
import OfflineGame from "@/app/routes/offline-game";
import OnlineGame from "@/app/routes/online-game";
import Root from "@/app/routes/root";
import { Navigate, Route, Routes } from "react-router";
import ClassicGame from "./routes/classic-game";

export const routes = (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to="/play" />} />
      <Route path="/play" element={<ChooseGameMode />} />
      <Route path="/play/offline" element={<OfflineGame />} />
      <Route path="/play/online" element={<OnlineGame />} />
      <Route path="/play/classic" element={<ClassicGame />} />
    </Route>
  </Routes>
);
