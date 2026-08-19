"use client";
import React, { useState } from 'react';
import Script from 'next/script';
import Header from '@/components/Header';

const GALLERY_CATEGORIES = [
    "All",
    "Corp Amman Hotel",
    "Bahi Ajman Palace Hotel",
    "Coral Dubai Deira Hotel",
    "Coral Al Jubail Hotel",
    "ECOS Dubai Hotel at Al Furjan"
];

const GALLERY_IMAGES = [
    { id: 1, category: "Corp Amman Hotel", title: "Lobby", src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, category: "Bahi Ajman Palace Hotel", title: "Exterior", src: "https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, category: "Coral Dubai Deira Hotel", title: "Room", src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, category: "Coral Al Jubail Hotel", title: "Dining", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, category: "ECOS Dubai Hotel at Al Furjan", title: "Pool", src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000&auto=format&fit=crop" },
    { id: 6, category: "Corp Amman Hotel", title: "Restaurant", src: "https://images.unsplash.com/photo-1551882547-ff40eb0d1b73?q=80&w=1000&auto=format&fit=crop" },
    { id: 7, category: "Bahi Ajman Palace Hotel", title: "Suite", src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop" },
    { id: 8, category: "Coral Dubai Deira Hotel", title: "Reception", src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1000&auto=format&fit=crop" },
    { id: 9, category: "Coral Al Jubail Hotel", title: "Lounge", src: "https://images.unsplash.com/photo-1554647286-f365d7defc2d?q=80&w=1000&auto=format&fit=crop" },
    { id: 10, category: "ECOS Dubai Hotel at Al Furjan", title: "Gym", src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" },
    { id: 11, category: "Corp Amman Hotel", title: "Exterior Night", src: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?q=80&w=1000&auto=format&fit=crop" },
    { id: 12, category: "Bahi Ajman Palace Hotel", title: "Spa", src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop" },
];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredImages = activeCategory === "All" 
        ? GALLERY_IMAGES 
        : GALLERY_IMAGES.filter(img => img.category === activeCategory);

    return (
        <main>
            {/* Fancybox CSS */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css"
            />
            {/* Gallery CSS */}
            <link rel="stylesheet" href="/css/gallery.css" />

            <header className="gallery-hero hero-section">
                <div className="slider-image" style={{ backgroundImage: "url('/img/futuristic-dubai-landscape 1.png')" }}></div>
                <div className="hero-overlay"></div>
                
                {/* Navigation */}
                <Header />

                {/* Banner Content */}
                <div className="hero-content container">
                    <h1 className="main-title">GALLERY</h1>
                </div>
            </header>

            <section className="gallery-filters-container">
                <div className="gallery-tabs">
                    {GALLERY_CATEGORIES.map(category => (
                        <button
                            key={category}
                            className={`gallery-tab-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            <section className="gallery-grid-section">
                <div className="masonry-container">
                    {filteredImages.map((image) => (
                        <div key={image.id} className="masonry-item">
                            <a data-fancybox="gallery" href={image.src} data-caption={image.title}>
                                <img src={image.src} alt={image.title} loading="lazy" />
                                <div className="masonry-item-overlay">
                                    <h3 className="masonry-item-title">{image.title}</h3>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Fancybox JS Initialization */}
            <Script 
                src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"
                strategy="afterInteractive"
                onLoad={() => {
                    // @ts-ignore
                    if (window.Fancybox) {
                        // @ts-ignore
                        window.Fancybox.bind("[data-fancybox='gallery']", {
                            // custom options
                        });
                    }
                }}
            />
        </main>
    );
}
