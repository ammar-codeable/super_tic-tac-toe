import { useState } from "react";
import MainBoard from "./Main-Board";
import MoveNavigation from "./Move-Navigation";

export default function Game() {
	const [boardState, setBoardState] = useState(
		Array(9).fill(Array(9).fill(null)),
	);
	const [currentMove, setCurrentMove] = useState(0);
	const currentPlayer = currentMove % 2 === 0 ? "X" : "O";

	function handlePlay(nextSquares, boardId) {
		setBoardState((boardState) => {
			boardState[boardId] = nextSquares;
			return boardState;
		});
		setCurrentMove((currentMove) => currentMove + 1);
	}

	return (
		<div className="flex h-screen flex-col place-content-center place-items-center">
			<div className="m-4">
				<MainBoard
					playerTurn={currentPlayer}
					mainBoardState={boardState}
					onPlay={handlePlay}
				/>
			</div>
			<MoveNavigation />
		</div>
	);
}
