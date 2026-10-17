import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HELLO_LANGS } from '../mock';

const Preloader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [readyToEnter, setReadyToEnter] = useState(false);

  // Cycle through the greetings
  useEffect(() => {
    if (index === HELLO_LANGS.length - 1) {
      setReadyToEnter(true);
      return;
    }

    const interval = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 180);

    return () => clearTimeout(interval);
  }, [index]);

  const handleEnter = () => {
    // This runs directly inside a user click/touch event, satisfying the browser's Autoplay policy
    window.dispatchEvent(new CustomEvent('start-ambient-audio'));
    if (onComplete) onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      onClick={handleEnter}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] cursor-pointer select-none"
    >
      <motion.p
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.12 }}
        className="display-font text-5xl md:text-7xl text-white tracking-tight text-center px-4"
      >
        {HELLO_LANGS[index]}
      </motion.p>

      {/* Subtle indicator that prompts interaction so the audio unlocks seamlessly */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: readyToEnter ? 0.7 : 0.3 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-12 flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-400"
      >
        <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-ping" />
        {readyToEnter ? 'Click anywhere to enter' : 'Click to skip'}
      </motion.div>
    </motion.div>
  );
};

export default Preloader;