import calculateResult from "@/utils/calculateResult";
import { useState } from "react";
import MainBoard from "./Main-Board";
import MoveNavigator from "./Move-Navigation";

export default function Game() {
	const [moveHistory, setMoveHistory] = useState([
		Array(9).fill(Array(9).fill(null)),
	]);
	const [currentMove, setCurrentMove] = useState(0);
	const currentPlayer: string = currentMove % 2 === 0 ? "X" : "O";

	const mainBoardState = moveHistory[currentMove];
	let gameStatus: string = `Player ${currentPlayer}'s turn`;

	function handlePlay(nextSquares, boardId: number) {
		mainBoardState[boardId] = nextSquares;
		const newMoveHistory = JSON.parse(
			JSON.stringify([
				...moveHistory.slice(0, currentMove + 1),
				mainBoardState,
			]),
		);
		setMoveHistory(newMoveHistory);
		setCurrentMove(newMoveHistory.length - 1);
	}

	const reducedMainBoardState = mainBoardState.map((subBoard) => {
		return calculateResult(subBoard);
	});

	let result = calculateResult(reducedMainBoardState);
	if (result === "X") {
		gameStatus = "Player X wins!";
	} else if (result === "O") {
		gameStatus = "Player O wins!";
	} else if (result === "Tie") {
		gameStatus = "It's a tie!";
	} else {
		gameStatus = `Player ${currentPlayer}'s turn`;
	}

	return (
		<div className="flex flex-col place-content-center place-items-center gap-4">
			<MainBoard
				currentPlayer={currentPlayer}
				mainBoardState={mainBoardState}
				onPlay={handlePlay}
				reducedMainBoardState={reducedMainBoardState}
				result={result}
			/>
			{/* <MoveNavigator
				moveHistory={moveHistory}
				setMoveHistory={setMoveHistory}
				currentMove={currentMove}
				setCurrentMove={setCurrentMove}
			/> */}
			<div className="text-5xl italic">{gameStatus}</div>
		</div>
	);
}
