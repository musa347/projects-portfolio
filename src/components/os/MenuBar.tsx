import React, { useMemo } from 'react';
import { useOS } from '../../contexts/OSContext';
import { getThemeForOS } from '../../config/themes';
import { FaApple } from 'react-icons/fa';

const MenuBar: React.FC = () => {
  const { currentOS, windows } = useOS();
  const theme = useMemo(() => getThemeForOS(currentOS), [currentOS]);

  if (currentOS !== 'macos') return null;

  const activeWindow = windows.find(w => w.isActive);
  const appTitle = activeWindow?.title || 'Portfolio';

  return (
    <div
      className="macos-menubar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 12px',
        background: 'rgba(255,255,255,0.6)',
        color: theme.textColor,
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)' as any,
        borderBottom: `1px solid ${theme.window.borderColor}`,
        zIndex: 2000
      }}
    >
      {/* Apple menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <FaApple size={14} />
        <strong style={{ fontWeight: 600 }}>{appTitle}</strong>
      </div>

      {/* Basic placeholder menus */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12 }}>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Window</span>
        <span>Help</span>
      </div>

      {/* Right side status items */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, fontSize: 12 }}>
        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

export default MenuBar;