"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from '@/components/Header';
import OurBrandsBar from '@/components/OurBrandsBar';
import { getPageData } from '@/services/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

function resolveImageUrl(img: string | undefined | null): string {
    if (!img) return '';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    const clean = img.replace(/^\/?(storage\/|uploads\/)?/, '');
    return `${API_BASE}/uploads/${clean}`;
}

// Pre-decode next batch of images in browser memory for instant smooth reveal
function preloadBatchImages(items: { image: string }[]): Promise<void[]> {
    return Promise.all(
        items.map(
            (item) =>
                new Promise<void>((resolve) => {
                    const src = resolveImageUrl(item.image);
                    if (!src) {
                        resolve();
                        return;
                    }
                    const img = new Image();
                    img.src = src;
                    if (img.complete) {
                        resolve();
                    } else {
                        img.onload = () => resolve();
                        img.onerror = () => resolve();
                    }
                })
        )
    );
}

interface GalleryItem {
    hotel_name: string;
    title: string;
    image: string;
}

const DEFAULT_CATEGORIES = [
    "All",
    "Corp Amman Hotel",
    "Coral Beach Resort Sharjah",
    "Bahi Ajman Palace Hotel",
    "ECOS Dubai Hotel at Al Furjan",
    "Coral Dubai Deira Hotel",
    "Coral Jubail Hotel"
];

const DEFAULT_BANNER_SLIDES = [
    { image: 'gallery_banner_1.jpg', title: 'Gallery', subtitle: 'HMH Hospitality Management Holding' },
    { image: 'gallery_banner_2.jpg', title: 'Gallery', subtitle: 'Bahi Ajman Palace Hotel' },
    { image: 'gallery_banner_3.jpg', title: 'Gallery', subtitle: 'Coral Beach Resort Sharjah' },
    { image: 'gallery_banner_4.jpg', title: 'Gallery', subtitle: 'Corp Amman Hotel' },
    { image: 'gallery_banner_5.jpg', title: 'Gallery', subtitle: 'ECOS Dubai Hotel at Al Furjan' },
    { image: 'gallery_banner_6.jpg', title: 'Gallery', subtitle: 'Coral Dubai Deira Hotel' },
    { image: 'gallery_banner_7.jpg', title: 'Gallery', subtitle: 'HMH Properties' },
];

const BATCH_SIZE = 24;

export default function GalleryPage() {
    const [pageData, setPageData] = useState<any>(null);
    const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [activeBannerSlide, setActiveBannerSlide] = useState<number>(0);
    const [displayCount, setDisplayCount] = useState<number>(BATCH_SIZE);
    const [previousCount, setPreviousCount] = useState<number>(0);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [isTabSwitching, setIsTabSwitching] = useState<boolean>(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
    const gridRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let isMounted = true;
        async function fetchGallery() {
            try {
                const res = await getPageData('gallery');
                if (res) {
                    let bodyData = res.body;
                    if (typeof bodyData === 'string') {
                        try { bodyData = JSON.parse(bodyData); } catch (e) {}
                    }
                    if (isMounted) {
                        setPageData({ ...res, body: bodyData });
                        if (bodyData?.categories && Array.isArray(bodyData.categories) && bodyData.categories.length > 0) {
                            setCategories(bodyData.categories);
                        }
                        if (bodyData?.gallery_items && Array.isArray(bodyData.gallery_items) && bodyData.gallery_items.length > 0) {
                            setItems(bodyData.gallery_items);
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to load gallery page data:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchGallery();
        return () => { isMounted = false; };
    }, []);

    const body = pageData?.body || {};

    // Determine banner slides
    const bannerSlides = Array.isArray(body.banner_slides) && body.banner_slides.length > 0
        ? body.banner_slides
        : (Array.isArray(body.banner_images) && body.banner_images.length > 0
            ? body.banner_images.map((img: string, i: number) => ({
                image: img,
                title: body.intro_title || 'Gallery',
                subtitle: body.intro_subtitle || DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length] || 'Hospitality Management Holding'
            }))
            : DEFAULT_BANNER_SLIDES);

    // Auto-advance banner slides
    useEffect(() => {
        if (bannerSlides.length <= 1) return;
        const timer = setInterval(() => {
            setActiveBannerSlide((prev) => (prev + 1) % bannerSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [bannerSlides.length]);

    const prevBannerSlide = () => {
        setActiveBannerSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
    };

    const nextBannerSlide = () => {
        setActiveBannerSlide((prev) => (prev + 1) % bannerSlides.length);
    };

    const currentSlide = bannerSlides[activeBannerSlide] || bannerSlides[0];
    const heroTitle = currentSlide?.title || (typeof pageData?.title === 'object' ? pageData?.title?.en : pageData?.title) || 'Gallery';
    const heroSubtitle = currentSlide?.subtitle || body.intro_subtitle || 'Hospitality Management Holding';

    const introSubtitle = body.intro_subtitle || 'HMH Hospitality Management Holding';
    const introTitle = body.intro_title || 'Photo Gallery';
    const introText = body.intro_text ||
        'Immerse yourself in the luxury, comfort, and distinct character of our properties across the MENA region.';

    // Filter items based on active category
    const filteredItems = React.useMemo(() => {
        if (activeCategory === "All") {
            return items;
        }
        return items.filter(item => {
            const hName = (item.hotel_name || '').toLowerCase().trim();
            const catName = activeCategory.toLowerCase().trim();
            return hName === catName || hName.includes(catName) || catName.includes(hName);
        });
    }, [items, activeCategory]);

    // Handle tab change with smooth cross-fade
    const handleCategorySelect = (cat: string) => {
        if (cat === activeCategory || isTabSwitching) return;
        setIsTabSwitching(true);
        setTimeout(() => {
            setActiveCategory(cat);
            setDisplayCount(BATCH_SIZE);
            setPreviousCount(0);
            setLoadedImages({});
            setIsTabSwitching(false);
        }, 150);
    };

    const visibleItems = filteredItems.slice(0, displayCount);
    const hasMore = displayCount < filteredItems.length;
    const remainingCount = Math.max(0, filteredItems.length - displayCount);
    const progressPercent = filteredItems.length > 0 
        ? Math.min(100, Math.round((visibleItems.length / filteredItems.length) * 100))
        : 0;

    // Ultra Smooth Pre-Decoded Load More Handler
    const handleLoadMore = useCallback(async () => {
        if (isLoadingMore || !hasMore) return;
        
        setIsLoadingMore(true);
        const currentCount = displayCount;
        setPreviousCount(currentCount);

        // Preload next batch in memory for instant high-FPS rendering
        const nextBatchItems = filteredItems.slice(currentCount, currentCount + BATCH_SIZE);
        const preloadPromise = preloadBatchImages(nextBatchItems);
        const minWaitPromise = new Promise((resolve) => setTimeout(resolve, 380));

        await Promise.all([preloadPromise, minWaitPromise]);

        setDisplayCount((prev) => Math.min(prev + BATCH_SIZE, filteredItems.length));
        setIsLoadingMore(false);
    }, [isLoadingMore, hasMore, displayCount, filteredItems]);

    const handleImageLoaded = (idx: number) => {
        setLoadedImages(prev => ({ ...prev, [idx]: true }));
    };

    // Lightbox navigation handlers
    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = useCallback(() => {
        setLightboxIndex(null);
        document.body.style.overflow = 'auto';
    }, []);

    const nextLightbox = useCallback(() => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
        }
    }, [lightboxIndex, filteredItems.length]);

    const prevLightbox = useCallback(() => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
        }
    }, [lightboxIndex, filteredItems.length]);

    // Keyboard navigation for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextLightbox();
            if (e.key === 'ArrowLeft') prevLightbox();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, closeLightbox, nextLightbox, prevLightbox]);

    return (
        <main style={{ backgroundColor: '#ffffff' }}>
            {/* Stylesheets */}
            <link rel="stylesheet" href="/css/about.css" />
            <link rel="stylesheet" href="/css/gallery.css" />

            {/* ================= HERO BANNER SECTION ================= */}
            <header className="about-hero-section">
                <div className="about-hero-slider">
                    {bannerSlides.map((slide: any, idx: number) => {
                        const bgUrl = resolveImageUrl(slide.image);
                        return (
                            <div
                                key={idx}
                                className={`about-hero-slide ${idx === activeBannerSlide ? 'active' : ''}`}
                                style={{ backgroundImage: `url('${bgUrl}')` }}
                            />
                        );
                    })}
                </div>

                <div className="about-hero-overlay" />

                {/* Header Navigation */}
                <Header />

                {/* Hero Content */}
                <div className="about-hero-content container">
                    {heroSubtitle && (
                        <p className="about-hero-subtitle">{heroSubtitle}</p>
                    )}
                    <h1 className="about-hero-title">{heroTitle}</h1>
                </div>

                {/* Hero Arrows */}
                {bannerSlides.length > 1 && (
                    <>
                        <button className="about-hero-arrow about-hero-prev prev" onClick={prevBannerSlide} aria-label="Previous Slide">
                            <i className="fa-solid fa-chevron-left" />
                        </button>
                        <button className="about-hero-arrow about-hero-next next" onClick={nextBannerSlide} aria-label="Next Slide">
                            <i className="fa-solid fa-chevron-right" />
                        </button>

                        <div className="about-hero-dots">
                            {bannerSlides.map((_: any, idx: number) => (
                                <button
                                    key={idx}
                                    className={`about-hero-dot ${idx === activeBannerSlide ? 'active' : ''}`}
                                    onClick={() => setActiveBannerSlide(idx)}
                                    aria-label={`Slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </header>

            {/* ================= PAGE INTRO SECTION ================= */}
            <section className="about-intro-section" style={{ padding: '60px 20px 30px', textAlign: 'center', background: '#ffffff' }}>
                <div className="container" style={{ maxWidth: '920px', margin: '0 auto' }}>
                    {introSubtitle && (
                        <span className="about-section-subtitle" style={{ color: '#c29958', fontSize: '13px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                            {introSubtitle}
                        </span>
                    )}
                    <h2 className="about-section-title" style={{ fontSize: '2.5rem', fontWeight: 500, color: '#132a39', marginBottom: '18px' }}>
                        {introTitle}
                    </h2>
                    {introText && (
                        <p className="about-intro-text" style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#555555', margin: '0 auto' }}>
                            {introText}
                        </p>
                    )}
                </div>
            </section>

            {/* ================= FILTER TABS BAR ================= */}
            <section className="gallery-filters-wrapper">
                <div className="gallery-tabs-scroll">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`gallery-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => handleCategorySelect(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* ================= INFO / COUNTER BAR ================= */}
            <div className="gallery-info-bar">
                <div>
                    Hotel / Category: <span className="gallery-info-count">{activeCategory}</span>
                </div>
                <div>
                    Showing <span className="gallery-info-count">{visibleItems.length}</span> of {filteredItems.length} photos ({progressPercent}%)
                </div>
            </div>

            {/* Progress Track */}
            <div className="gallery-progress-track">
                <div className="gallery-progress-bar-bg">
                    <div 
                        className="gallery-progress-bar-fill" 
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            {/* ================= STABLE GRID GALLERY SECTION ================= */}
            <section className="gallery-grid-section">
                {loading && items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
                        <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: '#e88d24', marginBottom: '12px' }}></i>
                        <p>Loading photo gallery...</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                        <p>No photos available in this category.</p>
                    </div>
                ) : (
                    <div 
                        ref={gridRef}
                        className={`gallery-grid-layout ${isTabSwitching ? 'is-tab-switching' : ''}`}
                    >
                        {visibleItems.map((item, idx) => {
                            const imgSrc = resolveImageUrl(item.image);
                            const isLoaded = !!loadedImages[idx];
                            const isNewItem = idx >= previousCount;
                            // Staggered timing calculation for gentle cascading entrance
                            const staggerDelay = isNewItem ? Math.min((idx - previousCount) * 0.028, 0.45) : 0;

                            return (
                                <div
                                    key={idx}
                                    className={`gallery-card-item ${isNewItem ? 'animate-entrance' : ''}`}
                                    style={{ animationDelay: `${staggerDelay}s` }}
                                    onClick={() => openLightbox(idx)}
                                >
                                    <div className={`gallery-card-img-wrapper ${!isLoaded ? 'loading-skeleton' : ''}`}>
                                        <img
                                            src={imgSrc}
                                            alt={item.title || item.hotel_name}
                                            className={`gallery-card-img ${isLoaded ? 'loaded' : ''}`}
                                            loading="lazy"
                                            onLoad={() => handleImageLoaded(idx)}
                                        />
                                        <div className="gallery-card-overlay">
                                            <div className="gallery-card-icon">
                                                <i className="fa-solid fa-magnifying-glass-plus"></i>
                                            </div>
                                            <div className="gallery-card-hotel-badge">{item.hotel_name}</div>
                                            <h3 className="gallery-card-title">{item.title || item.hotel_name}</h3>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Throttled Load More Button */}
                {hasMore && (
                    <div className="gallery-load-more-container">
                        <button 
                            className={`gallery-load-more-btn ${isLoadingMore ? 'loading' : ''}`}
                            onClick={handleLoadMore}
                            disabled={isLoadingMore}
                            aria-label="Load more photos"
                        >
                            {isLoadingMore ? (
                                <>
                                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                                    <span>Loading Photos...</span>
                                </>
                            ) : (
                                <>
                                    <span>Load More Photos</span>
                                    <span className="gallery-remaining-badge">({remainingCount} Remaining)</span>
                                </>
                            )}
                        </button>
                    </div>
                )}
            </section>

            {/* ================= INTERACTIVE LIGHTBOX MODAL ================= */}
            {lightboxIndex !== null && filteredItems[lightboxIndex] && (
                <div
                    className="gallery-lightbox-backdrop"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeLightbox();
                    }}
                >
                    <button className="gallery-lightbox-close" onClick={closeLightbox} aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    {filteredItems.length > 1 && (
                        <>
                            <button className="gallery-lightbox-nav gallery-lightbox-prev" onClick={prevLightbox} aria-label="Previous">
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            <button className="gallery-lightbox-nav gallery-lightbox-next" onClick={nextLightbox} aria-label="Next">
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </>
                    )}

                    <div className="gallery-lightbox-content">
                        <img
                            src={resolveImageUrl(filteredItems[lightboxIndex].image)}
                            alt={filteredItems[lightboxIndex].title || filteredItems[lightboxIndex].hotel_name}
                            className="gallery-lightbox-img"
                        />
                        <div className="gallery-lightbox-caption">
                            <div className="gallery-lightbox-hotel">{filteredItems[lightboxIndex].hotel_name}</div>
                            <h4 className="gallery-lightbox-title">{filteredItems[lightboxIndex].title}</h4>
                            <div className="gallery-lightbox-counter">
                                Photo {lightboxIndex + 1} of {filteredItems.length}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Our Brands Bar */}
            <OurBrandsBar />
        </main>
    );
}
