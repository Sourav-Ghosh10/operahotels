"use client";

import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import { DestinationData, fetchDestinationByLocale, Locale } from "@/lib/api/destinations";

type DestinationDetailClientProps = {
  initialDestination: DestinationData;
  slug: string;
  headerDestinations?: any[];
};

function stripHtml(value: string | null | undefined) {
  return value?.replace(/<[^>]*>/g, "").trim() || "";
}

export default function DestinationDetailClient({ initialDestination, slug, headerDestinations }: DestinationDetailClientProps) {
  const [destination, setDestination] = useState(initialDestination);
  const [locale, setLocale] = useState<Locale>("en");
  const [isLoadingLocale, setIsLoadingLocale] = useState(false);

  useEffect(() => {
    async function handleLocaleChange(event: Event) {
      const nextLocale = (event as CustomEvent<Locale>).detail;

      if (nextLocale === locale) {
        return;
      }

      setLocale(nextLocale);

      if (nextLocale === "en") {
        setDestination(initialDestination);
        return;
      }

      try {
        setIsLoadingLocale(true);
        setDestination(await fetchDestinationByLocale(slug, nextLocale));
      } catch (error) {
        console.error("[DestinationDetail] Locale API error:", error);
      } finally {
        setIsLoadingLocale(false);
      }
    }

    window.addEventListener("destination-locale-change", handleLocaleChange);

    return () => {
      window.removeEventListener("destination-locale-change", handleLocaleChange);
    };
  }, [initialDestination, locale, slug]);

  const bannerImages = useMemo(
    () =>
      destination.banner_images.length
        ? destination.banner_images
        : [
            "https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
          ],
    [destination.banner_images],
  );

  const destinationName = destination.name || destination.name_en || "";
  const description = stripHtml(destination.description || destination.description_en);
  const isArabic = locale === "ar";

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className={isLoadingLocale ? "destination-locale-loading" : undefined}>
      <header className="hero-section">
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade position-absolute w-100 h-100 top-0 start-0"
          data-bs-ride="carousel"
          data-bs-pause="false"
          style={{ zIndex: "0" }}
        >
          <div className="carousel-inner h-100">
            {bannerImages.map((image, index) => (
              <div
                className={`carousel-item h-100 ${index === 0 ? "active" : ""}`}
                data-bs-interval="5000"
                key={image}
              >
                <div
                  className="slider-image w-100 h-100"
                  style={{
                    backgroundImage: `url('${image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="hero-overlay"></div>
        <Header initialDestinations={headerDestinations} />

        <div className="hero-content position-relative" style={{ zIndex: "10" }}>
          <h1 className="main-title" style={{ fontSize: "3.5rem", letterSpacing: "4px" }}>
            {destinationName}
          </h1>
        </div>

        <button
          className="carousel-control-prev custom-carousel-control"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="20" y1="12" x2="4" y2="12"></line>
            <polyline points="10 18 4 12 10 6"></polyline>
          </svg>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next custom-carousel-control"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <polyline points="14 6 20 12 14 18"></polyline>
          </svg>
          <span className="visually-hidden">Next</span>
        </button>
      </header>

      <section className="uae-intro">
        <div className="container">
          <h2 className="section-title">{destinationName}</h2>
          {description && <p className="uae-p mb-0">{description}</p>}

          {destination.cities.length > 0 && (
            <div className="uae-subnav">
              {destination.cities.map((city) => (
                <a href={`#${city.slug}`} className="uae-subnav-link" key={city.id}>
                  {city.name || city.name_en}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {destination.cities.map((city, index) => {
        const isImageRight = city.layout_type === "image_right" || index % 2 === 1;
        const cityName = city.name || city.name_en || "";
        const cityDescription = stripHtml(city.description || city.description_en);

        return (
          <section
            id={city.slug}
            className={`city-section ${index % 2 === 1 ? "bg-light-grey" : ""}`}
            key={city.id}
          >
            <div className="container-fluid px-0">
              <div className={`row g-0 city-row ${isImageRight ? "flex-lg-row-reverse" : ""}`}>
                <div className="col-lg-6">
                  <div className="city-img-wrapper">
                    <img
                      src={city.city_image_url || bannerImages[0]}
                      alt={cityName}
                      className="city-img"
                    />
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center">
                  <div className="city-content">
                    <h3 className="city-title">{cityName}</h3>
                    {cityDescription && <p className="city-text">{cityDescription}</p>}
                    {city.city_link && (
                      <a href={city.city_link} className="city-btn">
                        {isArabic ? cityName : `Explore ${cityName}`}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Google Map Embeds Section */}
      {destination.map_embeds && destination.map_embeds.length > 0 && (
        <section className="destination-map-section">
          <div className="container">
            <h2 className="destination-map-title">
              {isArabic ? "فنادقنا المتاحة" : `Our Available Hotels In ${destination.country || destinationName}`}
            </h2>
            <div className="destination-map-divider"></div>
            <div className="destination-map-embeds">
              {destination.map_embeds.map((embedCode, index) => (
                <div
                  key={index}
                  className="destination-map-embed-wrapper"
                  dangerouslySetInnerHTML={{ __html: embedCode }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
