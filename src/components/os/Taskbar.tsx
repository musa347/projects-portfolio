import React, { useMemo, useState } from 'react';
import { useOS } from '../../contexts/OSContext';
import { FaApple, FaWindows, FaMobileAlt, FaAndroid, FaLinux } from 'react-icons/fa';
import { OSName } from '../../types/os';
import { getThemeForOS } from '../../config/themes'; 
import WindowControls from './WindowControls'; // We'll use this for the macOS style window controls
import StartMenu from './StartMenu';

const Taskbar: React.FC = () => {
  const { 
    currentOS, 
    setCurrentOS, 
    openApp, 
    windows, 
    focusWindow, 
    availableApps,
    minimizeWindow,
    maximizeWindow,
    closeWindow
  } = useOS();

  const theme = useMemo(() => getThemeForOS(currentOS), [currentOS]);
  const [startOpen, setStartOpen] = useState(false);
  
  const osOptions: OSName[] = ['windows', 'macos', 'linux', 'ios', 'android'];

  const getOSIcon = (os: OSName) => {
    switch (os) {
      case 'macos': return <FaApple size={16} />;
      case 'windows': return <FaWindows size={14} />;
      case 'linux': return <FaLinux size={14} />;
      case 'ios': return <FaMobileAlt size={14} />;
      case 'android': return <FaAndroid size={14} />;
      default: return <FaWindows size={14} />;
    }
  };

  // Get the active window for window controls
  const activeWindow = windows.find(win => win.isActive);

  // Centered layout for Windows 11
  const centerAligned = currentOS === 'windows';

  return (
    <div 
      className={`os-taskbar ${currentOS}`}
      style={{
        height: theme.taskbar.height as unknown as number | string,
        backgroundColor: theme.taskbar.backgroundColor,
        color: theme.textColor,
        display: 'flex',
        alignItems: 'center',
        padding: currentOS === 'macos' ? '0 80px' : '0 16px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: `1px solid ${theme.window.borderColor}`,
        boxShadow: '0 -1px 5px rgba(0,0,0,0.1)',
        backdropFilter: centerAligned ? 'blur(10px)' : undefined,
        WebkitBackdropFilter: centerAligned ? ('blur(10px)' as any) : undefined,
      }}
    >
      {/* macOS-style window controls for the active window */}
      {currentOS === 'macos' && activeWindow && (
        <div className="macos-window-controls" style={{ 
          position: 'absolute',
          left: '16px',
          display: 'flex',
          gap: '8px'
        }}>
          <WindowControls
            onClose={() => closeWindow(activeWindow.id)}
            onMinimize={() => minimizeWindow(activeWindow.id)}
            onMaximize={() => maximizeWindow(activeWindow.id)}
            isMaximized={activeWindow.isMaximized}
            os={currentOS}
          />
        </div>
      )}

      {/* Center group (Windows 11) */}
      {centerAligned ? (
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 8px'
        }}>
          <button 
            onClick={() => setStartOpen(v => !v)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              padding: '6px 10px',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 600
            }}
            aria-label="Open Start"
          >
            <FaWindows size={16} />
          </button>

          <div className="app-icons" style={{
            display: 'flex',
            gap: '6px',
            overflowX: 'auto'
          }}>
            {availableApps
              .filter(app => app.showInTaskbar)
              .map(app => {
                const appWindows = windows.filter(w => w.appId === app.id);
                const isActive = appWindows.some(w => w.isActive);
                const isOpen = appWindows.length > 0;
                return (
                  <button
                    key={app.id}
                    onClick={() => isOpen ? focusWindow(appWindows[0].id) : openApp(app.id)}
                    style={{
                      background: isActive ? 'rgba(0,0,0,0.06)' : 'transparent',
                      border: 'none',
                      borderRadius: 8,
                      color: 'var(--text)',
                      cursor: 'pointer',
                      padding: '6px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      position: 'relative',
                      transition: 'all 0.2s ease'
                    }}
                    className="app-icon"
                  >
                    <div style={{ fontSize: 20 }}>
                      {app.icon ? React.createElement(app.icon, { size: 18 }) : '📁'}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      ) : (
        // Windows/Linux style start menu/app launcher (legacy left-aligned)
        (currentOS === 'linux') && (
          <div className="start-menu" style={{ marginRight: '16px' }}>
            <button 
              onClick={() => openApp('start')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text)',
                cursor: 'pointer',
                padding: '4px 12px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              <FaLinux size={16} />
              <span>Menu</span>
            </button>
          </div>
        )
      )}

      {/* Spacer to allow center group overlap */}
      <div style={{ flex: 1 }} />

      {/* System tray / OS switcher */}
      <div className="system-tray" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginLeft: 'auto'
      }}>
        <div className="os-switcher" style={{
          display: 'flex',
          backgroundColor: 'rgba(255,255,255,0.1)', 
          borderRadius: '12px',
          padding: '2px',
          gap: '2px'
        }}>
          {osOptions.map(os => (
            <button
              key={os}
              onClick={() => {
                setStartOpen(false);
                setCurrentOS(os);
              }}
              style={{
                background: currentOS === os ? 'rgba(255,255,255,0.2)' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: 'var(--text)',
                cursor: 'pointer',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              title={`Switch to ${os}`}
            >
              {getOSIcon(os)}
            </button>
          ))}
        </div>
        
        {/* Clock */}
        <div style={{
          padding: '4px 8px',
          fontSize: '12px',
          fontFamily: 'monospace',
          backgroundColor: 'rgba(0,0,0,0.1)', 
          borderRadius: '4px'
        }}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Start Menu overlay */}
      {currentOS === 'windows' && (
        <StartMenu open={startOpen} onClose={() => setStartOpen(false)} />
      )}
    </div>
  );
};

export default Taskbar;