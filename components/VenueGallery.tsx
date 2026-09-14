"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { resolveImageUrl } from '@/services/api';

interface VenueGalleryProps {
    title: string;
    gallery: string[];
    fallbackImage?: string;
}

export default function VenueGallery({ title, gallery, fallbackImage }: VenueGalleryProps) {
    const [mounted, setMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const isOpen = activeIndex !== null;
    const total = gallery.length;

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleOpen = (index: number) => {
        setActiveIndex(index);
    };

    const handleClose = useCallback(() => {
        setActiveIndex(null);
    }, []);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setActiveIndex((prev) => (prev !== null ? (prev === 0 ? total - 1 : prev - 1) : null));
    }, [total]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setActiveIndex((prev) => (prev !== null ? (prev === total - 1 ? 0 : prev + 1) : null));
    }, [total]);

    // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose, handlePrev, handleNext]);

    if (!gallery || gallery.length === 0) {
        return null;
    }

    const currentImgUrl = activeIndex !== null ? resolveImageUrl(gallery[activeIndex]) : '';

    const lightboxModal = isOpen && mounted ? (
        <div
            className="venue-lightbox-backdrop"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.92)',
                zIndex: 999999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                backdropFilter: 'blur(5px)',
                animation: 'venueFadeIn 0.2s ease-out'
            }}
        >
            {/* Close Button */}
            <button
                type="button"
                className="venue-lightbox-close"
                onClick={handleClose}
                aria-label="Close Lightbox"
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '24px',
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '36px',
                    lineHeight: '1',
                    cursor: 'pointer',
                    zIndex: 20,
                    opacity: 0.85,
                    transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.85'}
            >
                &times;
            </button>

            {/* Counter pill */}
            <div
                style={{
                    position: 'absolute',
                    top: '24px',
                    left: '24px',
                    color: '#ffffff',
                    fontSize: '14px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    padding: '6px 14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    borderRadius: '20px',
                    zIndex: 20
                }}
            >
                {activeIndex !== null ? activeIndex + 1 : 1} / {total}
            </div>

            {/* Main Image Container */}
            <div
                className="venue-lightbox-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: '90vw',
                    maxHeight: '82vh',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'venueZoomIn 0.2s ease-out'
                }}
            >
                <img
                    src={currentImgUrl}
                    alt={`${title} - Photo ${(activeIndex ?? 0) + 1}`}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '80vh',
                        objectFit: 'contain',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                        borderRadius: '4px'
                    }}
                />

                {/* Previous Navigation Arrow */}
                {total > 1 && (
                    <button
                        type="button"
                        aria-label="Previous Photo"
                        onClick={handlePrev}
                        style={{
                            position: 'absolute',
                            left: '-60px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(20, 20, 20, 0.75)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            zIndex: 10
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#b89855';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(20, 20, 20, 0.75)';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                )}

                {/* Next Navigation Arrow */}
                {total > 1 && (
                    <button
                        type="button"
                        aria-label="Next Photo"
                        onClick={handleNext}
                        style={{
                            position: 'absolute',
                            right: '-60px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(20, 20, 20, 0.75)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            zIndex: 10
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#b89855';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(20, 20, 20, 0.75)';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {total > 1 && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '0 20px',
                        overflowX: 'auto',
                        zIndex: 10
                    }}
                >
                    {gallery.map((thumb, tIdx) => {
                        const isCur = tIdx === activeIndex;
                        return (
                            <button
                                key={tIdx}
                                type="button"
                                aria-label={`Go to photo ${tIdx + 1}`}
                                onClick={() => setActiveIndex(tIdx)}
                                style={{
                                    width: '64px',
                                    height: '46px',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    border: isCur ? '2.5px solid #e2be7d' : '1px solid rgba(255,255,255,0.3)',
                                    opacity: isCur ? 1 : 0.6,
                                    transform: isCur ? 'scale(1.08)' : 'scale(1)',
                                    transition: 'all 0.2s ease',
                                    padding: 0,
                                    backgroundColor: '#000',
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                <img
                                    src={resolveImageUrl(thumb)}
                                    alt=""
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    ) : null;

    return (
        <div className="mt-5 pt-4 border-top venue-gallery-container">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: 0, color: '#1a1a1a' }}>
                        Venue Gallery
                    </h3>
                    <p className="text-muted small mt-1 mb-0">Click any photo to view in high resolution</p>
                </div>
                <span className="badge px-3 py-2" style={{ backgroundColor: '#b89855', color: '#fff', fontSize: '0.8rem', letterSpacing: '1px' }}>
                    {total} {total === 1 ? 'PHOTO' : 'PHOTOS'}
                </span>
            </div>

            <div className="row g-3">
                {gallery.map((img, idx) => (
                    <div key={idx} className="col-12 col-sm-6 col-md-4">
                        <div
                            className="venue-gallery-card position-relative overflow-hidden"
                            style={{
                                height: '200px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                            }}
                            onClick={() => handleOpen(idx)}
                        >
                            <img
                                src={resolveImageUrl(img)}
                                alt={`${title} - Gallery Photo ${idx + 1}`}
                                className="w-100 h-100 gallery-thumb-img"
                                style={{
                                    objectFit: 'cover',
                                    transition: 'transform 0.4s ease'
                                }}
                            />
                            {/* Hover overlay with zoom icon */}
                            <div
                                className="position-absolute inset-0 w-100 h-100 d-flex align-items-center justify-content-center gallery-hover-overlay"
                                style={{
                                    top: 0,
                                    left: 0,
                                    backgroundColor: 'rgba(9, 50, 102, 0.55)',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease'
                                }}
                            >
                                <div
                                    style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '50%',
                                        backgroundColor: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#093266',
                                        transform: 'scale(0.9)',
                                        transition: 'transform 0.2s ease'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        <line x1="11" y1="8" x2="11" y2="14"></line>
                                        <line x1="8" y1="11" x2="14" y2="11"></line>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Portal Lightbox */}
            {lightboxModal && createPortal(lightboxModal, document.body)}

            {/* Micro-animations CSS */}
            <style jsx>{`
                .venue-gallery-card:hover .gallery-thumb-img {
                    transform: scale(1.06);
                }
                .venue-gallery-card:hover .gallery-hover-overlay {
                    opacity: 1 !important;
                }
                @keyframes venueFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes venueZoomIn {
                    from { transform: scale(0.94); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @media (max-width: 768px) {
                    .venue-lightbox-backdrop button[aria-label="Previous Photo"] {
                        left: 8px !important;
                    }
                    .venue-lightbox-backdrop button[aria-label="Next Photo"] {
                        right: 8px !important;
                    }
                }
            `}</style>
        </div>
    );
}