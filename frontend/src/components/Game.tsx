import { useSocket } from "@/hooks/use-socket";
import calculateResult from "@/utils/calculate-result";
import getActiveBoards from "@/utils/get-active-boards";
import { resetGame } from "@/utils/reset-game";
import { motion } from "framer-motion";
import { useState } from "react";
import GameOver from "./Game-over-modal";
import MainBoard from "./Main-board";
import MoveNavigator from "./Move-navigator";

function Game() {
	const [online, setOnline] = useState<boolean | null>(false);
	const socket = online ? useSocket(handlePlay) : null;

	const [moveHistory, setMoveHistory] = useState<number[][]>([[-1, -1]]);

	const [currentMove, setCurrentMove] = useState(0);
	const currentPlayerTurn: string = currentMove % 2 === 0 ? "X" : "O";

	const [player, setPlayer] = useState<string | null>(null);

	const [mainBoardStateHistory, setMainBoardStateHistory] = useState<
		string[][][]
	>([Array(9).fill(Array(9).fill(null))]);
	const mainBoardState = mainBoardStateHistory[currentMove];

	const reducedMainBoardState: (string | null)[] = mainBoardState.map(
		(subBoard) => {
			return calculateResult(subBoard);
		},
	);

	function handlePlay(
		boardId: number,
		cellId: number,
		yourMove: boolean = true,
	) {
		setMainBoardStateHistory((mainBoardStateHistory) => {
			const newMainBoardState: string[][] = JSON.parse(
				JSON.stringify(mainBoardStateHistory[currentMove]),
			);
			newMainBoardState[boardId][cellId] = currentPlayerTurn;

			const newMainBoardStateHistory: string[][][] = [
				...JSON.parse(JSON.stringify(mainBoardStateHistory)).slice(
					0,
					currentMove + 1,
				),
				JSON.parse(JSON.stringify(newMainBoardState)),
			];

			return newMainBoardStateHistory;
		});
		setCurrentMove((currentMove) => currentMove + 1);
		setMoveHistory((moveHistory) => [
			...JSON.parse(JSON.stringify(moveHistory)).slice(0, currentMove + 1),
			[boardId, cellId],
		]);

		if (socket && online && yourMove) {
			socket.send(JSON.stringify({ boardId, cellId }));
		}
	}
	const result: string | null = calculateResult(reducedMainBoardState);

	return (
		<div className="col-start-2 flex flex-col items-center justify-center gap-4">
			{/* <ChooseGameMode
			setOnline={setOnline}
				setMainBoardStateHistory={setMainBoardStateHistory}
				setCurrentMove={setCurrentMove}
				setMoveHistory={setMoveHistory}
				setPlayer={setPlayer}
			/>
			<ChoosePlayer socket={socket} setPlayer={setPlayer} /> */}
			<MainBoard
				mainBoardState={mainBoardState}
				handlePlay={handlePlay}
				nextActiveBoard={getActiveBoards(
					result,
					reducedMainBoardState,
					moveHistory,
					currentMove,
					player,
					currentPlayerTurn,
					online,
				)}
				currentPlayerTurn={currentPlayerTurn}
			/>
			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 1 }}
			>
				<MoveNavigator
					moveHistory={moveHistory}
					setMoveHistory={setMoveHistory}
					setMainBoardStateHistory={setMainBoardStateHistory}
					currentMove={currentMove}
					setCurrentMove={setCurrentMove}
					resetGame={resetGame}
					setPlayer={setPlayer}
				/>
			</motion.div>
			<GameOver
				result={result}
				resetGame={resetGame}
				setMainBoardStateHistory={setMainBoardStateHistory}
				setMoveHistory={setCurrentMove}
				setCurrentMove={setCurrentMove}
				setPlayer={setPlayer}
			/>
		</div>
	);
}

export default Game;
