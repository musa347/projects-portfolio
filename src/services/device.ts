import { OSName } from '../types/os';

export const getOperatingSystem = (): OSName => {
  if (typeof window === 'undefined') return 'macos'; // Default for SSR

  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const userAgentData = (navigator as any).userAgentData;

  // Check for Windows first
  if (/Win(dows|32|64|CE|NT|10|11)/i.test(platform) || /Win(dows|32|64|CE|NT|10|11)/i.test(userAgent)) {
    return 'windows';
  }

  // Check for macOS
  if (/Mac/i.test(platform) || /Macintosh|MacIntel|MacPPC|Mac68K/i.test(userAgent)) {
    return 'macos';
  }

  // Check for iOS (iPhone, iPad, iPod)
  if (/(iPhone|iPod|iPad)/i.test(userAgent) || (platform === 'MacIntel' && 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 2)) {
    return 'ios';
  }

  // Check for Android
  if (/Android/i.test(userAgent)) {
    return 'android';
  }

  // Use userAgentData if available (modern browsers)
  if (userAgentData) {
    const platform = userAgentData.platform.toLowerCase();
    if (platform.includes('windows')) return 'windows';
    if (platform.includes('macos') || platform.includes('mac') || platform.includes('os x')) return 'macos';
    if (platform.includes('android')) return 'android';
    if (platform.includes('ios') || platform.includes('iphone') || platform.includes('ipad')) return 'ios';
  }

  // Fallback to checking platform string
  if (platform) {
    if (/Win/i.test(platform)) return 'windows';
    if (/Mac/i.test(platform)) return 'macos';
    if (/(iPhone|iPod|iPad)/i.test(platform)) return 'ios';
    if (/Android/i.test(platform)) return 'android';
    if (/Linux/i.test(platform)) return 'android'; // Many Linux users are on Android
  }

  // Default to macOS
  return 'macos';
};

// Additional device information utility
export const getDeviceInfo = () => {
  const os = getOperatingSystem();
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(navigator.userAgent);
  const isDesktop = !isMobile && !isTablet;

  return {
    os,
    isMobile,
    isTablet,
    isDesktop,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      pixelRatio: window.devicePixelRatio || 1,
    },
  };
};