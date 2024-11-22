const GAME_TIPS = [
	// Basic Rules
	"Win three squares in a row to win a local board!",
	"Win three local boards in a row to win the game!",
	"You can only play in the board corresponding to your opponent's last move",
	"Plan ahead! Think about which board your move will send your opponent to",
	"Sending your opponent to a completed board gives them a free move anywhere",
	"Try to win boards that form strategic patterns on the main grid",
	"Sometimes letting your opponent win a local board can be strategically advantageous",
	"Control the center board when possible - it provides the most strategic options",
	"Corner boards are more valuable than edge boards for winning diagonally",
	"Watch out for forced moves that send your opponent to favorable positions",
	"Create threats in multiple boards to force your opponent's moves",
	"Pay attention to which board you'll send your opponent to",
	"Look for moves that create multiple winning opportunities",
	"Think two moves ahead - your move and where it sends your opponent",
	"Sometimes the obvious move isn't the best move",
	"Force your opponent to play in boards where they have limited options",
];

function getRandomTip() {
	return GAME_TIPS[Math.floor(Math.random() * GAME_TIPS.length)];
}

export { GAME_TIPS, getRandomTip };
