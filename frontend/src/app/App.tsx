import Game from "@/components/Game";
import { ModeToggle } from "@/components/Mode-toggle";
import { motion } from "framer-motion";

function App() {
	return (
		<div>
			<header className="flex items-center justify-between border-b p-2">
				<div></div>
				<motion.h1
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.3 }}
					className="text-6xl font-bold"
				>
					TicTacToe
				</motion.h1>
				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					<ModeToggle />
				</motion.div>
			</header>
			<main>
				<Game />
			</main>
		</div>
	);
}

export default App;
