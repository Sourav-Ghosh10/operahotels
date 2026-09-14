"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import ArabicFooter from './ArabicFooter';

type Locale = 'en' | 'ar';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('app_locale') as Locale;
        if (saved === 'en' || saved === 'ar') {
          setLocale(saved);
        }
      } catch (err) {}
    }

    const handleLocaleChange = (e: Event) => {
      const next = (e as CustomEvent<Locale>).detail;
      if (next === 'en' || next === 'ar') {
        setLocale(next);
      }
    };

    window.addEventListener('locale-change', handleLocaleChange);
    window.addEventListener('destination-locale-change', handleLocaleChange);
    return () => {
      window.removeEventListener('locale-change', handleLocaleChange);
      window.removeEventListener('destination-locale-change', handleLocaleChange);
    };
  }, []);

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
    return null;
  }

  return locale === 'ar' ? <ArabicFooter /> : <Footer />;
}
