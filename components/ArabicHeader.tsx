"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUI } from "@/app/UIContext";
import { getBrandsData, getApiEndpoint } from "@/services/api";
import { getArabicDestinationName } from "@/lib/arabicNames";

type DestinationMenuItem = {
  id: number;
  slug: string;
  name: string;
  name_ar?: string;
};

type BrandMenuItem = {
  id: number;
  slug: string;
  name: string;
  hotels: { id: number; slug: string; name: string }[];
};

type Locale = "en" | "ar";

const fallbackDestinations: DestinationMenuItem[] = [
  { id: 1, slug: "dubai", name: "دبي" },
  { id: 2, slug: "amman", name: "عمّان" },
  { id: 3, slug: "sharjah", name: "الشارقة" },
];

export default function ArabicHeader({
  initialDestinations = fallbackDestinations,
}: {
  initialDestinations?: DestinationMenuItem[];
}) {
  const { setIsNavOpen, setIsBookingOpen } = useUI();
  const [destinations, setDestinations] = useState<DestinationMenuItem[]>(initialDestinations);
  const [brands, setBrands] = useState<BrandMenuItem[]>([]);
  const [locale, setLocale] = useState<Locale>("ar");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("app_locale") as Locale;
        if (saved && (saved === "en" || saved === "ar")) {
          setLocale(saved);
        }
      } catch (err) {}
    }

    const handleExternalLocale = (e: Event) => {
      const next = (e as CustomEvent<Locale>).detail;
      if (next && (next === "en" || next === "ar")) {
        setLocale(next);
      }
    };
    window.addEventListener("locale-change", handleExternalLocale);
    window.addEventListener("destination-locale-change", handleExternalLocale);
    return () => {
      window.removeEventListener("locale-change", handleExternalLocale);
      window.removeEventListener("destination-locale-change", handleExternalLocale);
    };
  }, []);

  useEffect(() => {
    getBrandsData().then((data) => {
      if (Array.isArray(data)) {
        setBrands(data);
      }
    });

    if (initialDestinations === fallbackDestinations) {
      fetch(`${getApiEndpoint()}/destinations`)
        .then((res) => res.json())
        .then((json) => {
          if (json && json.data) {
            const mapped = (json.data || [])
              .filter((dest: any) => dest.slug && (dest.name || dest.name_ar || dest.name_en))
              .map((dest: any) => ({
                id: dest.id,
                slug: dest.slug,
                name: getArabicDestinationName(dest.slug, dest.name_ar, dest.name),
                name_ar: dest.name_ar,
              }));
            if (mapped.length > 0) {
              setDestinations(mapped);
            }
          }
        })
        .catch((err) => console.error("Failed to fetch destinations in ArabicHeader:", err));
    }
  }, [initialDestinations]);

  useEffect(() => {
    setDestinations(initialDestinations);
  }, [initialDestinations]);

  function selectLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("app_locale", nextLocale);
      } catch (err) {}
      window.dispatchEvent(new CustomEvent("locale-change", { detail: nextLocale }));
      window.dispatchEvent(new CustomEvent("destination-locale-change", { detail: nextLocale }));
    }
  }

  return (
    <nav
      dir="rtl"
      className="navbar navbar-expand-lg transparent-nav position-relative arabic-header lang-ar"
      style={{ zIndex: 10 }}
    >
      <div className="container-fluid px-4 px-lg-5">
        <div className="d-flex align-items-center">
          <a
            href="#"
            className="custom-nav-toggler ms-3 ms-lg-4 text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              setIsNavOpen(true);
            }}
          >
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
            <span className="line line-4"></span>
          </a>

          <Link className="navbar-brand m-0" href="/">
            <img
              src="/img/operalogo-white.png"
              alt="Opera Hotels Logo"
              onError={(e) => {
                e.currentTarget.src = "/img/operalogo-white 1.png";
              }}
            />
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavAr"
          aria-controls="mainNavAr"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavAr">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link" href="/about">
                من نحن
              </Link>
            </li>
            <li className="nav-item dropdown custom-dropdown">
              <div className="d-flex align-items-center">
                <Link className="nav-link ps-0" href="/brands">
                  العلامات التجارية والفنادق
                </Link>
                <button
                  className="btn p-0 nav-link dropdown-toggle dropdown-toggle-split"
                  id="brandsDropdownAr"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "none", border: "none", color: "inherit", paddingRight: "0" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="nav-chevron-icon"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
              <ul className="dropdown-menu custom-dropdown-menu brands-hotels-dropdown-en" aria-labelledby="brandsDropdownAr">
                {brands.length > 0 ? (
                  brands.map((brand) => (
                    <li className="dropdown-submenu" key={brand.id}>
                      <Link
                        className="dropdown-item d-flex align-items-center justify-content-between"
                        href={`/${brand.slug}`}
                      >
                        {brand.name}
                        {brand.hotels && brand.hotels.length > 0 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="submenu-chevron"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        )}
                      </Link>
                      {brand.hotels && brand.hotels.length > 0 && (
                        <ul className="submenu-menu">
                          {brand.hotels.map((hotel) => (
                            <li key={hotel.id}>
                              <Link className="submenu-item" href={`/${hotel.slug}`}>
                                {hotel.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="dropdown-item text-muted">جاري التحميل...</span>
                  </li>
                )}
              </ul>
            </li>
            <li className="nav-item dropdown custom-dropdown">
              <div className="d-flex align-items-center">
                <Link className="nav-link ps-0" href="/destinations">
                  الوجهات
                </Link>
                <button
                  className="btn p-0 nav-link dropdown-toggle dropdown-toggle-split"
                  id="destinationsDropdownAr"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "none", border: "none", color: "inherit", paddingRight: "0" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="nav-chevron-icon"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
              <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="destinationsDropdownAr">
                {destinations.map((destination) => {
                  const cleanSlug = destination.slug.replace(/^\/?(destinations\/)?/, "");
                  const href = `/destinations/${cleanSlug}`;
                  return (
                    <li key={destination.id}>
                      <Link className="dropdown-item" href={href}>
                        {destination.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/offers">
                العروض
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contact">
                اتصل بنا
              </Link>
            </li>

            <li className="nav-item dropdown language-selector-item">
              <button
                className="nav-link destination-language-toggle"
                type="button"
                id="languageDropdownAr"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {locale === "en" ? "ENGLISH" : "العربية"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="me-2 destination-language-chevron"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <ul className="dropdown-menu destination-language-menu" aria-labelledby="languageDropdownAr">
                <li>
                  <button
                    className={`dropdown-item ${locale === "en" ? "active" : ""}`}
                    type="button"
                    onClick={() => selectLocale("en")}
                  >
                    ENGLISH
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${locale === "ar" ? "active" : ""}`}
                    type="button"
                    onClick={() => selectLocale("ar")}
                  >
                    العربية
                  </button>
                </li>
              </ul>
            </li>

            <li className="nav-item d-lg-none mt-4 w-100 px-3">
              <a
                href="#"
                className="btn btn-book-now w-100"
                onClick={(e) => {
                  e.preventDefault();
                  setIsBookingOpen(true);
                }}
              >
                احجز الآن
              </a>
            </li>
          </ul>

          <div className="d-none d-lg-block">
            <a
              href="#"
              className="btn btn-book-now"
              onClick={(e) => {
                e.preventDefault();
                setIsBookingOpen(true);
              }}
            >
              احجز الآن
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
