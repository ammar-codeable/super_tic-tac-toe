import { Button } from "./ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "./ui/pagination";

function MoveNavigator({
	moveHistory,
	currentMove,
	setCurrentMove,
	setMainBoardStateHistory,
	setMoveHistory,
	resetGame,
	setPlayer,
}) {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => {
							setCurrentMove(0);
						}}
					/>
				</PaginationItem>
				<PaginationEllipsis />
				<PaginationItem>
					<PaginationPrevious
						className="m-1"
						value="Previous move"
						onClick={() => {
							currentMove > 0 ? setCurrentMove(currentMove - 1) : null;
						}}
					></PaginationPrevious>
				</PaginationItem>
				<PaginationItem>
					<Button
						className="m-1"
						onClick={() => {
							resetGame(setMainBoardStateHistory, setMoveHistory, setCurrentMove, setPlayer);
						}}
					>
						Restart Game
					</Button>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						className="m-1"
						value="Next move"
						onClick={() => {
							currentMove !== moveHistory.length - 1
								? setCurrentMove(currentMove + 1)
								: null;
						}}
					>
						Next move
					</PaginationNext>
				</PaginationItem>
				<PaginationEllipsis />
				<PaginationItem>
					<PaginationNext
						className="m-1"
						onClick={() => {
							currentMove !== moveHistory.length - 1
								? setCurrentMove(moveHistory.length - 1)
								: null;
						}}
					></PaginationNext>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

export default MoveNavigator;
