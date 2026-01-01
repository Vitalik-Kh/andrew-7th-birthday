import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PARTY_CONFIG } from "../constants/config";

const RsvpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    attending: "",
    dietary: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append("access_key", PARTY_CONFIG.web3FormsKey);
      formPayload.append("name", formData.name);
      formPayload.append("attending", formData.attending);
      formPayload.append("dietary", formData.dietary || "None");
      formPayload.append(
        "subject",
        `RSVP for Andrew's 7th Birthday - ${formData.name}`
      );

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again or contact us directly.");
      }
    } catch (error) {
      console.error("RSVP submission error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full md:w-[672px] mx-auto px-6"
    >
      <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-4 border-brick-red shadow-2xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <img
            src={`${import.meta.env.BASE_URL}assets/checkpoint-rsvp.png`}
            alt="Finish Line"
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
          CHECKPOINT 3
        </h2>
        <h3
          className="font-heading text-3xl md:text-4xl text-center text-lime-400 mb-8 leading-none"
          style={{
            textShadow: "3px 3px 0 rgba(0, 0, 0, 0.8)",
            WebkitTextStroke: "1.5px black",
            paintOrder: "stroke fill",
          }}
        >
          ALMOST THERE
        </h3>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <p
                className="text-center text-xl text-white font-bold mb-8"
                style={{
                  textShadow: "2px 2px 0 rgba(0, 0, 0, 0.8)",
                }}
              >
                Will you join the fun?
              </p>

              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-body text-white mb-2 font-semibold"
                  style={{
                    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.8)",
                  }}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-brick-red/50 focus:border-brick-red text-white outline-none transition-colors font-semibold"
                  placeholder="Enter your name"
                />
              </div>

              {/* Attending Radio */}
              <div>
                <label
                  className="block text-lg font-body text-white mb-3 font-semibold"
                  style={{
                    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.8)",
                  }}
                >
                  Can you make it? *
                </label>
                <div className="flex gap-4">
                  <motion.label
                    className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.attending === "Yes"
                        ? "bg-brick-yellow border-brick-yellow text-black shadow-lg"
                        : "bg-white/10 backdrop-blur-sm border-white/30 text-white hover:border-white/50"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="Yes"
                      checked={formData.attending === "Yes"}
                      onChange={handleChange}
                      required
                      className="sr-only"
                    />
                    <span className="text-2xl">🚀</span>
                    <span
                      className="font-bold text-lg"
                      style={{
                        textShadow:
                          formData.attending === "Yes"
                            ? "1px 1px 0 rgba(0, 0, 0, 0.3)"
                            : "none",
                      }}
                    >
                      YES
                    </span>
                  </motion.label>

                  <motion.label
                    className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.attending === "No"
                        ? "bg-brick-red border-brick-red text-white shadow-lg"
                        : "bg-white/10 backdrop-blur-sm border-white/30 text-white hover:border-white/50"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="No"
                      checked={formData.attending === "No"}
                      onChange={handleChange}
                      required
                      className="sr-only"
                    />
                    <span className="text-2xl">😢</span>
                    <span
                      className="font-bold text-lg"
                      style={{
                        textShadow:
                          formData.attending === "No"
                            ? "1px 1px 0 rgba(0, 0, 0, 0.5)"
                            : "none",
                      }}
                    >
                      NO
                    </span>
                  </motion.label>
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label
                  htmlFor="dietary"
                  className="block text-lg font-body text-white mb-2 font-semibold"
                  style={{
                    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.8)",
                  }}
                >
                  Dietary Requirements / Allergies
                </label>
                <textarea
                  id="dietary"
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-brick-red/50 focus:border-brick-red text-white outline-none transition-colors resize-none font-semibold"
                  placeholder="Let us know if you have any dietary needs..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-heading text-3xl py-4 rounded-2xl transition-colors border-2 border-green-400 shadow-lg"
                style={{
                  textShadow: "2px 2px 0 rgba(0, 0, 0, 0.5)",
                }}
                whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? "SUBMITTING..." : "SUBMIT RSVP 🏁"}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              {/* Confetti effect */}
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.8, repeat: 3 }}
              >
                {formData.attending === "Yes" ? "🏆" : "💙"}
              </motion.div>
              <h4
                className="font-heading text-5xl text-brick-yellow mb-4"
                style={{
                  textShadow: "3px 3px 0 rgba(0, 0, 0, 0.8)",
                  WebkitTextStroke: "2px black",
                  paintOrder: "stroke fill",
                }}
              >
                {formData.attending === "Yes"
                  ? "YOU'RE IN!"
                  : "THANKS FOR LETTING US KNOW!"}
              </h4>
              <p
                className="text-2xl text-white mb-6 font-bold"
                style={{
                  textShadow: "2px 2px 0 rgba(0, 0, 0, 0.8)",
                }}
              >
                {formData.attending === "Yes"
                  ? "See you at the party!"
                  : "We'll miss you at the party!"}
              </p>
              <div className="text-6xl">
                {(formData.attending === "Yes"
                  ? "🎉 🎊 🏁 🎉 🎊"
                  : "💙 😊 💙 😊 💙"
                )
                  .split(" ")
                  .map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mx-2"
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        delay: i * 0.1,
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RsvpForm;
