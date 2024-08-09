import { useState } from "react";
import Board from "./Board";

export default function Game() {
	const [moveHistory, setMoveHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = moveHistory[currentMove];

	function handlePlay(nextSquares) {
		const nextHistory = [...moveHistory.slice(0, currentMove + 1), nextSquares];
		setMoveHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	const moves = moveHistory.map((_, move) => {
		let description;
		if (move > 0) {
			description = "Go to move #" + move;
		} else {
			description = "Go to game start";
		}
		return (
			<li key={move}>
				<button onClick={() => setCurrentMove(move)}>{description}</button>
			</li>
		);
	});
	return (
		<div>
			<div>
				<Board
					xIsNext={xIsNext}
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
