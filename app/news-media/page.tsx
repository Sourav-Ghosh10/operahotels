"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';

const NEWS_CATEGORIES = [
    "All",
    "Press Release",
    "Newsletter"
];

const NEWS_ITEMS = [
    { 
        id: 1, 
        type: "Newsletter", 
        title: "Beyond Hospitality - Newsletter 2025", 
        date: "", 
        src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
        id: 2, 
        type: "Newsletter", 
        title: "MYSTERY SHOPPER EXCELLENCE", 
        date: "", 
        src: "https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
        id: 3, 
        type: "Press Release", 
        title: "Coral Beach Resort Sharjah, managed by Hospitality Management Holding (HMH), Becomes a Hard of Hearing Friendly Hotel with its New Amsaan Technology", 
        date: "22 MAR 2018", 
        src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
        id: 4, 
        type: "Press Release", 
        title: "Dubai – Hospitality Management Holding (HMH) proudly announces its successful certification under the ISO 9001:2015 standard, solidifying its commitment to maintaining the highest quality management standards in the hospitality industry.", 
        date: "02 JAN 2024", 
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
        id: 5, 
        type: "Press Release", 
        title: "HMH managed Hotels turned Pink to Support Breast Cancer Patients", 
        date: "07 FEB 2023", 
        src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
        id: 6, 
        type: "Press Release", 
        title: "ECOS Dubai Hotel at Al Furjan - Chef Dario Usai Talks Inspiration & International Contemporary Food Cool", 
        date: "09 NOV 2022", 
        src: "https://images.unsplash.com/photo-1551882547-ff40eb0d1b73?q=80&w=1000&auto=format&fit=crop" 
    },
];

function NewsMediaContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        if (categoryParam && NEWS_CATEGORIES.includes(categoryParam)) {
            setActiveCategory(categoryParam);
        }
    }, [categoryParam]);

    const filteredItems = activeCategory === "All" 
        ? NEWS_ITEMS 
        : NEWS_ITEMS.filter(item => item.type === activeCategory);

    return (
        <main>
            <link rel="stylesheet" href="/css/news-media.css" />

            <header className="news-hero hero-section">
                <div className="slider-image" style={{ backgroundImage: "url('/img/slider-1.jpg')" }}></div>
                <div className="hero-overlay"></div>
                
                {/* Navigation */}
                <Header />

                {/* Banner Content */}
                <div className="hero-content container">
                    <h1 className="main-title">NEWS & MEDIA</h1>
                </div>
            </header>

            <section className="news-filters-container">
                <div className="news-tabs">
                    {NEWS_CATEGORIES.map(category => (
                        <button
                            key={category}
                            className={`news-tab-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category.toUpperCase()}
                        </button>
                    ))}
                </div>
            </section>

            <section className="news-grid-section">
                <div className="container">
                    <div className="news-grid">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="news-card">
                                {item.date && (
                                    <div className="news-card-date">{item.date}</div>
                                )}
                                <img src={item.src} alt={item.title} loading="lazy" />
                                <div className="news-card-overlay">
                                    <h3 className="news-card-title">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default function NewsMediaPage() {
    return (
        <Suspense fallback={<main><Header /></main>}>
            <NewsMediaContent />
        </Suspense>
    );
}
