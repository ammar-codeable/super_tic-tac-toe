
export function TicTacToeBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 opacity-[0.06]"
      style={{
        background: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
        backgroundSize: "33.33% 33.33%",
        animation: "moveBg 60s linear infinite",
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-6xl font-bold opacity-100"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            "--rotation": `${Math.random() * 360}deg`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `float ${5 + Math.random() * 5}s infinite alternate ease-in-out`,
          }}
        >
          {Math.random() > 0.5 ? "X" : "O"}
        </div>
      ))}
    </div>
  );
}