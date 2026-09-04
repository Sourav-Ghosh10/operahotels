"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import OurBrandsBar from "@/components/OurBrandsBar";
import { getPageData } from "@/services/api";
import "./press-release.css";

// Fallback CDN links
const CDN_FALLBACKS: Record<string, string> = {
  "press_banner_1.jpg": "https://image-tc.galaxy.tf/wijpeg-f21oa1v0ctn7k1pjv43dtqbk/christina-wocintechchat-com-68c8tlx5dfk-unsplash.jpg?width=1920",
  "press_banner_2.jpg": "https://image-tc.galaxy.tf/wijpeg-kptpobb5o6t9jvxbkwfugeax/vlad-deep-us3dzzdckm4-unsplash.jpg?width=1920",
  "press_item_1.jpg": "https://image-tc.galaxy.tf/wijpeg-3vkm64y4qy93c57wadp3xi3w4/29771ba4-462b-4b96-b8c3-92a572e11c75_wide.jpg?crop=0%2C0%2C1600%2C900",
  "press_item_2.jpg": "https://image-tc.galaxy.tf/wijpeg-afe91ynhz259zq0nyuy0pitse/tap-exterior-beach_wide.jpg?crop=0%2C75%2C1920%2C1080",
  "press_item_3.jpg": "https://image-tc.galaxy.tf/wijpeg-5o6lfsdt1f6dvgzxlhapkn0m0/coral-beach-resort-sharjah_wide.jpg?crop=0%2C0%2C1920%2C1080",
  "press_item_4.jpg": "https://image-tc.galaxy.tf/wijpeg-6c7908b1i2mpgtmesfzjaummk/press-image_wide.jpg?crop=0%2C104%2C1920%2C1080",
  "press_item_5.jpg": "https://image-tc.galaxy.tf/wijpeg-1thjvtevp4g2kac7kx8z1fsna/press-image_wide.jpg?crop=0%2C99%2C1920%2C1080",
  "press_item_6.jpg": "https://image-tc.galaxy.tf/wijpeg-2w082qqmg67d5b8pe1riv1664/ecos-dubai-hotel-at-al-furjan_wide.jpg?crop=286%2C0%2C1349%2C759",
  "press_item_7.jpg": "https://image-tc.galaxy.tf/wijpeg-5o6lfsdt1f6dvgzxlhapkn0m0/coral-beach-resort-sharjah_wide.jpg?crop=0%2C0%2C1920%2C1080",
  "press_item_8.jpg": "https://image-tc.galaxy.tf/wijpeg-f0inv3v6bw51skzdzuc4t6mfy/hmh-s-blood-donation_wide.jpg?crop=0%2C81%2C1920%2C1080",
  "press_item_9.jpg": "https://image-tc.galaxy.tf/wijpeg-bgyo2uh0z5tnxolnn5cnbv7cy/ecos-dubai-hotel_wide.jpg?crop=0%2C408%2C1920%2C1080",
  "press_item_10.jpg": "https://image-tc.galaxy.tf/wijpeg-2w082qqmg67d5b8pe1riv1664/ecos-dubai-hotel-at-al-furjan_wide.jpg?crop=286%2C0%2C1349%2C759",
};

function resolveImg(filenameOrUrl: string | undefined | null, defaultFilename: string): { local: string; cdn: string } {
  const target = filenameOrUrl || defaultFilename;
  if (!target) return { local: "", cdn: "" };
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return { local: target, cdn: target };
  }
  const clean = target.replace(/^.*[\\\/]/, "");
  const local = `/img/press/${clean}`;
  const cdn = CDN_FALLBACKS[clean] || `/uploads/${clean}`;
  return { local, cdn };
}

export default function PressReleasePage() {
  const [pageData, setPageData] = useState<any>(null);

  // Hero Slider State
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPlaying, setHeroPlaying] = useState(true);

  // Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Load More Limit State (Default 6, expands by 6)
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Modal State
  const [activeModalArticle, setActiveModalArticle] = useState<any | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getPageData("press-release");
        if (data) {
          setPageData(data);
        }
      } catch (e) {
        console.error("Failed to load page data for press-release:", e);
      }
    };
    loadData();
  }, []);

  const body = pageData?.body || {};

  // 1. Hero Slides
  const rawHeroSlides = Array.isArray(body.banner_slides) && body.banner_slides.length > 0
    ? body.banner_slides
    : [
        {
          image: "press_banner_1.jpg",
          title: "News & Press",
          subtitle: "Hospitality Management Holding",
        },
        {
          image: "press_banner_2.jpg",
          title: "News & Press",
          subtitle: "Hospitality Management Holding",
        },
      ];

  const heroSlides = rawHeroSlides.map((slide: any, idx: number) => {
    const defaultName = idx === 0 ? "press_banner_1.jpg" : "press_banner_2.jpg";
    const urls = resolveImg(slide.image, defaultName);
    return {
      urls,
      title: slide.title || "News & Press",
      subtitle: slide.subtitle || "Hospitality Management Holding",
    };
  });

  // Hero Autoplay
  useEffect(() => {
    if (!heroPlaying || heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroPlaying, heroSlides.length]);

  const prevHeroSlide = () => {
    setHeroIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextHeroSlide = () => {
    setHeroIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const currentHeroSlide = heroSlides[heroIndex] || heroSlides[0];

  // 2. Categories
  const categories: string[] = Array.isArray(body.categories) && body.categories.length > 0
    ? body.categories
    : ["All", "Press Releases", "Newsletter"];

  // 3. Articles List
  const rawArticles = Array.isArray(body.press_releases_list) && body.press_releases_list.length > 0
    ? body.press_releases_list
    : [
        {
          id: 1,
          title: "Beyond Hospitality - Newsletter 2025",
          date: "Recent",
          category: "Newsletter",
          image: "press_item_1.jpg",
          description: "Discover the latest insights, executive developments, and announcements from HMH Hospitality Management Holding in our comprehensive 2025 newsletter.",
        },
        {
          id: 2,
          title: "MYSTERY SHOPPER EXCELLENCE",
          date: "Recent",
          category: "Newsletter",
          image: "press_item_2.jpg",
          description: "Celebrating outstanding service performance across HMH hotels with top-tier audit ratings and guest satisfaction benchmarks.",
        },
        {
          id: 3,
          title: "Coral Beach Resort Sharjah, managed by Hospitality Management Holding (HMH), Becomes a Hard of Hearing Friendly Hotel with its New Amsaan Technology",
          date: "22/03/2018",
          category: "Press Releases",
          image: "press_item_3.jpg",
          description: "Coral Beach Resort Sharjah pioneers inclusivity by implementing revolutionary Amsaan technology to empower guests who are hard of hearing.",
        },
        {
          id: 4,
          title: "Dubai — Hospitality Management Holding (HMH) proudly announces its successful certification under the ISO 9001:2015 standard, solidifying its commitment to maintaining the highest quality management standards in the hospitality industry.",
          date: "02/01/2024",
          category: "Press Releases",
          image: "press_item_4.jpg",
          description: "HMH receives ISO 9001:2015 certification, underscoring excellence in hotel management systems, governance, and guest service protocols.",
        },
        {
          id: 5,
          title: "HMH managed Hotels turned Pink to Support Breast Cancer Patients",
          date: "07/02/2023",
          category: "Press Releases",
          image: "press_item_5.jpg",
          description: "Properties across the UAE unite to promote health awareness, raise funds, and illuminate landmarks in tribute to breast cancer patients.",
        },
        {
          id: 6,
          title: "ECOS Dubai Hotel at Al Furjan - Chef Dario Usai Talks Inspiration & International Contemporary Food Cool",
          date: "09/11/2022",
          category: "Press Releases",
          image: "press_item_6.jpg",
          description: "Renowned culinary leader Chef Dario Usai shares creative insights into modern international flavours and culinary innovations at ECOS Dubai Hotel.",
        },
        {
          id: 7,
          title: "Coral Beach Resort Sharjah, managed by Hospitality Management Holding (HMH), Becomes a Hard of Hearing Friendly Hotel with its New Amsaan Technology",
          date: "22/03/2021",
          category: "Press Releases",
          image: "press_item_7.jpg",
          description: "A continuation of the pioneering accessibility initiative at Coral Beach Resort Sharjah.",
        },
        {
          id: 8,
          title: "HMH’s Successful Blood Donation Drive Across its UAE Operations",
          date: "03/08/2020",
          category: "Press Releases",
          image: "press_item_8.jpg",
          description: "Hotel colleagues and leadership participate in a nationwide blood donation campaign supporting local health authorities.",
        },
        {
          id: 9,
          title: "ECOS Dubai Hotel at Al Furjan offers an exciting range of facilities aimed at enhancing the connected life and work.",
          date: "28/10/2019",
          category: "Press Releases",
          image: "press_item_9.jpg",
          description: "Millennial and business-focused lifestyle amenities blending high-speed connectivity, coworking lounges, and smart hotel rooms.",
        },
        {
          id: 10,
          title: "ECOS Dubai Hotel at Al Furjan - Chef Dario Usai Talks Inspiration & International Contemporary Food Cool",
          date: "09/11/2018",
          category: "Press Releases",
          image: "press_item_10.jpg",
          description: "Exclusive culinary feature on innovative lifestyle dining and sustainable hospitality concepts.",
        },
      ];

  const formattedArticles = rawArticles.map((art: any, idx: number) => {
    const defaultName = `press_item_${idx + 1}.jpg`;
    const urls = resolveImg(art.image, defaultName);
    const cleanDesc = art.description
      ? art.description.replace(/<[^>]*>?/gm, "")
      : art.title;

    return {
      ...art,
      urls,
      cleanDesc,
    };
  });

  // Filter logic
  const filteredArticles = formattedArticles.filter((art: any) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Press Releases" || selectedCategory === "Press Release") {
      return art.category === "Press Releases" || art.category === "Press Release";
    }
    if (selectedCategory === "Newsletter") {
      return art.category === "Newsletter";
    }
    return art.category === selectedCategory;
  });

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <main className="press-release-page">
      {/* ================= 1. HERO BANNER WITH INTEGRATED HEADER ================= */}
      <header className="press-hero-section">
        {/* Background Slides */}
        <div className="press-hero-slider">
          {heroSlides.map((slide: any, idx: number) => (
            <div
              key={idx}
              className={`press-hero-slide ${idx === heroIndex ? "active" : ""}`}
            >
              <img
                src={slide.urls.local}
                alt={slide.title}
                className="press-hero-slide-img"
                onError={(e) => {
                  if (slide.urls.cdn && e.currentTarget.src !== slide.urls.cdn) {
                    e.currentTarget.src = slide.urls.cdn;
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* Dark Linear Overlay */}
        <div className="press-hero-overlay"></div>

        {/* Transparent Header */}
        <Header />

        {/* Hero Title & Subtitle */}
        <div className="press-hero-content">
          <div className="container">
            {currentHeroSlide.subtitle && (
              <span className="press-hero-subtitle">{currentHeroSlide.subtitle}</span>
            )}
            <h1 className="press-hero-title">{currentHeroSlide.title}</h1>
          </div>
        </div>

        {/* Hero Controls */}
        <div className="press-hero-controls">
          <button
            type="button"
            className="press-slider-arrow"
            onClick={prevHeroSlide}
            aria-label="Previous Slide"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="press-hero-dots">
            {heroSlides.map((_: any, idx: number) => (
              <button
                key={idx}
                type="button"
                className={`press-hero-dot ${idx === heroIndex ? "active" : ""}`}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="press-play-pause-btn"
            onClick={() => setHeroPlaying((p) => !p)}
            aria-label={heroPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            <i className={`fas ${heroPlaying ? "fa-pause" : "fa-play"}`}></i>
          </button>

          <button
            type="button"
            className="press-slider-arrow"
            onClick={nextHeroSlide}
            aria-label="Next Slide"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </header>

      {/* ================= 2. PRESS GRID & FILTERS SECTION ================= */}
      <section className="press-grid-section">
        <div className="press-container">
          {/* Category Filter Tabs */}
          <div className="press-filter-wrapper">
            <ul className="press-filter-categories">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    className={`press-category-item ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setVisibleCount(6);
                    }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* News Grid */}
          {displayedArticles.length > 0 ? (
            <div className="press-news-grid">
              {displayedArticles.map((art: any, idx: number) => (
                <article
                  key={art.id || idx}
                  className="press-news-item"
                  onClick={() => setActiveModalArticle(art)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveModalArticle(art);
                    }
                  }}
                  aria-label={`Read ${art.title}`}
                >
                  {/* Top Animated Content */}
                  <div className="press-top-content">
                    <div className="press-top-inner-wrap">
                      {art.date && art.date !== "Recent" && (
                        <span className="press-news-date">{art.date}</span>
                      )}
                      {art.category && (
                        <span className="press-category-badge">{art.category}</span>
                      )}

                      <div className="press-image-wrap">
                        <img
                          src={art.urls.local}
                          alt={art.title}
                          loading="lazy"
                          onError={(e) => {
                            if (art.urls.cdn && e.currentTarget.src !== art.urls.cdn) {
                              e.currentTarget.src = art.urls.cdn;
                            }
                          }}
                        />
                      </div>

                      <span className="press-top-news-title">{art.title}</span>
                    </div>
                  </div>

                  {/* Bottom Sliding Content */}
                  <div className="press-bottom-content">
                    <p className="press-bottom-description">{art.cleanDesc}</p>

                    <button
                      type="button"
                      className="press-news-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalArticle(art);
                      }}
                      aria-label={`Read full article: ${art.title}`}
                    >
                      <span>Read More</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="10"
                        viewBox="0 0 14.419 9.615"
                        fill="none"
                      >
                        <path
                          d="M7.83 1.399L12.419 4.807L7.83 8.216"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0 4.807H11.444"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="press-empty-state">
              <p>No articles found for category: {selectedCategory}</p>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="press-loadmore-wrap">
              <button
                type="button"
                className="press-loadmore-button"
                onClick={handleLoadMore}
              >
                LOAD MORE
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= 3. ARTICLE DETAIL MODAL ================= */}
      {activeModalArticle && (
        <div
          className="press-modal-backdrop"
          onClick={() => setActiveModalArticle(null)}
        >
          <div
            className="press-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="press-modal-close-btn"
              onClick={() => setActiveModalArticle(null)}
              aria-label="Close Modal"
            >
              &times;
            </button>

            <div className="press-modal-img-wrap">
              <img
                src={activeModalArticle.urls.local}
                alt={activeModalArticle.title}
                onError={(e) => {
                  if (activeModalArticle.urls.cdn && e.currentTarget.src !== activeModalArticle.urls.cdn) {
                    e.currentTarget.src = activeModalArticle.urls.cdn;
                  }
                }}
              />
            </div>

            <div className="press-modal-body">
              <div className="press-modal-meta">
                <span className="press-modal-badge">{activeModalArticle.category}</span>
                {activeModalArticle.date && (
                  <span className="press-modal-date">{activeModalArticle.date}</span>
                )}
              </div>

              <h2 className="press-modal-title">{activeModalArticle.title}</h2>

              <div
                className="press-modal-text"
                dangerouslySetInnerHTML={{
                  __html: activeModalArticle.description || `<p>${activeModalArticle.title}</p>`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. OUR BRANDS BAR ================= */}
      <OurBrandsBar />
    </main>
  );
}