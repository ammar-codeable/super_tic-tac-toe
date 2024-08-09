import Game from "../components/Game";

function App() {
	return (
		<>
			<div id="game-container">
				<h1>TicTacToe</h1>
				<Game />
				<button id="restart-button">Restart Game</button>
			</div>
		</>
	);
}

export default App;
