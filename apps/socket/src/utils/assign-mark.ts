import { Mark, Player } from "../types/game-types";

export function assignMark(
	currentPlayer: Player,
	opponent: Player,
	requestedMark: Mark
) {
	if (!opponent.mark) {
		currentPlayer.mark = requestedMark;
		return;
	}

	if (opponent.mark === requestedMark) {
		currentPlayer.mark = Math.random() > 0.5 ? "X" : "O";
		opponent.mark = currentPlayer.mark === "X" ? "O" : "X";
		return;
	}

	if (opponent.mark !== requestedMark) {
		currentPlayer.mark = requestedMark;
		opponent.mark = currentPlayer.mark === "X" ? "O" : "X";
	}
}
