import { OSName } from '../../../types/os';

// Import default wallpapers
import MacWallpaper from '../../../assets/macos-wallpaper.jpg';
import MacOSVector from './MacOSVector';
import Windows11Vector from './Windows11Vector';
import IosWallpaper from '../../../assets/ios-wallpaper.svg';
import AndroidWallpaper from '../../../assets/android-wallpaper.svg';

// Fallback wallpapers if SVGs are not available
const defaultWallpapers = {
  macos: 'https://www.apple.com/v/macos/ventura/ah/images/overview/hero/hero_macbook_air_m2_wallpaper__d3nqo7t4v5qe_large.jpg',
  windows: 'https://4kwallpapers.com/images/wallpapers/windows-11-dark-mode-stock-official-3840x2400-5630.jpg',
  ios: 'https://www.apple.com/v/iphone-13-pro/c/images/overview/design/finish_iphone13pro__f0j8v4x5xrq2_large.jpg',
  android: 'https://storage.googleapis.com/phonebook-blog/2021/09/Android-12-wallpaper.jpg',
  default: 'https://www.apple.com/v/macos/ventura/ah/images/overview/hero/hero_macbook_air_m2_wallpaper__d3nqo7t4v5qe_large.jpg',
};

interface OSWallpaperProps {
  className?: string;
  style?: React.CSSProperties;
  os: OSName; // Made this required since it's now passed from the parent
}

const OSWallpaper: React.FC<OSWallpaperProps> = ({ 
  className = '', 
  style = {}, 
  os = 'macos' 
}) => {
  // Get the appropriate wallpaper component based on OS
  const getWallpaperComponent = () => {
    try {
      switch (os) {
        case 'macos':
          // Use scalable vector wallpaper for crisp rendering
          return <MacOSVector />;
        case 'windows':
          // Use scalable vector wallpaper for crisp rendering at any resolution
          return <Windows11Vector />;
        case 'ios':
          return IosWallpaper || defaultWallpapers.ios;
        case 'android':
          return AndroidWallpaper || defaultWallpapers.android;
        default:
          return defaultWallpapers.default;
      }
    } catch (error) {
      console.error('Error loading wallpaper component:', error);
      const fallbackMap: Record<'macos' | 'windows' | 'ios' | 'android', string> = {
        macos: defaultWallpapers.macos,
        windows: defaultWallpapers.windows,
        ios: defaultWallpapers.ios,
        android: defaultWallpapers.android,
      };
      return fallbackMap[(os as 'macos' | 'windows' | 'ios' | 'android')] || defaultWallpapers.default;
    }
  };

  const wallpaper = getWallpaperComponent();
  const isSvg = typeof wallpaper === 'object' && 'type' in wallpaper;

  return (
    <div 
      className={`wallpaper-wrapper ${className}`}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', ...style }}
    >
      {isSvg ? (
        <div style={{ width: '100%', height: '100%' }}>
          {wallpaper}
        </div>
      ) : (
        <img 
          src={wallpaper} 
          alt={`${os} wallpaper`} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            // Fallback to default if image fails to load
            const keyMap: Record<OSName, 'macos' | 'windows' | 'ios' | 'android' | 'default'> = {
              macos: 'macos',
              windows: 'windows',
              ios: 'ios',
              android: 'android',
              linux: 'default',
            };
            (e.target as HTMLImageElement).src = defaultWallpapers[keyMap[os]];
          }}
        />
      )}
    </div>
  );
};

export default OSWallpaper;
