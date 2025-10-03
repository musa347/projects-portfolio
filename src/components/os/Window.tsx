import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useOS } from '../../contexts/OSContext';
import { WindowState, OSName } from '../../types/os';
import WindowControls from './WindowControls';
import { getThemeForOS } from '../../config/themes';

interface WindowProps {
  windowData: WindowState;
}

const Window: React.FC<WindowProps> = ({ windowData }) => {
  const {
    id,
    title,
    component: Component,
    x,
    y,
    width,
    height,
    isActive,
    isMinimized,
    isMaximized,
    zIndex,
    minWidth = 300,
    minHeight = 200,
    os = 'windows' as OSName
  } = windowData;

  const {
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,
  } = useOS();

  const [isDragging, setIsDragging] = useState(false);
  const theme = useMemo(() => getThemeForOS(os), [os]);
  const windowRef = useRef<HTMLDivElement>(null);

  // Handle window focus on click
  const handleFocus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isActive) {
      focusWindow(id);
    }
  };

  // Handle drag start
  const handleDragStart = (e: any, info: PanInfo) => {
    if (isMaximized) return;
    setIsDragging(true);
    if (!isActive) {
      focusWindow(id);
    }
  };

  // Handle drag
  const handleDrag = (e: any, info: PanInfo) => {
    if (isMaximized || !isDragging) return;
    
    const newX = x + info.delta.x;
    const newY = Math.max(0, y + info.delta.y);
    
    updateWindowPosition(id, { x: newX, y: newY });
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Apply theme styles to the window
  useEffect(() => {
    if (windowRef.current) {
      const style = windowRef.current.style;
      style.setProperty('--window-bg', theme.window.bg);
      style.setProperty('--window-text', theme.text.primary);
      style.setProperty('--primary-color', theme.colors.primary);
      style.setProperty('--border-radius', theme.window.borderRadius);
      style.setProperty('--font-family', theme.typography.fontFamily);
    }
  }, [theme]);

  // Don't render if minimized
  if (isMinimized) {
    return null;
  }

  const taskbarHeight = 50; // fallback
  const menubarHeight = os === 'macos' ? 28 : 0;
  const dockReserve = os === 'macos' ? 84 : 0; // space above dock

  const windowStyle: React.CSSProperties = {
    position: 'absolute',
    left: isMaximized ? 0 : x,
    top: isMaximized ? menubarHeight : y,
    width: isMaximized ? '100%' : width,
    height: isMaximized ? `calc(100vh - ${menubarHeight + taskbarHeight + dockReserve}px)` : height,
    zIndex,
    minWidth,
    minHeight,
    backgroundColor: 'var(--window-bg)',
    border: `1px solid ${theme.window.borderColor}`,
    borderRadius: 'var(--border-radius)',
    boxShadow: theme.window.shadow,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <motion.div
      ref={windowRef}
      className={`window ${os} ${isActive ? 'active' : ''}`}
      style={windowStyle}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: isMaximized ? 0 : x,
        y: isMaximized ? menubarHeight : y,
        width: isMaximized ? '100%' : width,
        height: isMaximized ? `calc(100vh - ${menubarHeight + taskbarHeight + dockReserve}px)` : height,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        type: 'spring',
        damping: os === 'macos' ? 30 : 25,
        stiffness: os === 'macos' ? 400 : 300,
      }}
      drag={!isMaximized}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      dragElastic={0}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onClick={handleFocus}
    >
      <div 
        className="window-header"
        style={{
          height: theme.window.headerHeight,
          backgroundColor: 'var(--window-bg)',
          borderBottom: `1px solid ${theme.window.borderColor}`,
          display: 'flex',
          alignItems: 'center',
          padding: os === 'windows' ? '0 8px' : '0 12px',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          // @ts-expect-error: vendor-prefixed CSS property used for effect only
          WebkitAppRegion: 'drag',
        }}
        onDoubleClick={() => maximizeWindow(id)}
      >
        <div 
          className="window-title"
          style={{
            flex: 1,
            padding: '0 8px',
            fontSize: os === 'windows' ? '12px' : '13px',
            fontWeight: 500,
            textAlign: os === 'macos' ? 'center' : 'left',
            paddingLeft: os === 'macos' ? '20px' : '0',
          }}
        >
          {title}
        </div>
        <WindowControls
          onClose={() => closeWindow(id)}
          onMinimize={() => minimizeWindow(id)}
          onMaximize={() => maximizeWindow(id)}
          isMaximized={isMaximized}
          os={os}
        />
      </div>
      <div
        className="window-content"
        style={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: 'var(--window-bg)',
          color: 'var(--window-text)',
          padding: '12px',
        }}
      >
        <Component />
      </div>
    </motion.div>
  );
};

export default Window;