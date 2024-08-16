import calculateResult from "@/utils/calculate-result";
import { useEffect, useRef, useState } from "react";
import GameStatus from "./Game-status";
import MainBoard from "./Main-board";
import MoveNavigator from "./Move-navigator";

function Game() {
	const [currentMove, setCurrentMove] = useState(0);
	const currentPlayerTurn: string = currentMove % 2 === 0 ? "X" : "O";

	const [moveHistory, setMoveHistory] = useState([
		Array(9).fill(Array(9).fill(null)),
	]);
	const mainBoardState = moveHistory[currentMove];
	const reducedMainBoardState = mainBoardState.map((subBoard) => {
		return calculateResult(subBoard);
	});

	let result = calculateResult(reducedMainBoardState);

	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		const socket = new WebSocket("ws://localhost:8080");

		socket.onopen = () => {
			console.log("Connection Established with server");
			setSocket(socket);
		};

		socket.onmessage = (message) => {
			const { nextSquares, boardId, cellId } = JSON.parse(message.data);
			console.log("Received message from server", nextSquares, boardId, cellId);	

			handlePlay(nextSquares, boardId, cellId, true);
		};

		return () => {
			socket.close();
		};
	}, []);

	let nextActiveBoard = useRef(-1);
	if (currentMove === 0) {
		nextActiveBoard.current = -1;
	}
	if (result) {
		nextActiveBoard.current = -2;
	}
	function handlePlay(nextSquares, boardId: number, cellId: number, serverData: boolean = false) {
		// TODO: Fix move history
		mainBoardState[boardId] = structuredClone(nextSquares);
		setCurrentMove((currentMove) => currentMove + 1);
		setMoveHistory((moveHistory) => {
			const newMoveHistory = structuredClone([
				...structuredClone(moveHistory).slice(0, currentMove + 1),
				structuredClone(mainBoardState),
			]);
			return newMoveHistory;
		});
		
		console.log("Move History", moveHistory);
		console.log("Current Move", currentMove);

		if (socket && !serverData) {
			socket.send(JSON.stringify({ nextSquares, boardId, cellId }));
		}
		
		nextActiveBoard.current = cellId;
		if (
			reducedMainBoardState[cellId] === "X" ||
			reducedMainBoardState[cellId] === "O" ||
			reducedMainBoardState[cellId] === "Tie"
		) {
			nextActiveBoard.current = -1;
		}
	}

	return (
		<div className="col-start-2 flex flex-col items-center justify-center gap-4">
			<MainBoard
				currentPlayerTurn={currentPlayerTurn}
				mainBoardState={mainBoardState}
				onPlay={handlePlay}
				nextActiveBoard={nextActiveBoard.current}
			/>
			<MoveNavigator
				moveHistory={moveHistory}
				setMoveHistory={setMoveHistory}
				currentMove={currentMove}
				setCurrentMove={setCurrentMove}
			/>
			<GameStatus currentPlayer={currentPlayerTurn} result={result} />
		</div>
	);
}

export default Game;
