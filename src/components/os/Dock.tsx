import React, { useMemo, useRef, useState } from 'react';
import { useOS } from '../../contexts/OSContext';
import { getThemeForOS } from '../../config/themes';

// Simple magnification dock for macOS
const Dock: React.FC = () => {
  const { currentOS, availableApps, windows, openApp, focusWindow } = useOS();
  const theme = useMemo(() => getThemeForOS(currentOS), [currentOS]);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  if (currentOS !== 'macos') return null;

  // Magnification parameters
  const baseSize = 44;
  const maxSize = 68;
  const influence = 100; // px radius of magnification influence

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = dockRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouseX(e.clientX - rect.left);
  };

  const handleMouseLeave = () => setMouseX(null);

  return (
    <div
      ref={dockRef}
      className="macos-dock"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed',
        bottom: 8,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 10,
        padding: '8px 12px',
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)' as any,
        borderRadius: 14,
        border: `1px solid ${theme.window.borderColor}`,
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        zIndex: 1500
      }}
    >
      {availableApps.filter(a => a.showInTaskbar).map(app => {
        const appWindows = windows.filter(w => w.appId === app.id);
        const isActive = appWindows.some(w => w.isActive);
        const isOpen = appWindows.length > 0;

        return (
          <button
            key={app.id}
            onClick={() => (isOpen ? focusWindow(appWindows[0].id) : openApp(app.id))}
            className="dock-icon"
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              margin: 0,
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: baseSize,
                height: baseSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.1s ease-out',
                transform: 'scale(1)'
              }}
              // dynamic inline style via onMouseMove
              onMouseMove={(e) => {
                if (mouseX == null) return;
                const iconRect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const dockRect = dockRef.current?.getBoundingClientRect();
                if (!dockRect) return;
                const centerX = iconRect.left - dockRect.left + iconRect.width / 2;
                const dist = mouseX - centerX;
                const mag = Math.max(0, 1 - Math.abs(dist) / influence);
                const size = baseSize + (maxSize - baseSize) * mag;
                (e.currentTarget as HTMLDivElement).style.transform = `scale(${size / baseSize})`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
              }}
            >
              {app.icon ? React.createElement(app.icon, { size: 26 }) : '📁'}
            </div>
            {isOpen && (
              <div
                style={{
                  position: 'absolute',
                  bottom: -6,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: theme.colors.primary
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Dock;