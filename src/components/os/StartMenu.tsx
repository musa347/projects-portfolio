import React, { useEffect } from 'react';
import { useOS } from '../../contexts/OSContext';
import { FaPowerOff, FaSearch } from 'react-icons/fa';

interface StartMenuProps {
  open: boolean;
  onClose: () => void;
}

// Windows 11-style Start menu: centered panel with search, pinned apps, and recommended
const StartMenu: React.FC<StartMenuProps> = ({ open, onClose }) => {
  const { availableApps, windows, openApp } = useOS();

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const pinned = availableApps.slice(0, 12);
  const recommended = windows.slice(0, 5);

  return (
    <div
      aria-hidden
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
      }}
    >
      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 64, // sits above a 48px taskbar
          width: 640,
          maxWidth: '92vw',
          maxHeight: '72vh',
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)' as any,
          borderRadius: 12,
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          color: '#111',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Search */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 12px',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(0,0,0,0.08)'
          }}>
            <FaSearch size={14} />
            <input
              placeholder="Type here to search"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: 14,
              }}
            />
          </div>
        </div>

        {/* Pinned */}
        <div style={{ padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 12, opacity: 0.7 }}>Pinned</span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 12,
          }}>
            {pinned.map((app) => (
              <button
                key={app.id}
                onClick={() => { openApp(app.id); onClose(); }}
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: 10,
                  padding: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: 22 }}>
                  {app.icon ? (React.createElement(app.icon, { size: 22 })) : '📦'}
                </div>
                <span style={{ fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 80 }}>
                  {app.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div style={{ padding: '4px 16px 12px 16px' }}>
          <div style={{ fontWeight: 600, fontSize: 12, opacity: 0.7, marginBottom: 8 }}>Recommended</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {recommended.length === 0 && (
              <div style={{ opacity: 0.6, fontSize: 12 }}>No recent items</div>
            )}
            {recommended.map((w) => (
              <div key={w.id} style={{
                background: 'rgba(255,255,255,0.65)',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: 10,
                padding: 10,
                minHeight: 56,
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{w.title}</div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>Open window</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 8,
          borderTop: '1px solid rgba(0,0,0,0.08)'
        }}>
          <button onClick={onClose} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 8,
            padding: '8px 10px', cursor: 'pointer'
          }}>
            <FaPowerOff size={12} />
            <span style={{ fontSize: 12 }}>Power</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;