import { useState } from "react";
import Board from "./Board";
import { Button } from "./ui/button";

export default function Game() {
	const [moveHistory, setMoveHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const currentPlayer = currentMove % 2 === 0 ? "X" : "O";
	const currentSquares = moveHistory[currentMove];

	function handlePlay(nextSquares) {
		setMoveHistory([...moveHistory.slice(0, currentMove + 1), nextSquares]);
		setCurrentMove(currentMove + 1);
	}

	const moves = moveHistory.map((_, move) => {
		let moveDescription;
		if (move > 0) {
			moveDescription = `Go to move ${move}`;
		} else {
			moveDescription = "Go to game start";
		}
		return (
			<li key={move}>
				<Button className="m-1" onClick={() => setCurrentMove(move)}>
					{moveDescription}
				</Button>
			</li>
		);
	});

	return (
		<div className="flex h-screen flex-col place-content-center place-items-center">
			<div className="m-4">
				<Board
					playerTurn={currentPlayer}
					boardState={currentSquares}
					onPlay={handlePlay}
				/>
			</div>
			<div>
				<ol className="flex flex-wrap">{moves}</ol>
			</div>
		</div>
	);
}
