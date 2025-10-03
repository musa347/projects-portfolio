import { OSName } from '../types/os';
import React from 'react';

// Import wallpaper components
import OSWallpaper from '../components/os/wallpapers/OSWallpaper';
import InteractiveBackground from '../components/os/wallpapers/InteractiveBackground';
import ParticlesBackground from '../components/os/wallpapers/ParticlesBackground';

// Wallpaper URLs for different OSes
export const WALLPAPER_URLS = {
  macos: 'https://www.google.com/url?sa=i&url=https%3A%2F%2F512pixels.net%2Fprojects%2Fdefault-mac-wallpapers-in-5k%2F&psig=AOvVaw0qQDFWE0naTs6ePqZPakUv&ust=1758639432398000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOCVt9jQ7I8DFQAAAAAdAAAAABAE',
  windows: 'https://4kwallpapers.com/images/wallpapers/windows-11-dark-mode-stock-official-3840x2400-5630.jpg',
  ios: 'https://www.apple.com/v/iphone-13-pro/c/images/overview/design/finish_iphone13pro__f0j8v4x5xrq2_large.jpg',
  android: 'https://storage.googleapis.com/phonebook-blog/2021/09/Android-12-wallpaper.jpg',
  default: 'https://www.apple.com/v/macos/ventura/ah/images/overview/hero/hero_macbook_air_m2_wallpaper__d3nqo7t4v5qe_large.jpg',
} as const;

interface WallpaperComponentProps {
  className?: string;
  style?: React.CSSProperties;
  os: OSName;
}

type WallpaperItem = {
  id: string;
  name: string;
  component: React.ComponentType<WallpaperComponentProps>;
  url?: string;
};

// Base wallpapers (non-OS specific)
const baseWallpapers: WallpaperItem[] = [
  {
    id: 'os-default',
    name: 'OS Default',
    component: OSWallpaper,
  },
  {
    id: 'interactive',
    name: 'Interactive',
    component: InteractiveBackground as React.ComponentType<WallpaperComponentProps>,
  },
  {
    id: 'particles',
    name: 'Particles',
    component: ParticlesBackground as React.ComponentType<WallpaperComponentProps>,
  },
];

// Get OS-specific wallpaper URL
export const getOSWallpaper = (os: OSName): string => {
  const key = (['macos', 'windows', 'ios', 'android'] as const).includes(os as any)
    ? (os as 'macos' | 'windows' | 'ios' | 'android')
    : 'default';
  return WALLPAPER_URLS[key];
};

export const getWallpapers = (os: OSName): WallpaperItem[] => {
  const osWallpaper: WallpaperItem = {
    id: 'os-default',
    name: 'OS Default',
    component: OSWallpaper,
    url: getOSWallpaper(os),
  };

  return [osWallpaper, ...baseWallpapers];
};

export const defaultWallpaper = baseWallpapers[0];