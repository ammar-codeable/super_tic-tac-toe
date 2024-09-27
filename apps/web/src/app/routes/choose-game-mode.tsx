import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function ChooseGameMode() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-evenly">
      <Link to="/play/offline">
        <Button>Offline Mode</Button>
      </Link>
      <Link to="/play/online">
        <Button>Online Mode</Button>
      </Link>
    </div>
  );
}

export default ChooseGameMode;
