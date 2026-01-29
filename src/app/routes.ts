import { createBrowserRouter } from 'react-router';
import { Home } from '@/app/pages/Home';
import { ComprarOnline } from '@/app/pages/ComprarOnline';
import { Aniversarios } from '@/app/pages/Aniversarios';
import { DuvidasFrequentes } from '@/app/pages/DuvidasFrequentes';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Home,
    },
    {
      path: '/compre-online',
      Component: ComprarOnline,
    },
    {
      path: '/aniversarios',
      Component: Aniversarios,
    },
    {
      path: '/duvidas-frequentes',
      Component: DuvidasFrequentes,
    },
  ],
  {
    // Vite injects BASE_URL based on config.base (and/or --base).
    // This makes the router work under subpaths like /gobigger/.
    basename: import.meta.env.BASE_URL,
  },
);
