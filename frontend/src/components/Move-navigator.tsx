import { Button } from "./ui/button";

function MoveNavigator({
	moveHistory,
	setMoveHistory,
	currentMove,
	setCurrentMove,
}) {
	return (
		<div>
			<Button
				className="m-1"
				onClick={() => {
					setCurrentMove(0);
				}}
			>
				Game Start
			</Button>
			<Button
				className="m-1"
				onClick={() => {
					currentMove > 0 ? setCurrentMove(currentMove - 1) : null;
				}}
			>
				Previous move
			</Button>
			<Button
				className="m-1"
				onClick={() => {
					setCurrentMove(0);
					setMoveHistory([Array(9).fill(Array(9).fill(null))]);
				}}
			>
				Restart Game
			</Button>
			<Button
				className="m-1"
				onClick={() => {
					currentMove < moveHistory.length - 1
						? setCurrentMove(currentMove + 1)
						: null;
				}}
			>
				Next move
			</Button>
			<Button
				className="m-1"
				onClick={() => {
					setCurrentMove(moveHistory.length - 1);
				}}
			>
				Game End
			</Button>
		</div>
	);
}

export default MoveNavigator;
