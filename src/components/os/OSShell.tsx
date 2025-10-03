import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../contexts/OSContext';
import Window from './Window';
import Taskbar from './Taskbar';
import MenuBar from './MenuBar';
import Dock from './Dock';
import DesktopIcons from './DesktopIcons';
import { getDeviceInfo } from '../../services/device';

const OSShell = () => {
  const { windows, wallpaper, setCurrentOS: setOS, currentOS } = useOS();
  const WallpaperComponent = wallpaper.component;

  // Set OS based on device detection on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const deviceInfo = getDeviceInfo();
      setOS(deviceInfo.os);
    }
  }, [setOS]);

  return (
    <div className="os-shell" data-os={useOS().currentOS} style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <div className="wallpaper-container">
        {/* macOS menu bar */}
        {currentOS === 'macos' && <MenuBar />}
        {/* OS-specific wallpaper */}
        <WallpaperComponent os={currentOS} />
        {/* Windows desktop icons */}
        {currentOS === 'windows' && (
          <DesktopIcons />
        )}
        <div className="windows-container" style={{ paddingTop: currentOS === 'macos' ? 28 : 0 }}>
          <AnimatePresence>
            {windows.map((window) => (
              <Window key={window.id} windowData={window} />
            ))}
          </AnimatePresence>
        </div>
        {/* macOS Dock */}
        {currentOS === 'macos' && <Dock />}
        {/* Always render Taskbar so OS switcher is available */}
        <Taskbar />
      </div>
    </div>
  );
};

export default OSShell;