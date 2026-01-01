import { motion } from "framer-motion";
import { PARTY_CONFIG } from "../constants/config";

const MapSection = () => {
  const { venue } = PARTY_CONFIG;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full md:w-[672px] mx-auto px-6"
    >
      <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-4 border-race-blue shadow-2xl">
        {/* Icon - Above the title */}
        <div className="flex justify-center mb-6">
          <img
            src={`${import.meta.env.BASE_URL}assets/checkpoint_map.png`}
            alt="Navigation"
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
          CHECKPOINT 2
        </h2>
        <h3
          className="font-heading text-3xl md:text-4xl text-center text-lime-400 mb-8 leading-none"
          style={{
            textShadow: "3px 3px 0 rgba(0, 0, 0, 0.8)",
            WebkitTextStroke: "1.5px black",
            paintOrder: "stroke fill",
          }}
        >
          THE NAVIGATION
        </h3>

        {/* Date & Time */}
        <div className="text-center mb-8">
          <div className="inline-block bg-green-600/90 text-white px-8 py-6 rounded-2xl mb-4 border-2 border-green-400 shadow-lg">
            <div
              className="font-heading text-2xl md:text-3xl flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2"
              style={{
                textShadow: "2px 2px 0 rgba(0, 0, 0, 0.5)",
              }}
            >
              <span>Tuesday, January 20</span>
              <span>at 4:30 PM</span>
            </div>
          </div>
        </div>

        {/* Venue Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-white/20 text-center">
          <h4
            className="font-heading text-2xl text-race-blue mb-3"
            style={{
              textShadow: "2px 2px 0 rgba(0, 0, 0, 0.8)",
              WebkitTextStroke: "1px black",
              paintOrder: "stroke fill",
            }}
          >
            {venue.name}
          </h4>
          <p
            className="text-white text-lg mb-4 font-semibold"
            style={{
              textShadow: "1px 1px 0 rgba(0, 0, 0, 0.8)",
            }}
          >
            {venue.address}
          </p>
          <div className="flex items-center justify-center gap-2 text-brick-yellow font-bold">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span style={{ textShadow: "1px 1px 0 rgba(0, 0, 0, 0.8)" }}>
              {venue.parkingInfo}
            </span>
          </div>
        </div>

        {/* Get Directions Button */}
        <motion.a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            "Ninja Warrior UK Adventure Leeds Seacroft"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-race-blue hover:bg-race-blue/90 text-white font-heading text-2xl py-4 rounded-2xl text-center transition-colors border-2 border-blue-400 shadow-lg"
          style={{
            textShadow: "2px 2px 0 rgba(0, 0, 0, 0.5)",
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          🗺️ GET DIRECTIONS
        </motion.a>
      </div>
    </motion.div>
  );
};

export default MapSection;
