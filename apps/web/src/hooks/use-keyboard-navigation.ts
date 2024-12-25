import { useEffect } from "react";

export function useKeyboardNavigation({
  currentIndex,
  gridSize,
  onNavigate,
  onSelect,
}: {
  currentIndex: number;
  gridSize: { rows: number; cols: number };
  onNavigate: (newIndex: number) => void;
  onSelect: () => void;
}) {
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onSelect();
        return;
      }

      let newIndex = currentIndex;
      const { rows, cols } = gridSize;

      switch (e.key) {
        case "ArrowLeft":
          newIndex =
            currentIndex % cols === 0 ? currentIndex : currentIndex - 1;
          break;
        case "ArrowRight":
          newIndex =
            (currentIndex + 1) % cols === 0 ? currentIndex : currentIndex + 1;
          break;
        case "ArrowUp":
          newIndex = currentIndex < cols ? currentIndex : currentIndex - cols;
          break;
        case "ArrowDown":
          newIndex =
            currentIndex >= (rows - 1) * cols
              ? currentIndex
              : currentIndex + cols;
          break;
      }

      onNavigate(newIndex);
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [currentIndex, gridSize, onNavigate, onSelect]);
}
