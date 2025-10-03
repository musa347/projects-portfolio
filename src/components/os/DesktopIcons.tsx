import React from 'react';
import { useOS } from '../../contexts/OSContext';
import { FaRecycle } from 'react-icons/fa';

// Simple Windows-style desktop icons grid
const DesktopIcons: React.FC = () => {
  const { availableApps, openApp, currentOS } = useOS();

  if (currentOS !== 'windows') return null;

  // Choose a few default desktop shortcuts
  const desktopAppIds = ['about-me', 'projects', 'cv', 'weather'] as const;
  const desktopApps = availableApps.filter(a => desktopAppIds.includes(a.id as any));

  const items: { id: string; label: string; icon: React.ReactNode; onOpen?: () => void }[] = [
    // Recycle Bin placeholder
    { id: 'recycle-bin', label: 'Recycle Bin', icon: <FaRecycle size={26} />, onOpen: () => {} },
    // App shortcuts
    ...desktopApps.map(a => ({
      id: a.id,
      label: a.name,
      icon: a.icon ? React.createElement(a.icon, { size: 26 }) : '📦',
      onOpen: () => openApp(a.id),
    }))
  ];

  return (
    <div
      className="desktop-icons"
      style={{
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 10,
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(1, 96px)', // single column like default desktop
        gap: 16,
        userSelect: 'none',
      }}
    >
      {items.map(item => (
        <button
          key={item.id}
          onDoubleClick={() => item.onOpen?.()}
          title={item.label}
          style={{
            background: 'transparent',
            border: 'none',
            width: 96,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            color: 'white',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
            cursor: 'default',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              display: 'grid',
              placeItems: 'center',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {item.icon}
          </div>
          <span
            style={{
              fontSize: 12,
              lineHeight: 1.2,
              textAlign: 'center',
              wordBreak: 'break-word',
            }}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default DesktopIcons;