import { motion } from 'framer-motion';
import '../App.css';

const AnimatedLogo = () => {
  return (
    <motion.div 
      className="imusa-logo-container"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="imusa-logo"
        initial={{ opacity: 0, rotateY: -180 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Apple-inspired bitten circle */}
        <motion.div 
          className="imusa-apple-shape"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "backOut" }}
        >
          <div className="apple-body"></div>
          <div className="apple-bite"></div>
          <div className="apple-leaf"></div>
        </motion.div>
        
        {/* iMusa text */}
        <motion.div 
          className="imusa-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span className="i-letter">i</span>
          <span className="musa-letters">Musa</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLogo;