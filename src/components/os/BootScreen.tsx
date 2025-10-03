import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from '../AnimatedLogo';

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="boot-screen"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="boot-logo">
        <AnimatedLogo />
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </motion.div>
  );
};

export default BootScreen;