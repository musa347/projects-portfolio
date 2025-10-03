import React from 'react';
import { useOS } from '../../contexts/OSContext';

import { OSName } from '../../types/os';

interface WindowControlsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized?: boolean;
  className?: string;
  os?: OSName;
}

const WindowControls: React.FC<WindowControlsProps> = ({
  onClose,
  onMinimize,
  onMaximize,
  isMaximized = false,
  className = '',
  os
}) => {
  const { currentOS } = useOS();

  const renderWindowsControls = () => (
    <div className="flex items-center h-full">
      <button
        onClick={onMinimize}
        className="w-12 h-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Minimize"
      >
        <span className="w-4 h-0.5 bg-gray-700 dark:bg-gray-200" />
      </button>
      <button
        onClick={onMaximize}
        className="w-12 h-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label={isMaximized ? "Restore" : "Maximize"}
      >
        <div className="w-4 h-4 border border-gray-700 dark:border-gray-200 flex items-center justify-center">
          {isMaximized ? (
            <span className="w-2 h-2 border-t border-l border-gray-700 dark:border-gray-200 -mt-1 -ml-1" />
          ) : (
            <span className="w-2 h-2 border border-gray-700 dark:border-gray-200" />
          )}
        </div>
      </button>
      <button
        onClick={onClose}
        className="w-12 h-full flex items-center justify-center hover:bg-red-500 hover:text-white"
        aria-label="Close"
      >
        <span className="w-4 h-0.5 bg-gray-700 dark:bg-gray-200 transform rotate-45 absolute" />
        <span className="w-4 h-0.5 bg-gray-700 dark:bg-gray-200 transform -rotate-45" />
      </button>
    </div>
  );

  const renderMacOSControls = () => (
    <div className="flex items-center h-full space-x-2 px-2">
      <button
        onClick={onClose}
        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"
        aria-label="Close"
      />
      <button
        onClick={onMinimize}
        className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600"
        aria-label="Minimize"
      />
      <button
        onClick={onMaximize}
        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600"
        aria-label={isMaximized ? "Restore" : "Maximize"}
      />
    </div>
  );

  const renderLinuxControls = () => (
    <div className="flex items-center h-full space-x-2 px-2">
      <button
        onClick={onClose}
        className="w-3.5 h-3.5 rounded-sm bg-red-500 hover:bg-red-600 flex items-center justify-center"
        aria-label="Close"
      >
        <span className="text-white text-xs font-bold">×</span>
      </button>
      <button
        onClick={onMinimize}
        className="w-3.5 h-3.5 rounded-sm bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
        aria-label="Minimize"
      >
        <span className="text-white text-xs font-bold">_</span>
      </button>
      <button
        onClick={onMaximize}
        className="w-3.5 h-3.5 rounded-sm bg-green-500 hover:bg-green-600 flex items-center justify-center"
        aria-label={isMaximized ? "Restore" : "Maximize"}
      >
        <span className="text-white text-xs font-bold">□</span>
      </button>
    </div>
  );

  const controls = {
    windows: renderWindowsControls(),
    macos: renderMacOSControls(),
    linux: renderLinuxControls(),
    ios: renderMacOSControls(), // iOS uses similar controls to macOS
    android: renderLinuxControls(), // Android uses similar controls to Linux
  };

  const resolvedOS = os ?? currentOS;
  return (
    <div className={`window-controls ${className}`}>
      {controls[resolvedOS] || controls.windows}
    </div>
  );
};

export default WindowControls;
