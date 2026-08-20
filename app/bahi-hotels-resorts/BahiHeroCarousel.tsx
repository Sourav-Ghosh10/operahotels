'use client';

import { useEffect, useRef } from 'react';

export default function BahiHeroCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    const checkAndInit = () => {
      // @ts-ignore
      if (window.bootstrap) {
        if (!mounted || !carouselRef.current) return;
        // @ts-ignore
        instanceRef.current = new window.bootstrap.Carousel(carouselRef.current, {
          interval: 5000,
          ride: 'carousel',
          pause: false,
          wrap: true,
        });
        instanceRef.current.cycle();
      } else {
        setTimeout(checkAndInit, 100);
      }
    };
    checkAndInit();
    return () => {
      mounted = false;
      instanceRef.current?.dispose();
    };
  }, []);

  const slideTo = (dir: 'prev' | 'next') => {
    instanceRef.current?.[dir]();
  };

  return (
    <div
      ref={carouselRef}
      className="carousel slide carousel-fade position-absolute w-100 h-100 top-0 start-0"
      style={{ zIndex: 0 }}
    >
      <div className="carousel-inner h-100">
        <div className="carousel-item h-100 active">
          <div
            className="slider-image w-100 h-100"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <div className="carousel-item h-100">
          <div
            className="slider-image w-100 h-100"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <div className="carousel-item h-100">
          <div
            className="slider-image w-100 h-100"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev custom-carousel-control"
        type="button"
        onClick={() => slideTo('prev')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="20" y1="12" x2="4" y2="12" />
          <polyline points="10 18 4 12 10 6" />
        </svg>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next custom-carousel-control"
        type="button"
        onClick={() => slideTo('next')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="12" x2="20" y2="12" />
          <polyline points="14 6 20 12 14 18" />
        </svg>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
