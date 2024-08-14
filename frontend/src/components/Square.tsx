import { motion } from "framer-motion";
import { Button } from "./ui/button";

function Square({ value, onSquareClick }) {
	return (
		<motion.div whileTap={{ scale: 1.2 }}>
			<Button
				variant="outline"
				className="size-16 text-5xl"
				onClick={onSquareClick}
			>
				{value}
			</Button>
		</motion.div>
	);
}

export default Square;
