"use client";
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  // Global routes that should render the Master Brand / Opera Grand Hotel Footer
  const globalRoutes = [
    '/',
    '/about',
    '/brands',
    '/contact',
    '/destinations',
    '/gallery',
    '/news-media',
    '/offers',
    '/future-developments',
    '/press-release',
    '/terms-conditions',
    '/terms-and-conditions',
    '/privacy-policy',
    '/privacy-statement',
  ];
  const isGlobal = globalRoutes.includes(pathname) || globalRoutes.some(route => pathname.startsWith(route + '/'));
  
  if (!isGlobal) {
    return null; // Hotel pages will render their own footer
  }

  return <Footer />;
}