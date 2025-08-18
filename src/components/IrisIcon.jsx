import { motion } from 'framer-motion';

const IrisIcon = ({ size = 24, className = "" }) => {
  return (
    <motion.div 
      className={`iris-icon ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Neural network nodes */}
        <motion.circle
          cx="12"
          cy="6"
          r="2"
          fill="url(#brainGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        />
        <motion.circle
          cx="6"
          cy="12"
          r="2"
          fill="url(#brainGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        />
        <motion.circle
          cx="18"
          cy="12"
          r="2"
          fill="url(#brainGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        />
        <motion.circle
          cx="12"
          cy="18"
          r="2"
          fill="url(#brainGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        />
        
        {/* Neural connections */}
        <motion.path
          d="M10.5 7.5L7.5 10.5"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        <motion.path
          d="M13.5 7.5L16.5 10.5"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />
        <motion.path
          d="M7.5 13.5L10.5 16.5"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        />
        <motion.path
          d="M16.5 13.5L13.5 16.5"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
        
        {/* Central processing unit */}
        <motion.circle
          cx="12"
          cy="12"
          r="3"
          fill="none"
          stroke="url(#coreGradient)"
          strokeWidth="2"
          strokeDasharray="4 2"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#007AFF" />
            <stop offset="50%" stopColor="#5856D6" />
            <stop offset="100%" stopColor="#AF52DE" />
          </linearGradient>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34C759" />
            <stop offset="100%" stopColor="#30D158" />
          </linearGradient>
          <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9500" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default IrisIcon;