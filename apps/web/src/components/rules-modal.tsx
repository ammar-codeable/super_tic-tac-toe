import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, Grid, Target, Trophy, XCircle } from "lucide-react";

function RulesModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const rules = [
    {
      icon: <Grid className="size-5 text-primary" />,
      title: "The Basics",
      description: "Play in a giant 3x3 grid where each cell contains its own small Tic-tac-toe board."
    },
    {
      icon: <Trophy className="size-5 text-yellow-500" />,
      title: "Winning Strategy",
      description: "Win three small boards in a row (horizontally, vertically, or diagonally) to win the game!"
    },
    {
      icon: <Target className="size-5 text-destructive" />,
      title: "Strategic Movement",
      description: "Your move position in a small board determines which board your opponent must play in next."
    },
    {
      icon: <ArrowRight className="size-5 text-green-500" />,
      title: "Free Move",
      description: "If sent to a completed board, you can choose any available board to play in."
    },
    {
      icon: <XCircle className="size-5 text-muted-foreground" />,
      title: "Board Completion",
      description: "A small board is won by getting three in a row, or declared a draw if no more moves are possible."
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] max-w-2xl flex-col gap-6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            🎮 How to Play Super Tic-tac-toe
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-muted-foreground">
          <p className="leading-relaxed">
            Super Tic-tac-toe adds an exciting strategic layer to the classic game you know and love! 🎯
          </p>

          <div className="space-y-4">
            {rules.map((rule, index) => (
              <div key={index} className="flex gap-3">
                <div className="mt-0.5">{rule.icon}</div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{rule.title}</h3>
                  <p className="text-sm leading-relaxed">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-muted p-4 text-sm space-y-2">
            <p className="font-medium text-foreground">💡 Pro Tips:</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Think two moves ahead - where will your move send your opponent?</li>
              <li>Sometimes forcing a draw in a small board is better than losing it</li>
              <li>Watch out for board combinations that could lead to a win</li>
            </ul>
          </div>
        </div>

        <DialogClose asChild>
          <Button className="self-end">Got it! Let's Play 🎲</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default RulesModal;
