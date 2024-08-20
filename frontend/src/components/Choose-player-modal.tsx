import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

function ChoosePlayer({
	socket,
	setPlayer,
}: {
	socket: WebSocket | null;
	setPlayer: (player: string) => void;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Choose Player</Button>
			</DialogTrigger>
			<DialogContent className="justify-around rounded-xl border px-16 py-8 sm:max-w-[450px]">
				<DialogHeader>
					<DialogTitle className="my-3 text-3xl">Choose Player</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					The opponent will be assigned the other player.
				</DialogDescription>
				<DialogFooter className="flex gap-x-16">
					<DialogClose asChild>
						<Button
							onClick={() => {
								setPlayer("X");
								socket!.send(JSON.stringify({ player: "X" }));
							}}
						>
							Player X
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							onClick={() => {
								setPlayer("O");
								socket!.send(JSON.stringify({ player: "O" }));
							}}
						>
							Player O
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default