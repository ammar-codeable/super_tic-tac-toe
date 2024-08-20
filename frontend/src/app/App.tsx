import Game from "@/components/Game";
import { ModeToggle } from "@/components/Mode-toggle";
import { motion } from "framer-motion";

function App() {
	return (
		<>
			<motion.header
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 1 }}
				className="mb-3 flex items-center justify-between border-b p-2"
			>
				<div></div>
				<h1 className="text-6xl">Super TicTacToe</h1>
				<ModeToggle />
			</motion.header>
			<main>
				<Game />
			</main>
		</>
	);
}

export default App;
