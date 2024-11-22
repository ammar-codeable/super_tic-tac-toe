import { motion } from "framer-motion";

const pathVariants = {
  initial: { pathLength: 0 },
  animate: { 
    pathLength: 1, 
    transition: { 
      duration: 0.95,
      ease: "linear",
    } 
  }
};

export function GridLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full stroke-border"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Vertical lines */}
      <motion.path
        d="M 33.34 0 L 33.34 100"
        strokeWidth="0.6"
        fill="none"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M 66.66 0 L 66.66 100"
        strokeWidth="0.6"
        fill="none"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
      {/* Horizontal lines */}
      <motion.path
        d="M 0 33.34 L 100 33.34"
        strokeWidth="0.6"
        fill="none"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M 0 66.66 L 100 66.66"
        strokeWidth="0.6"
        fill="none"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
    </svg>
  );
}