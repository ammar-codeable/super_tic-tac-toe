import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function ResignConfirmationModal({
  open,
  onOpenChange,
  handleResign,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleResign: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resign Game</DialogTitle>
          <DialogDescription>
            Are you sure you want to resign?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={handleResign} variant="destructive">
              Resign
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ResignConfirmationModal;
