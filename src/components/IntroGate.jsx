import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IntroGate = ({ onComplete }) => {
  const [clicks, setClicks] = useState(0);
  const [destroyedBricks, setDestroyedBricks] = useState([]);
  const [showWhiteFlash, setShowWhiteFlash] = useState(false);

  // Generate colorful Lego brick grid - responsive for mobile
  // Mobile: 12 cols x 35 rows = 420 bricks (more square bricks)
  // Desktop: 30 cols x 28 rows = 840 bricks (more square bricks)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cols = isMobile ? 12 : 30;
  const rows = isMobile ? 35 : 28;
  const totalBricks = cols * rows;

  // Memoize bricks to prevent color changes on re-render
  const bricks = useMemo(
    () =>
      Array.from({ length: totalBricks }, (_, i) => ({
        id: i,
        col: i % cols,
        row: Math.floor(i / cols),
        // Random Lego colors - slightly dulled
        color: [
          "#A52818", // slightly dulled brick-red
          "#D4AF37", // slightly dulled brick-yellow
          "#1E5A8E", // slightly dulled brick-blue
          "#2A6B35", // slightly dulled brick-green
          "#D94F1E", // slightly dulled magma-orange
        ][Math.floor(Math.random() * 5)],
      })),
    [totalBricks, cols]
  );

  const handleClick = () => {
    if (clicks >= 9) {
      // 10th click - first complete the progress bar animation
      setClicks(10);

      // Wait for the car animation to complete (500ms), then show white flash
      setTimeout(() => {
        setShowWhiteFlash(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 500);
      return;
    }

    // Each click destroys 18-20% of remaining bricks
    const remainingBricks = bricks.filter(
      (b) => !destroyedBricks.includes(b.id)
    );
    const bricksToDestroy = Math.ceil(remainingBricks.length * 0.19);

    // Randomly select bricks to destroy
    const newDestroyedBricks = [];
    for (let i = 0; i < bricksToDestroy && remainingBricks.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * remainingBricks.length);
      newDestroyedBricks.push(remainingBricks[randomIndex].id);
      remainingBricks.splice(randomIndex, 1);
    }

    setDestroyedBricks([...destroyedBricks, ...newDestroyedBricks]);
    setClicks(clicks + 1);
  };

  // Add keyboard listener for spacebar
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault(); // Prevent page scroll
        handleClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [clicks, destroyedBricks]); // Dependencies needed for handleClick to work properly

  return (
    <>
      {/* Main Lego Wall */}
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-gray-800 via-gray-900 to-black overflow-hidden cursor-pointer"
        onClick={handleClick}
        animate={showWhiteFlash ? { opacity: 0 } : { opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Lego Brick Grid - Full Screen */}
        <div
          className="absolute inset-0 grid gap-1 p-2"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {bricks.map((brick) => {
            const isDestroyed = destroyedBricks.includes(brick.id);

            return (
              <AnimatePresence key={brick.id}>
                {!isDestroyed && (
                  <motion.div
                    className="rounded-sm shadow-lg relative"
                    style={{ backgroundColor: brick.color }}
                    initial={{ opacity: 1, scale: 1, rotateZ: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.3,
                      x: (Math.random() - 0.5) * 400,
                      y: Math.random() * 600 + 200,
                      rotateZ: Math.random() * 720 - 360,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeIn",
                    }}
                  >
                    {/* Lego studs on top */}
                    <div className="absolute inset-0 flex items-center justify-center gap-0.5">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* Center content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          {/* Dark backdrop for text visibility */}
          <div className="absolute inset-0 bg-gradient-radial from-black/70 via-black/40 to-transparent" />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center px-6 relative z-10"
          >
            <h1
              className="font-heading text-7xl md:text-9xl lg:text-[10rem] text-green-500 mb-6 leading-none"
              style={{
                textShadow:
                  "4px 4px 0 rgba(0, 0, 0, 0.8), -2px -2px 0 rgba(255, 255, 255, 0.3)",
                WebkitTextStroke: "3px black",
                paintOrder: "stroke fill",
              }}
            >
              BREAK THE WALL!
            </h1>
            <p
              className="font-body text-2xl md:text-4xl text-white mb-8 font-bold"
              style={{
                textShadow: "3px 3px 0 rgba(0, 0, 0, 0.8)",
                WebkitTextStroke: "1px black",
                paintOrder: "stroke fill",
              }}
            >
              Click to smash through
            </p>

            {/* Loading bar with car - centered and larger */}
            <div className="flex items-center justify-center w-full max-w-4xl mx-auto">
              {/* Start flag */}
              <div className="text-4xl md:text-5xl mr-4 md:mr-6">🏁</div>

              {/* Progress bar container */}
              <div className="relative flex-1 h-20 md:h-24 rounded-2xl border-4 border-green-500 overflow-hidden shadow-2xl bg-gray-800">
                {/* Road texture background - very visible */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${
                      import.meta.env.BASE_URL
                    }assets/road-texture.png)`,
                    backgroundSize: "auto 100%",
                    backgroundRepeat: "repeat-x",
                    backgroundPosition: "center",
                  }}
                />

                {/* Progress fill with green gradient - fades to transparent at right edge */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    width: `${clicks * 10}%`,
                    background:
                      clicks >= 10
                        ? "rgb(34, 197, 94)" // Solid green at 100%
                        : "linear-gradient(to right, rgb(34, 197, 94) calc(100% - 60px), transparent 100%)",
                    boxShadow:
                      "inset 0 2px 8px rgba(255,255,255,0.2), 0 0 20px rgba(34, 197, 94, 0.5)",
                  }}
                />

                {/* Car moving along the track - properly centered */}
                <motion.div
                  className="absolute w-20 md:w-24 h-16 md:h-20 z-10"
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  animate={{
                    left: `${clicks * 10}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div
                    className="relative w-full h-full"
                    style={{
                      transform:
                        clicks >= 10 ? "translateX(0%)" : "translateX(-50%)",
                    }}
                  >
                    <img
                      src={`${
                        import.meta.env.BASE_URL
                      }assets/intro_car_for_loading.png`}
                      alt="Loading car"
                      className="w-full h-full object-contain"
                      style={{
                        filter:
                          "drop-shadow(0 4px 12px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))",
                      }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Finish flag */}
              <div className="text-4xl md:text-5xl ml-4 md:ml-6">🏁</div>
            </div>

            {/* Click progress text */}
            <motion.p
              className="font-heading text-3xl md:text-4xl text-lime-400 mt-6 leading-none"
              style={{
                textShadow: "3px 3px 0 rgba(0, 0, 0, 0.8)",
                WebkitTextStroke: "2px black",
                paintOrder: "stroke fill",
              }}
            >
              {clicks}/10 clicks
            </motion.p>
          </motion.div>
        </div>

        {/* Click instruction */}
        <motion.p
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-lg md:text-xl font-bold z-20 text-center"
          style={{
            textShadow: "2px 2px 0 rgba(0,0,0,0.8)",
            WebkitTextStroke: "0.5px black",
            paintOrder: "stroke fill",
          }}
        >
          👆 Click or tap to break bricks
        </motion.p>
      </motion.div>

      {/* White Flash Screen */}
      <AnimatePresence>
        {showWhiteFlash && (
          <motion.div
            className="fixed inset-0 z-[60] bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default IntroGate;
