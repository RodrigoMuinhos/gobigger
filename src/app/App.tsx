import { RouterProvider } from 'react-router';
import { router } from '@/app/routes';
import { FloatingElements } from '@/app/components/FloatingElements';
import { useEffect } from 'react';

function getForcedModeFromUrl(): 'totem' | null {
  try {
    const url = new URL(window.location.href);
    const mode = url.searchParams.get('mode')?.toLowerCase();
    if (mode === 'totem') return 'totem';

    const totem = url.searchParams.get('totem')?.toLowerCase();
    if (totem === '1' || totem === 'true' || totem === 'yes') return 'totem';
  } catch {
    // ignore
  }

  return null;
}

function shouldEnableTotemMode(): boolean {
  // “Totem” típico: telas grandes em retrato (kiosk), com bastante altura.
  // Também dá para forçar via URL: ?mode=totem (ou ?totem=1)
  const forced = getForcedModeFromUrl();
  if (forced === 'totem') return true;

  if (typeof window === 'undefined') return false;

  const isPortrait = window.matchMedia?.('(orientation: portrait)')?.matches ?? window.innerHeight >= window.innerWidth;
  const minPortraitForTotem = window.innerWidth >= 900 && window.innerHeight >= 1200;
  return isPortrait && minPortraitForTotem;
}

export default function App() {
  useEffect(() => {
    const apply = () => {
      const isTotem = shouldEnableTotemMode();
      document.documentElement.dataset.mode = isTotem ? 'totem' : 'default';
    };

    apply();
    window.addEventListener('resize', apply);
    window.addEventListener('orientationchange', apply);
    return () => {
      window.removeEventListener('resize', apply);
      window.removeEventListener('orientationchange', apply);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFF0F5] to-[#F0F8FF] relative">
      <FloatingElements />
      <div className="relative z-10">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
