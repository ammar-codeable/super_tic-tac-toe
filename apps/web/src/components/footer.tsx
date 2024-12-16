import { motion } from "framer-motion";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      className="flex h-8 items-center justify-end px-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <a
        href="https://github.com/ammar-codeable/super_tic-tac-toe"
        target="_blank"
        className="text-md flex items-center gap-2 transition-transform hover:scale-105"
      >
        <Github className="size-4" />
        <span>View on GitHub</span>
      </a>
    </motion.footer>
  );
}
