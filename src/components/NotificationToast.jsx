import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { FaCheck, FaExclamationTriangle, FaInfo, FaTimes } from 'react-icons/fa';

const NotificationToast = ({ 
  message, 
  type = 'info', 
  isVisible, 
  onClose, 
  duration = 4000 
}) => {
  const icons = {
    success: <FaCheck />,
    error: <FaTimes />,
    warning: <FaExclamationTriangle />,
    info: <FaInfo />
  };

  const colors = {
    success: '#059669',
    error: '#dc2626',
    warning: '#d97706',
    info: '#2563eb'
  };

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="notification-toast"
          style={{ '--toast-color': colors[type] }}
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="toast-icon">
            {icons[type]}
          </div>
          <div className="toast-content">
            <p>{message}</p>
          </div>
          <button className="toast-close" onClick={onClose}>
            <FaTimes />
          </button>
          <motion.div
            className="toast-progress"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;