import { useState } from "react";
import Board from "./Board";

export default function Game() {
	const [moveHistory, setMoveHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const currentPlayer = currentMove % 2 === 0 ? "X" : "O";
	const currentSquares = moveHistory[currentMove];

	function handlePlay(nextSquares) {
		setMoveHistory([...moveHistory, nextSquares]);
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
				<button onClick={() => setCurrentMove(move)}>{moveDescription}</button>
			</li>
		);
	});

	return (
		<div>
			<div>
				<Board
					playerTurn={currentPlayer}
					boardState={currentSquares}
					onPlay={handlePlay}
				/>
			</div>
			<div>
				<ol>{moves}</ol>
			</div>
		</div>
	);
}
