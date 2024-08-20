import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

function GameOver({
	result,
	resetGame,
	setMainBoardStateHistory,
	setMoveHistory,
	setCurrentMove,
	setPlayer,
}) {
	let gameStatus: string | undefined;

	if (result === "X") {
		gameStatus = "Player X wins!";
	} else if (result === "O") {
		gameStatus = "Player O wins!";
	} else if (result === "Tie") {
		gameStatus = "It's a tie!";
	}

	return (
		<Dialog open={result}>
			<DialogContent className="flex h-fit flex-col items-center justify-around gap-10">
				<DialogHeader className="flex items-center">
					<DialogTitle className="text-6xl italic">{gameStatus}</DialogTitle>
					<DialogDescription>Game Over</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex gap-8">
					<DialogClose asChild>
						<Button type="button" variant={"secondary"}>
							Go back to game
						</Button>
					</DialogClose>
					<Button
						type="reset"
						onClick={() => {
							resetGame(
								setMainBoardStateHistory,
								setMoveHistory,
								setCurrentMove,
								setPlayer,
							);
						}}
					>
						Start new game
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default GameOver;
