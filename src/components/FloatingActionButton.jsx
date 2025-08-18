import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaArrowUp, FaComments, FaDownload, FaEnvelope, FaFileAlt } from 'react-icons/fa';

const FloatingActionButton = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actions = [
    {
      icon: <FaComments />,
      label: 'IRIS AI',
      action: () => setActiveSection('chat'),
      color: '#2563eb'
    },
    {
      icon: <FaFileAlt />,
      label: 'CV Section',
      action: () => setActiveSection('cv'),
      color: '#059669'
    },
    {
      icon: <FaEnvelope />,
      label: 'Contact Me',
      action: () => window.open('mailto:musaibrahim0028@yahoo.com'),
      color: '#dc2626'
    },
    {
      icon: <FaArrowUp />,
      label: 'Scroll to Top',
      action: scrollToTop,
      color: '#7c3aed'
    }
  ];

  return (
    <div className="floating-action-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fab-menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                className="fab-item"
                style={{ '--fab-color': action.color }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {action.icon}
                <span className="fab-tooltip">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={`fab-main ${isOpen ? 'fab-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="fab-icon">+</span>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;