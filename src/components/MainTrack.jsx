import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GearCheckSection from "./GearCheckSection";
import MapSection from "./MapSection";
import RsvpForm from "./RsvpForm";
import WaiverSection from "./WaiverSection";
import EndOfTrack from "./EndOfTrack";

const MainTrack = () => {
  const trackRef = useRef(null);
  const [showCar, setShowCar] = useState(false);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to vertical position for the car
  // Car starts at top: 20vh, so we transform from 0 to 60vh to keep it visible
  const carY = useTransform(scrollYProgress, [0, 1], ["0vh", "60vh"]);

  // Show car after hero animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCar(true);
    }, 1500); // Wait for hero animation (1s + 0.5s buffer)

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero Section - Standalone */}
      <motion.section
        className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Collision Wall Background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              import.meta.env.BASE_URL
            }assets/wall-collision.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient Overlay for Extra Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-center relative z-10 max-w-5xl"
        >
          {/* Main Title */}
          <motion.h1
            className="font-heading text-8xl md:text-[12rem] lg:text-[14rem] text-green-500 mb-2 leading-none"
            style={{
              textShadow:
                "0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.4), 4px 4px 0 rgba(0, 0, 0, 0.8), -2px -2px 0 rgba(255, 255, 255, 0.3)",
              WebkitTextStroke: "3px black",
              paintOrder: "stroke fill",
            }}
            animate={{
              textShadow: [
                "0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.4), 4px 4px 0 rgba(0, 0, 0, 0.8), -2px -2px 0 rgba(255, 255, 255, 0.3)",
                "0 0 50px rgba(34, 197, 94, 1), 0 0 80px rgba(34, 197, 94, 0.6), 4px 4px 0 rgba(0, 0, 0, 0.8), -2px -2px 0 rgba(255, 255, 255, 0.3)",
                "0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.4), 4px 4px 0 rgba(0, 0, 0, 0.8), -2px -2px 0 rgba(255, 255, 255, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ANDREW'S
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="font-heading text-7xl md:text-9xl lg:text-[10rem] text-lime-400 leading-none"
            style={{
              textShadow:
                "0 0 20px rgba(163, 230, 53, 0.8), 0 0 40px rgba(163, 230, 53, 0.4), 3px 3px 0 rgba(0, 0, 0, 0.8)",
              WebkitTextStroke: "2px black",
              paintOrder: "stroke fill",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            7TH BIRTHDAY
          </motion.h2>

          {/* Party Date Info */}
          <motion.div
            className="mt-12 text-white text-xl md:text-2xl font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              🏁{" "}
              <span className="font-bold">Tuesday, January 20 at 4:30 PM</span>{" "}
              🏁
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm font-body mb-2">Scroll to start</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </motion.div>
      </motion.section>

      {/* Track Section */}
      <div
        ref={trackRef}
        className="relative min-h-[400vh]"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/lego-bg.png)`,
          backgroundRepeat: "repeat",
          backgroundSize: "400px auto",
        }}
      >
        {/* Vertical Road - sits above lego bg but below checkpoints */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-44 md:w-56 -translate-x-1/2 pointer-events-none"
          style={{
            backgroundImage: `url(${
              import.meta.env.BASE_URL
            }assets/vertical-road-texture.png)`,
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% auto",
            backgroundPosition: "center",
            zIndex: 1,
          }}
        >
          {/* Road edges with dashed lines */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400/50 via-yellow-400/30 to-yellow-400/50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #FFD700 0px, #FFD700 20px, transparent 20px, transparent 40px)",
              backgroundSize: "2px 40px",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400/50 via-yellow-400/30 to-yellow-400/50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #FFD700 0px, #FFD700 20px, transparent 20px, transparent 40px)",
              backgroundSize: "2px 40px",
            }}
          />
        </div>

        {/* Scrolling Car - behind checkpoints, centered on road */}
        {showCar && (
          <motion.div
            className="fixed pointer-events-none flex items-center justify-center"
            style={{
              left: "50%",
              top: "20vh",
              y: carY,
              x: "-50%",
              zIndex: 5,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={`${import.meta.env.BASE_URL}assets/car_for_track.png`}
              alt="Racing Car"
              className="w-32 md:w-40 h-auto block"
              style={{
                filter:
                  "drop-shadow(0 4px 12px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))",
              }}
              animate={{
                filter: [
                  "drop-shadow(0 4px 12px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))",
                  "drop-shadow(0 4px 12px rgba(0,0,0,0.9)) drop-shadow(0 0 15px rgba(34, 197, 94, 0.9))",
                  "drop-shadow(0 4px 12px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}

        {/* Content sections - above road and car */}
        <div className="relative z-10">
          {/* Empty space to showcase car driving effect */}
          <div className="min-h-screen" />

          {/* Checkpoint 1: Gear Check */}
          <motion.div
            className="min-h-screen flex items-center justify-center py-20"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <GearCheckSection />
          </motion.div>

          {/* Checkpoint 2: Map */}
          <motion.div
            className="min-h-screen flex items-center justify-center py-20"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <MapSection />
          </motion.div>

          {/* Checkpoint 3: RSVP */}
          <motion.div
            className="min-h-screen flex items-center justify-center py-20"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <RsvpForm />
          </motion.div>

          {/* Checkpoint 4: Waiver */}
          <motion.div
            className="min-h-screen flex items-center justify-center py-20"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <WaiverSection />
          </motion.div>

          {/* End of Track */}
          <motion.div
            className="flex items-center justify-center py-12"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <EndOfTrack />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default MainTrack;
