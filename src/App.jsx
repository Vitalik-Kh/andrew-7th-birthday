import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroGate from "./components/IntroGate";
import MainTrack from "./components/MainTrack";

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false); // Changed to true to skip intro

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <IntroGate key="intro" onComplete={() => setIsUnlocked(true)} />
        ) : (
          <MainTrack key="main" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
