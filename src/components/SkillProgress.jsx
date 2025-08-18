import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SkillProgress = ({ skill, percentage, delay = 0, icon }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      className="skill-progress-item"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000, duration: 0.6 }}
    >
      <div className="skill-header">
        <div className="skill-info">
          {icon && <span className="skill-icon">{icon}</span>}
          <span className="skill-name">{skill}</span>
        </div>
        <motion.span
          className="skill-percentage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (delay + 500) / 1000 }}
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${percentage}%` : 0 }}
          transition={{ 
            delay: (delay + 200) / 1000, 
            duration: 1.2, 
            ease: "easeOut" 
          }}
        />
      </div>
    </motion.div>
  );
};

export default SkillProgress;