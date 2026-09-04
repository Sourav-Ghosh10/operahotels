"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUI } from "@/app/UIContext";

import { getBrandsData } from "@/services/api";

type DestinationMenuItem = {
  id: number;
  slug: string;
  name: string;
  name_en?: string;
};

type BrandMenuItem = {
  id: number;
  slug: string;
  name: string;
  hotels: { id: number; slug: string; name: string }[];
};

type Locale = "en" | "ar";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const fallbackDestinations: DestinationMenuItem[] = [
  { id: 1, slug: "dubai", name: "Dubai" },
  { id: 2, slug: "amman", name: "Amman" },
  { id: 3, slug: "sharjah", name: "Sharjah" },
];

export default function Header({ initialDestinations = fallbackDestinations }: { initialDestinations?: DestinationMenuItem[] }) {
  const { setIsNavOpen, setIsBookingOpen } = useUI();
  const [destinations, setDestinations] = useState<DestinationMenuItem[]>(initialDestinations);
  const [brands, setBrands] = useState<BrandMenuItem[]>([]);
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    getBrandsData().then(data => {
      if (Array.isArray(data)) {
        setBrands(data);
      }
    });

    if (initialDestinations === fallbackDestinations) {
      fetch(`${API_BASE}/api/destinations`)
        .then(res => res.json())
        .then(json => {
          if (json && json.data) {
            const mapped = (json.data || [])
              .filter((dest: any) => dest.slug && (dest.name || dest.name_en))
              .map((dest: any) => ({
                id: dest.id,
                slug: dest.slug,
                name: dest.name || dest.name_en || "",
              }));
            if (mapped.length > 0) {
              setDestinations(mapped);
            }
          }
        })
        .catch(err => console.error("Failed to fetch destinations in Header:", err));
    }
  }, [initialDestinations]);

  useEffect(() => {
    setDestinations(initialDestinations);
  }, [initialDestinations]);

  function selectLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    window.dispatchEvent(new CustomEvent("destination-locale-change", { detail: nextLocale }));
  }



  return (
    <nav className="navbar navbar-expand-lg transparent-nav position-relative" style={{ zIndex: 10 }}>
      <div className="container-fluid px-4 px-lg-5">
        <div className="d-flex align-items-center">
          {/* Custom Toggle Icon */}
          <a
            href="#"
            className="custom-nav-toggler me-3 me-lg-4 text-decoration-none"
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

          {/* Logo */}
          <Link className="navbar-brand m-0" href="/">
            <img src="/img/operalogo-white.png" alt="Opera Hotels Logo" onError={(e) => { e.currentTarget.src = "/img/operalogo-white 1.png"; }} />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link" href="/about">
                About
              </Link>
            </li>
            <li className="nav-item dropdown custom-dropdown">
              <div className="d-flex align-items-center">
                <Link
                  className="nav-link pe-0"
                  href="/brands"
                >
                  BRANDS &amp; HOTELS
                </Link>
                <button
                  className="btn p-0 nav-link dropdown-toggle dropdown-toggle-split"
                  id="brandsDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "none", border: "none", color: "inherit", paddingLeft: "0" }}
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
              <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="brandsDropdown">
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
                    <span className="dropdown-item text-muted">Loading...</span>
                  </li>
                )}
              </ul>
            </li>
            <li className="nav-item dropdown custom-dropdown">
              <div className="d-flex align-items-center">
                <Link
                  className="nav-link pe-0"
                  href="/destinations"
                >
                  DESTINATIONS
                </Link>
                <button
                  className="btn p-0 nav-link dropdown-toggle dropdown-toggle-split"
                  id="destinationsDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "none", border: "none", color: "inherit", paddingLeft: "0" }}
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
              <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="destinationsDropdown">
                {destinations.map((destination) => {
                  const cleanSlug = destination.slug.replace(/^\/?(destinations\/)?/, '');
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
                OFFERS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contact">
                CONTACT
              </Link>
            </li>

            <li className="nav-item dropdown language-selector-item">
              <button
                className="nav-link destination-language-toggle"
                type="button"
                id="languageDropdown"
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
                  className="ms-2 destination-language-chevron"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <ul className="dropdown-menu destination-language-menu" aria-labelledby="languageDropdown">
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

            {/* Mobile Book Now Button */}
            <li className="nav-item d-lg-none mt-4 w-100 px-3">
              <a
                href="#"
                className="btn btn-book-now w-100"
                onClick={(e) => {
                  e.preventDefault();
                  setIsBookingOpen(true);
                }}
              >
                BOOK NOW
              </a>
            </li>
          </ul>

          {/* Desktop Book Now Button */}
          <div className="d-none d-lg-block">
            <a
              href="#"
              className="btn btn-book-now"
              onClick={(e) => {
                e.preventDefault();
                setIsBookingOpen(true);
              }}
            >
              BOOK NOW
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
