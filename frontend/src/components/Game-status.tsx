function GameStatus({ currentPlayer, result }) {
	let gameStatus: string = `Player ${currentPlayer}'s turn`;

	if (result === "X") {
		gameStatus = "Player X wins!";
	} else if (result === "O") {
		gameStatus = "Player O wins!";
	} else if (result === "Tie") {
		gameStatus = "It's a tie!";
	} else {
		gameStatus = `Player ${currentPlayer}'s turn`;
	}

	return <div className="text-5xl italic">{gameStatus}</div>;
}

export default GameStatus;
