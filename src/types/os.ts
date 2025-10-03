import React from 'react';

export type OSName = 'windows' | 'macos' | 'linux' | 'ios' | 'android';

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  component: React.ComponentType<any>;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  os?: OSName;
}

export interface App {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType<any>;
  defaultSize?: { width: number; height: number };
  showInTaskbar?: boolean;
}

export interface OSContextType {
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
  currentOS: OSName;
  setCurrentOS: (os: OSName) => void;
  activeWindowId: string | null;
  availableApps: App[];
}