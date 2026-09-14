"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "@/app/UIContext";

interface HotelHeaderProps {
  logoUrl?: string;
  hotelSlug?: string;
  isSolid?: boolean;
}

export default function HotelHeader({ logoUrl, hotelSlug, isSolid }: HotelHeaderProps) {
  const { setIsNavOpen, setIsBookingOpen } = useUI();
  const pathname = usePathname();

  let currentSlug = hotelSlug;
  if (!currentSlug && pathname) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && !['offers', 'contact', 'destinations', 'brands', 'about', 'gallery', 'future-developments', 'press-release'].includes(segments[0])) {
      currentSlug = segments[0];
    }
  }

  // Auto-detect if solid nav is needed (e.g. room details or subpages where no full-screen hero slider exists)
  const isSolidNav = isSolid !== undefined ? isSolid : Boolean(pathname && pathname.includes('/rooms-suites'));

  const meetingsEventsHref = currentSlug ? `/${currentSlug}/meetings-events` : '/bahi-hotels-resorts/meetings-events';

  // Determine active nav item based on current pathname
  const pathnameSegments = pathname ? pathname.split('/').filter(Boolean) : [];
  const lastSegment = pathnameSegments[pathnameSegments.length - 1] || '';
  const isRoomsActive = pathname?.includes('/rooms-suites') ?? false;
  const isDiningActive = pathname?.includes('/dining') ?? false;
  const isFacilitiesActive = pathname?.includes('/facilities') ?? false;
  const isOffersActive = lastSegment === 'special-offers' || lastSegment === 'offers';
  const isMeetingsActive = lastSegment === 'meetings-events';
  const isGalleryActive = lastSegment === 'gallery';

  return (
    <nav
      className={`navbar navbar-expand-lg ${isSolidNav ? 'solid-hotel-nav position-sticky top-0' : 'transparent-nav position-absolute'} w-100`}
      style={{
        zIndex: 1020,
        backgroundColor: isSolidNav ? "#0b1a26" : undefined,
        borderBottom: isSolidNav ? "1px solid rgba(255, 255, 255, 0.12)" : undefined,
        boxShadow: isSolidNav ? "0 4px 20px rgba(0, 0, 0, 0.25)" : undefined,
        transition: "all 0.3s ease"
      }}
    >
      <div className="container-fluid px-4 px-lg-5">
        {/* LEFT: hamburger + logo — both vertically centred in a 70 px tall strip */}
        <div className="hotel-nav-left">
          {/* Hamburger wrapper — fixed 70×70 box so it matches logo height */}
          <a
            href="#"
            className="custom-nav-toggler hotel-nav-toggler-wrap text-decoration-none"
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
          <Link className="hotel-nav-logo-link" href={currentSlug ? `/${currentSlug}` : "/"}>
            <img
              src={logoUrl || "/img/operalogo-white 1.png"}
              alt="Hotel Logo"
              className="hotel-nav-logo-img"
            />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler d-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className={`nav-link${isRoomsActive ? ' active' : ''}`} href={currentSlug ? `/${currentSlug}/rooms-suites` : "/rooms-suites"}>ROOMS &amp; SUITES</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${isDiningActive ? ' active' : ''}`} href={currentSlug ? `/${currentSlug}/dining` : "/dining"}>DINING</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${isOffersActive ? ' active' : ''}`} href={currentSlug ? `/${currentSlug}/special-offers` : "/offers"}>OFFERS</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${isMeetingsActive ? ' active' : ''}`} href={meetingsEventsHref}>MEETINGS &amp; EVENTS</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${isGalleryActive ? ' active' : ''}`} href={currentSlug ? `/gallery?hotel=${currentSlug}` : "/gallery"}>GALLERY</Link>
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