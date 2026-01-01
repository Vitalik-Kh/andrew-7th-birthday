import { motion } from "framer-motion";
import { PARTY_CONFIG } from "../constants/config";

const WaiverSection = () => {
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
            src={`${import.meta.env.BASE_URL}assets/checkpoint-waver.png`}
            alt="Waiver"
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
          FINAL CHECKPOINT
        </h2>
        <h3
          className="font-heading text-3xl md:text-4xl text-center text-lime-400 mb-8 leading-none"
          style={{
            textShadow: "3px 3px 0 rgba(0, 0, 0, 0.8)",
            WebkitTextStroke: "1.5px black",
            paintOrder: "stroke fill",
          }}
        >
          THE WAIVER
        </h3>

        {/* Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-white/20">
          <p
            className="text-white text-lg text-center leading-relaxed font-semibold"
            style={{
              textShadow: "1px 1px 0 rgba(0, 0, 0, 0.8)",
            }}
          >
            Before the party, all participants must complete the{" "}
            <span className="font-bold text-brick-yellow text-xl">
              Ninja Warrior UK waiver
            </span>
            . It's quick and easy.
          </p>
        </div>

        {/* Sign Waiver Button */}
        <motion.a
          href={PARTY_CONFIG.waiverUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-brick-red hover:bg-brick-red/90 text-white font-heading text-3xl py-4 rounded-2xl text-center transition-colors border-2 border-red-400"
          style={{
            textShadow: "2px 2px 0 rgba(0, 0, 0, 0.5)",
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          📝 SIGN THE WAIVER
        </motion.a>
      </div>
    </motion.div>
  );
};

export default WaiverSection;
