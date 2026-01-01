import { motion } from "framer-motion";

const EndOfTrack = () => {
  return (
    <motion.div
      className="text-center mt-12 px-6 pb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      viewport={{ once: true }}
    >
      <p
        className="font-heading text-6xl md:text-8xl text-white/70 mb-8"
        style={{
          textShadow: "3px 3px 0 rgba(0, 0, 0, 0.8)",
          WebkitTextStroke: "2px black",
          paintOrder: "stroke fill",
        }}
      >
        END OF TRACK
      </p>
      <div className="flex justify-center gap-8 text-7xl md:text-9xl mb-12">
        <span>🏁</span>
        <span>🏁</span>
        <span>🏁</span>
      </div>

      {/* Contact Section */}
      <motion.div
        className="w-full md:w-[672px] mx-auto mt-8 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-4 border-white/20 shadow-2xl">
          <p
            className="text-center text-white/80 text-lg mb-4 font-body font-semibold"
            style={{
              textShadow: "2px 2px 0 rgba(0, 0, 0, 0.8)",
            }}
          >
            Feel free to reach out if you have any questions.
          </p>
          <a
            href="tel:074 81 763 951"
            className="block text-center text-white hover:text-brick-yellow text-2xl font-body font-semibold transition-colors tracking-wider"
            style={{
              textShadow: "2px 2px 0 rgba(0, 0, 0, 0.8)",
            }}
          >
            📞 074 81 763 951
          </a>
          <p
            className="text-center text-white/70 text-lg mt-2 font-body"
            style={{
              textShadow: "1px 1px 0 rgba(0, 0, 0, 0.8)",
            }}
          ></p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EndOfTrack;
