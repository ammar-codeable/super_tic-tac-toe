import Root from "@/app/routes/root";
import { Navigate, Route, Routes } from "react-router";
import ClassicGame from "@/app/routes/classic/classic";
import OfflineGame from "@/app/routes/offline/offline";
import OnlineGame from "@/app/routes/online/online";
import ChooseGameMode from "@/app/routes/play/play";

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
