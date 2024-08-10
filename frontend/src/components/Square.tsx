function Square({ value, onSquareClick }) {
	return (
		<button className="border border black" onClick={onSquareClick}>
			{value}
		</button>
	);
}

export default Square;
