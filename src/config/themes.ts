import { OSName } from '../types/os';

export interface OSTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  borderRadius: string;
  fontFamily: string;
  text: {
    primary: string;
  };
  colors: {
    primary: string;
  };
  typography: {
    fontFamily: string;
  };
  window: {
    headerHeight: string;
    borderWidth: string;
    borderColor: string;
    boxShadow: string;
    shadow: string;
    bg: string;
    borderRadius: string;
  };
  taskbar: {
    height: string;
    backgroundColor: string;
    itemHoverColor: string;
  };
}

const themes: Record<OSName, OSTheme> = {
  windows: {
    primaryColor: '#2563eb',
    secondaryColor: '#1d4ed8',
    backgroundColor: '#f3f3f3',
    textColor: '#000000',
    accentColor: '#2563eb',
    borderRadius: '8px',
    fontFamily: 'Segoe UI Variable, Segoe UI, system-ui, sans-serif',
    text: {
      primary: '#000000'
    },
    colors: {
      primary: '#2563eb'
    },
    typography: {
      fontFamily: 'Segoe UI Variable, Segoe UI, system-ui, sans-serif'
    },
    window: {
      headerHeight: '32px',
      borderWidth: '1px',
      borderColor: '#d6d6d6',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
      shadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
      bg: '#ffffff',
      borderRadius: '8px'
    },
    taskbar: {
      height: '48px',
      backgroundColor: 'rgba(250, 250, 250, 0.7)',
      itemHoverColor: '#e5e5e5'
    }
  },
  macos: {
    primaryColor: '#007AFF',
    secondaryColor: '#0A84FF',
    backgroundColor: '#f0f0f0',
    textColor: '#000000',
    accentColor: '#007AFF',
    borderRadius: '10px',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    text: {
      primary: '#000000'
    },
    colors: {
      primary: '#007AFF'
    },
    typography: {
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    },
    window: {
      headerHeight: '28px',
      borderWidth: '1px',
      borderColor: '#d0d0d0',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      shadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      bg: '#f5f5f5',
      borderRadius: '10px'
    },
    taskbar: {
      height: '58px',
      backgroundColor: 'rgba(240, 240, 240, 0.8)',
      itemHoverColor: 'rgba(200, 200, 200, 0.5)'
    }
  },
  linux: {
    primaryColor: '#3584e4',
    secondaryColor: '#1a5fb4',
    backgroundColor: '#f6f5f4',
    textColor: '#241f31',
    accentColor: '#3584e4',
    borderRadius: '6px',
    fontFamily: 'Cantarell, Ubuntu, sans-serif',
    text: {
      primary: '#241f31'
    },
    colors: {
      primary: '#3584e4'
    },
    typography: {
      fontFamily: 'Cantarell, Ubuntu, sans-serif'
    },
    window: {
      headerHeight: '36px',
      borderWidth: '1px',
      borderColor: '#c0bfbc',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      shadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      bg: '#ffffff',
      borderRadius: '6px'
    },
    taskbar: {
      height: '48px',
      backgroundColor: '#f6f5f4',
      itemHoverColor: '#e0e0e0'
    }
  },
  // Default theme (used as fallback)
  ios: {
    primaryColor: '#007AFF',
    secondaryColor: '#0A84FF',
    backgroundColor: '#f2f2f7',
    textColor: '#000000',
    accentColor: '#007AFF',
    borderRadius: '12px',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    text: {
      primary: '#000000'
    },
    colors: {
      primary: '#007AFF'
    },
    typography: {
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    },
    window: {
      headerHeight: '44px',
      borderWidth: '1px',
      borderColor: '#d1d1d6',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      shadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      bg: '#ffffff',
      borderRadius: '12px'
    },
    taskbar: {
      height: '49px',
      backgroundColor: '#f8f8f8',
      itemHoverColor: '#e5e5ea'
    }
  },
  android: {
    primaryColor: '#1a73e8',
    secondaryColor: '#0d62ff',
    backgroundColor: '#f5f5f5',
    textColor: '#202124',
    accentColor: '#1a73e8',
    borderRadius: '8px',
    fontFamily: 'Roboto, sans-serif',
    text: {
      primary: '#202124'
    },
    colors: {
      primary: '#1a73e8'
    },
    typography: {
      fontFamily: 'Roboto, sans-serif'
    },
    window: {
      headerHeight: '56px',
      borderWidth: '1px',
      borderColor: '#dadce0',
      boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
      shadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
      bg: '#ffffff',
      borderRadius: '8px'
    },
    taskbar: {
      height: '56px',
      backgroundColor: '#ffffff',
      itemHoverColor: '#f1f3f4'
    }
  }
};

export const getThemeForOS = (os: OSName): OSTheme => {
  return themes[os] || themes.windows; // Default to Windows theme if OS not found
};
