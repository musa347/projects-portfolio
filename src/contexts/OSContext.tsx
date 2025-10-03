import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { OSName, WindowState, App } from '../types/os';
import { getOperatingSystem } from '../services/device';
import { getAllApps } from '../config/apps';
import { defaultWallpaper, getOSWallpaper } from '../config/wallpapers';
import { getThemeForOS, OSTheme } from '../config/themes';

interface OSContextShape {
  // Core OS State
  currentOS: OSName;
  setCurrentOS: (newOS: OSName) => void;
  theme: OSTheme;
  
  // Window Management
  windows: WindowState[];
  openApp: (appId: string) => void;
  closeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  updateWindowPosition: (
    windowId: string,
    position: Partial<Pick<WindowState, 'x' | 'y' | 'width' | 'height'>>
  ) => void;
  activeWindowId: string | null;
  availableApps: App[];
  
  // UI State
  wallpaper: {
    id: string;
    name: string;
    component: React.ComponentType<any>;
    url?: string;
  };
  setWallpaper: (wallpaper: { id: string; name: string; component: React.ComponentType<any>; url?: string }) => void;
  
  // System Functions
  restartOS: () => void;
  shutdownOS: () => void;
  
  // UI State
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const OSContext = createContext<OSContextShape | undefined>(undefined);

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Core OS State
  const [currentOS, _setCurrentOS] = useState<OSName>(getOperatingSystem());
  const [theme, setTheme] = useState<OSTheme>(() => getThemeForOS(getOperatingSystem()));
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  // Window Management
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(100);
  
  // UI State
  const [wallpaper, setWallpaper] = useState(defaultWallpaper);

  // Available apps
  const availableApps = useMemo(() => getAllApps(), []);

  // Wrapped setCurrentOS to handle side effects
  const setCurrentOS = useCallback((newOS: OSName) => {
    _setCurrentOS(prevOS => {
      if (prevOS === newOS) return prevOS; // No change needed
      return newOS;
    });
  }, []);
  
  // Update theme and wallpaper when OS or dark mode changes
  useEffect(() => {
    const newTheme = getThemeForOS(currentOS);
    setTheme(newTheme);
    
    // Apply theme to document
    const root = document.documentElement as HTMLElement;
    root.style.setProperty('--primary-color', newTheme.primaryColor);
    root.style.setProperty('--secondary-color', newTheme.secondaryColor);
    root.style.setProperty('--bg-color', newTheme.backgroundColor);
    root.style.setProperty('--text-color', newTheme.textColor);
    root.style.setProperty('--accent-color', newTheme.accentColor);
    root.style.setProperty('--border-radius', newTheme.borderRadius);
    root.style.setProperty('--font-family', newTheme.fontFamily);
    
    // Update body class
    document.body.className = `${currentOS} ${darkMode ? 'dark' : 'light'}`;
    
    // Update wallpaper when OS changes
    setWallpaper({
      ...defaultWallpaper,
      url: getOSWallpaper(currentOS)
    });
  }, [currentOS, darkMode]);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);
  
  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(console.error);
        setIsFullscreen(false);
      }
    }
  }, []);

  // Window management functions
  const openApp = useCallback((appId: string) => {
    const app = availableApps.find(a => a.id === appId);
    if (!app) return;

    const newWindow: WindowState = {
      id: `window-${Date.now()}`,
      appId: app.id,
      title: app.name,
      component: app.component,
      x: 100,
      y: 100,
      width: app.defaultSize?.width ?? 800,
      height: app.defaultSize?.height ?? 600,
      isActive: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
      os: currentOS,
    };

    setWindows(prev => [
      ...prev.map(w => ({ ...w, isActive: false })),
      newWindow
    ]);
    setActiveWindowId(newWindow.id);
    setNextZIndex(prev => prev + 1);
  }, [availableApps, nextZIndex, currentOS]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
    setActiveWindowId(prev => (prev === windowId ? null : prev));
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    setWindows(prev => 
      prev.map(w => ({
        ...w,
        isActive: w.id === windowId,
        zIndex: w.id === windowId ? nextZIndex : w.zIndex,
      }))
    );
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(windowId);
  }, [nextZIndex]);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === windowId ? { ...w, isMinimized: true, isActive: false } : w))
    );
    setActiveWindowId(prev => (prev === windowId ? null : prev));
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  }, []);

  const updateWindowPosition = useCallback((windowId: string, position: Partial<Pick<WindowState, 'x' | 'y' | 'width' | 'height'>>) => {
    setWindows(prev =>
      prev.map(w => (w.id === windowId ? { ...w, ...position } : w))
    );
  }, []);

  // System functions (basic implementations)
  const restartOS = useCallback(() => {
    // Close all windows and reset z-index
    setWindows([]);
    setActiveWindowId(null);
    setNextZIndex(100);
  }, []);

  const shutdownOS = useCallback(() => {
    // Close all windows; could show a splash in future
    setWindows([]);
    setActiveWindowId(null);
  }, []);

  // Create the context value
  const contextValue = useMemo(
    () => ({
      // Core OS State
      currentOS,
      setCurrentOS,
      theme,
      
      // Window Management
      windows,
      openApp,
      closeWindow,
      focusWindow,
      minimizeWindow,
      maximizeWindow,
      updateWindowPosition,
      activeWindowId,
      
      // Apps & UI
      availableApps,
      wallpaper,
      setWallpaper,
      
      // System Functions
      restartOS,
      shutdownOS,
      
      // UI State
      isFullscreen,
      toggleFullscreen,
      darkMode,
      toggleDarkMode,
    }), [
      currentOS,
      theme,
      windows,
      openApp,
      closeWindow,
      focusWindow,
      minimizeWindow,
      maximizeWindow,
      updateWindowPosition,
      activeWindowId,
      availableApps,
      wallpaper,
      restartOS,
      shutdownOS,
      isFullscreen,
      toggleFullscreen,
      darkMode,
      toggleDarkMode,
    ]
  );

  return (
    <OSContext.Provider value={contextValue}>
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (context === undefined) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};