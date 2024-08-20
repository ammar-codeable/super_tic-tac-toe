import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { resetGame } from "@/utils/reset-game";
import { Button } from "./ui/button";

function ChooseGameMode({
	setOnline,
	setCurrentMove,
	setMainBoardStateHistory,
	setMoveHistory,
	setPlayer,
}: {
	setOnline: (online: boolean) => void;
	setCurrentMove: (currentMove: number) => void;
	setMainBoardStateHistory: (mainBoardStateHistory: string[][][]) => void;
	setMoveHistory: (moveHistory: number[][]) => void;
	setPlayer: (player: string | null) => void;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Choose Game Mode</Button>
			</DialogTrigger>
			<DialogContent className="justify-around rounded-xl border px-16 py-8 sm:max-w-[500px]">
				<DialogHeader className="flex items-center justify-center">
					<DialogTitle className="my-3 text-4xl">Choose Game Mode</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					<div className="flex gap-x-16">
						<DialogClose asChild>
							<Button
								onClick={() => {
									setOnline(true);
									resetGame(
										setMainBoardStateHistory,
										setMoveHistory,
										setCurrentMove,
										setPlayer,
									);
								}}
							>
								Offline Mode
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button
								onClick={() => {
									setOnline(false);
									resetGame(
										setMainBoardStateHistory,
										setMoveHistory,
										setCurrentMove,
										setPlayer,
									);
								}}
							>
								Online Mode
							</Button>
						</DialogClose>
					</div>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
}

export default ChooseGameMode;
