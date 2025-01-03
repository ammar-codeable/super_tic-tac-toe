import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router";

function DisconnectModal() {
  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game disconnected...</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex gap-x-8">
          <DialogClose asChild>
            <Link to="/play">
              <Button>Go to home</Button>
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DisconnectModal;
