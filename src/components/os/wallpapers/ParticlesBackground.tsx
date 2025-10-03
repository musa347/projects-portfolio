import { useCallback } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

const osColors: Record<string, string[]> = {
  windows: ['#2563eb', '#8b5cf6', '#10b981'],
  mac: ['#f87171', '#fbbf24', '#34d399'],
  linux: ['#f59e42', '#10b981', '#64748b'],
  default: ['#2563eb', '#8b5cf6', '#10b981'],
};

const ParticlesBackground = ({ os = 'default' }: { os?: string }) => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          color: { value: osColors[os] || osColors.default },
          links: {
            color: (osColors[os] && osColors[os][0]) || '#2563eb',
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: { default: 'bounce' },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: { enable: true, area: 800 },
            value: 50,
          },
          opacity: { value: 0.5 },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
      }}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '300px',
        maxHeight: '100vh',
      }}
    />
  );
};

export default ParticlesBackground;