import { motion } from "framer-motion";

function Loader({ message }: { message?: string }) {
  const transition = {
    duration: 6,
    repeat: Infinity,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <svg
        className="mx-auto h-auto w-full max-w-[600px] md:w-[800px]"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -9"
              result="gooey"
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
        </defs>
        <g filter="url(#gooey)">
          <motion.g
            animate={{
              rotate: [0, 0, 0, 180, 180, 360],
            }}
            transition={{
              ...transition,
              times: [0, 0.17, 0.33, 0.5, 0.83, 1],
            }}
          >
            <motion.path
              d="M309,317 L288,317 C285.238576,317 283,314.761424 283,312 L283,288 C283,285.238576 285.238576,283 288,283 L309,283 C311,283 312.5,282.5 313.5,281.5 C314.5,280.5 315,279 315,277 L315,256 C315,253.238576 317.238576,251 320,251 L344,251 C346.761424,251 349,253.238576 349,256 L349,277 C349,279 349.5,280.5 350.5,281.5 C351.5,282.5 353,283 355,283 L376,283 C378.761424,283 381,285.238576 381,288 L381,312 C381,314.761424 378.761424,317 376,317 L355,317 C353,317 351.5,317.5 350.5,318.5 C349.5,319.5 349,321 349,323 L349,344 C349,346.761424 346.761424,349 344,349 L320,349 C317.238576,349 315,346.761424 315,344 L315,323 C315,321 314.5,319.5 313.5,318.5 C312.5,317.5 311,317 309,317 Z"
              className="fill-accent"
              animate={{
                rotate: [45, 90, 90, 135, 180, 180],
                x: [0, 20, 20, 0, 20, 0],
              }}
              transition={transition}
              style={{ transformOrigin: "center" }}
            />
            <motion.path
              d="M468,349 C440.938047,349 419,327.061953 419,300 C419,272.938047 440.938047,251 468,251 C495.061953,251 517,272.938047 517,300 C517,327.061953 495.061953,349 468,349 Z M468,320 C479.045695,320 488,311.045695 488,300 C488,288.954305 479.045695,280 468,280 C456.954305,280 448,288.954305 448,300 C448,311.045695 456.954305,320 468,320 Z"
              className="fill-accent"
              animate={{
                x: [0, -20, -20, 0, -20, 0],
              }}
              transition={transition}
            />
          </motion.g>
        </g>
      </svg>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-medium text-muted-foreground md:text-2xl"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

export default Loader;
