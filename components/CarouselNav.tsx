import React from 'react';

interface CarouselNavProps {
    onPrev?: () => void;
    onNext?: () => void;
    className?: string; // e.g. "offers-carousel-nav d-flex justify-content-center align-items-center mt-5 gap-5"
}

export default function CarouselNav({ onPrev, onNext, className = '' }: CarouselNavProps) {
    return (
        <div className={className}>
            <button className="offers-nav-btn prev-btn" type="button" aria-label="Previous" onClick={onPrev}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="20" y1="12" x2="4" y2="12" />
                    <polyline points="10 18 4 12 10 6" />
                </svg>
            </button>
            <button className="offers-nav-btn next-btn" type="button" aria-label="Next" onClick={onNext}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <polyline points="14 6 20 12 14 18" />
                </svg>
            </button>
        </div>
    );
}
