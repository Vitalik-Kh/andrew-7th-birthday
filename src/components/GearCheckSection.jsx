import { motion } from "framer-motion";
import { GEAR_CHECKLIST } from "../constants/config";

const GearCheckSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full md:w-[672px] mx-auto px-6"
    >
      <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-4 border-brick-yellow shadow-2xl">
        {/* Icon - Above the title */}
        <div className="flex justify-center mb-6">
          <img
            src={`${import.meta.env.BASE_URL}assets/checkpoint_pit_crew.png`}
            alt="Gear Check"
            className="drop-shadow-2xl"
            style={{
              objectFit: "contain",
              width: "200px",
              height: "auto",
            }}
          />
        </div>

        {/* Title */}
        <h2
          className="font-heading text-5xl md:text-6xl text-center text-green-500 mb-4 leading-none"
          style={{
            textShadow:
              "4px 4px 0 rgba(0, 0, 0, 0.8), -2px -2px 0 rgba(255, 255, 255, 0.3)",
            WebkitTextStroke: "2px black",
            paintOrder: "stroke fill",
          }}
        >
          CHECKPOINT 1
        </h2>
        <h3
          className="font-heading text-3xl md:text-4xl text-center text-lime-400 mb-8 leading-none"
          style={{
            textShadow: "3px 3px 0 rgba(0, 0, 0, 0.8)",
            WebkitTextStroke: "1.5px black",
            paintOrder: "stroke fill",
          }}
        >
          THE PIT CREW
        </h3>

        {/* Subtitle */}
        <p
          className="text-center text-xl text-white font-bold mb-8"
          style={{
            textShadow: "2px 2px 0 rgba(0, 0, 0, 0.8)",
          }}
        >
          Gear up for the ultimate Ninja Warrior fun!
        </p>

        {/* Checklist */}
        <div className="space-y-4">
          {GEAR_CHECKLIST.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-brick-yellow/50 hover:border-brick-yellow transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brick-yellow flex items-center justify-center font-bold text-black shadow-lg">
                ✓
              </div>
              <span className="text-lg text-white font-body font-semibold">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Fun note */}
        <motion.div
          className="mt-8 p-4 bg-race-blue/30 backdrop-blur-sm border-2 border-race-blue rounded-xl"
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-center text-white font-body font-semibold">
            <span className="font-bold text-blue-400 text-lg">Pro tip:</span>{" "}
            Grip socks are provided
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GearCheckSection;
