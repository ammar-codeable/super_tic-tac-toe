import { Button } from "./ui/button";

function Square({ value, onSquareClick }) {
	return (
		<Button variant="outline" className="size-16 text-5xl" onClick={onSquareClick}>
			{value}
		</Button>
	);
}

export default Square;
