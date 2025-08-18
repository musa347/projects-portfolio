import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';
import '../App.css'; 

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="splash-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="splash-logo">
        <AnimatedLogo />
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="typing-effect"
      >
        Ibrahim Musa
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        Software Engineer
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        Loading portfolio experience...
      </motion.p>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          <span className="progress-text">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;