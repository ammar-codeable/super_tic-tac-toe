import { useSocket } from "@/hooks/useSocket";
import calculateResult from "@/utils/calculate-result";
import getActiveBoards from "@/utils/get-active-boards";
import { useState } from "react";
import GameStatus from "./Game-status";
import MainBoard from "./Main-board";
import MoveNavigator from "./Move-navigator";

function Game() {
	const [moveHistory, setMoveHistory] = useState<number[][]>([[-1, -1]]);
	const [currentMove, setCurrentMove] = useState(0);
	const currentPlayerTurn: string = currentMove % 2 === 0 ? "X" : "O";

	const [mainBoardStateHistory, setMainBoardStateHistory] = useState<
		string[][][]
	>([Array(9).fill(Array(9).fill(null))]);
	const reducedMainBoardState = mainBoardStateHistory[currentMove].map(
		(subBoard) => {
			return calculateResult(subBoard);
		},
	);

	// const socket = useSocket(handlePlay);

	function handlePlay(
		boardId: number,
		cellId: number,
		yourMove: boolean,
	) {
		setMoveHistory((moveHistory) => [
			...structuredClone(moveHistory).slice(0, currentMove + 1),
			[boardId, cellId],
		]);
		setCurrentMove((currentMove) => currentMove + 1);
		setMainBoardStateHistory((mainBoardStateHistory) => {
			const newMainBoardState: string[][] = structuredClone(
				mainBoardStateHistory[currentMove],
			);
			newMainBoardState[boardId][cellId] = currentPlayerTurn;
			return [
				...structuredClone(mainBoardStateHistory).slice(0, currentMove + 1),
				newMainBoardState,
			];
		});

		// if (socket && yourMove) {
		// 	socket.send(JSON.stringify({ boardId, cellId }));
		// }
	}

	let result: string | null = calculateResult(reducedMainBoardState);

	return (
		<div className="col-start-2 flex flex-col items-center justify-center gap-4">
			<MainBoard
				mainBoardState={mainBoardStateHistory[currentMove]}
				handlePlay={handlePlay}
				nextActiveBoard={getActiveBoards(result, moveHistory, currentMove)}	
				currentPlayerTurn={currentPlayerTurn}
			/>
			<MoveNavigator
				moveHistory={moveHistory}
				setMoveHistory={setMoveHistory}
				setMainBoardStateHistory={setMainBoardStateHistory}
				currentMove={currentMove}
				setCurrentMove={setCurrentMove}
			/>
			<GameStatus currentPlayer={currentPlayerTurn} result={result} />
		</div>
	);
}

export default Game;
