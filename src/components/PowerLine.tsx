import { motion } from "framer-motion";

const PowerLine = () => {
  // Wavy SVG path that flows organically down the page
  const wavyPath =
    "M 50 0 C 30 80, 70 160, 45 240 S 75 400, 40 500 S 65 620, 50 720 S 30 850, 60 960 S 40 1080, 55 1200 S 75 1350, 45 1500 S 25 1620, 55 1750 S 70 1880, 42 2000 S 30 2150, 58 2300 S 72 2450, 48 2600 S 28 2750, 55 2900 S 68 3050, 45 3200 S 35 3350, 52 3500 S 70 3650, 48 3800 S 30 3950, 50 4100 S 65 4250, 45 4400 S 35 4550, 55 4700 S 72 4850, 50 5000";

  // Node positions along the path (percentage of total length)
  const nodePositions = [0.08, 0.18, 0.32, 0.45, 0.58, 0.72, 0.85, 0.94];

  return (
    <div className="hidden lg:block fixed right-16 xl:right-24 top-0 w-[100px] h-full z-0 pointer-events-none">
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 100 5000"
        preserveAspectRatio="none"
        style={{ height: "100%" }}
        fill="none"
      >
        {/* Base wavy line */}
        <path
          d={wavyPath}
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeOpacity="0.4"
          fill="none"
        />

        {/* Animated glow traveling along the path */}
        <motion.circle
          r="4"
          fill="hsl(var(--primary))"
          filter="url(#glow)"
        >
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path={wavyPath}
          />
        </motion.circle>

        {/* Second trailing glow for depth */}
        <motion.circle
          r="2.5"
          fill="hsl(var(--primary))"
          opacity="0.5"
          filter="url(#glow)"
        >
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path={wavyPath}
            begin="0.8s"
          />
        </motion.circle>

        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient along the line for subtle color */}
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="10%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            <stop offset="90%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Faint colored stroke on the wavy line */}
        <path
          d={wavyPath}
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Pulse nodes at key points */}
      {nodePositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{
            top: `${pos * 100}%`,
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            opacity: [0.2, 0.9, 0.2],
            scale: [0.7, 1.5, 0.7],
            boxShadow: [
              "0 0 0px hsl(var(--primary) / 0)",
              "0 0 14px hsl(var(--primary) / 0.5)",
              "0 0 0px hsl(var(--primary) / 0)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.7,
          }}
        />
      ))}
    </div>
  );
};

export default PowerLine;
