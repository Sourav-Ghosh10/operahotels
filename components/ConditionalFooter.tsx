"use client";
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  // We assume that if the path has a hotel slug (e.g., /test-hote or /test-hote/special-offers/...)
  // it should not show the global footer, because the hotel pages will provide their own HotelFooter.
  // For now, we will hide it if the path has more than 1 segment and isn't a known global route, 
  // or simply hide it if it contains '/special-offers/'.
  // Actually, we can just check if pathname doesn't match our known global pages.
  const globalRoutes = ['/', '/about', '/brands', '/contact', '/destinations', '/gallery', '/news-media', '/offers'];
  const isGlobal = globalRoutes.includes(pathname) || globalRoutes.some(route => pathname.startsWith(route + '/'));
  
  if (!isGlobal) {
    return null; // Hotel pages will render their own footer
  }

  return <Footer />;
}
