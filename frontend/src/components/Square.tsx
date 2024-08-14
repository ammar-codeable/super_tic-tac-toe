import { Button } from "./ui/button";

function Square({ value, onSquareClick, cellId, boardId, activeSubBoard }) {
	return (
			<Button
				disabled={!activeSubBoard && !value}
				variant="outline"
				className="size-16 text-5xl"
				onClick={() => {
					onSquareClick(cellId, boardId);
				}}
			>
				{value}
			</Button>
	);
}

export default Square;
