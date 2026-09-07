"use client";
import { resolveImageUrl } from "@/services/api";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HotelFooterProps {
  logoUrl?: string;
  hotelName?: string;
  hotelSlug?: string;
  hotelPhone?: string;
  hotelAddress?: string;
  hotelEmail?: string;
}

function formatSlugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function HotelFooter({ 
  logoUrl, 
  hotelName, 
  hotelSlug, 
  hotelPhone,
  hotelAddress,
  hotelEmail 
}: HotelFooterProps) {
  const pathname = usePathname();

  let currentSlug = hotelSlug;
  if (!currentSlug && pathname) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && !['offers', 'contact', 'destinations', 'brands', 'about', 'gallery', 'future-developments', 'press-release'].includes(segments[0])) {
      currentSlug = segments[0];
    }
  }

  const displayHotelName = hotelName || (currentSlug ? formatSlugToTitle(currentSlug) : "Opera Grand Hotel");

  // Ensure bronze/footer version of logo is used on white background
  let effectiveLogo = logoUrl;
  if (effectiveLogo && effectiveLogo.includes('bahi_6a8ee06574de8.svg')) {
    effectiveLogo = effectiveLogo.replace('bahi_6a8ee06574de8.svg', 'bahi_6a8fccc4166d5.svg');
  }
  if (!effectiveLogo && (hotelSlug?.includes('bahi') || currentSlug?.includes('bahi'))) {
    effectiveLogo = resolveImageUrl('uploads/bahi_6a8fccc4166d5.svg');
  }

  const displayPhone = hotelPhone || (currentSlug?.includes('bahi') ? "+971 6 701 8888" : "+971 4 290 9999");

  return (
    <footer className="hotel-footer bg-white pt-5 pb-0" style={{ color: "#333", borderTop: "1px solid #eaeaea", fontFamily: "Arial, sans-serif" }}>
      <div className="container-fluid px-4 px-lg-5">
        <div className="row mb-5">
          {/* Column 1: Logos and Contact */}
          <div className="col-12 col-lg-4 mb-4 mb-lg-0 d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center mb-5 gap-3">
              <Link href="/">
                <img src="/img/dark.png" alt="Opera Hotels" style={{ maxHeight: "60px", objectFit: "contain", cursor: "pointer" }} />
              </Link>
              {effectiveLogo && (
                <>
                  <div className="border-start border-dark mx-2" style={{ height: "40px" }}></div>
                  <Link href={currentSlug ? `/${currentSlug}` : "/"}>
                    <img 
                      src={effectiveLogo} 
                      alt={`${displayHotelName} Logo`} 
                      style={{ maxHeight: "65px", maxWidth: "200px", objectFit: "contain", cursor: "pointer" }} 
                    />
                  </Link>
                </>
              )}
            </div>

            <div className="d-flex align-items-center mt-auto">
              <div className="me-4 pe-4 border-end border-dark">
                <h4 className="mb-0 fw-bold" style={{ fontSize: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Best Rate<br />Guaranteed
                </h4>
              </div>
              <div>
                <span className="d-block text-uppercase" style={{ fontSize: "12px", letterSpacing: "1px", fontWeight: "bold" }}>Book Online Or Call</span>
                <a 
                  href={`tel:${displayPhone.replace(/\s+/g, '')}`} 
                  className="d-block fw-bold text-dark text-decoration-none hover-gold" 
                  style={{ fontSize: "16px" }}
                >
                  {displayPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Hotel Links */}
          <div className="col-12 col-md-4 col-lg-2 mb-4 mb-md-0">
            <h6 className="fw-bold mb-4" style={{ fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}>
              {displayHotelName}
            </h6>
            <ul className="list-unstyled" style={{ fontSize: "12px", lineHeight: "2.5", fontWeight: "500", textTransform: "uppercase" }}>
              <li>
                <Link href={currentSlug ? `/${currentSlug}#accommodation` : "/rooms-suites"} className="text-dark text-decoration-none hover-gold">
                  Rooms &amp; Suites
                </Link>
              </li>
              <li>
                <Link href={currentSlug ? `/${currentSlug}#dining` : "#"} className="text-dark text-decoration-none hover-gold">
                  Dining
                </Link>
              </li>
              <li>
                <Link href={currentSlug ? `/${currentSlug}#gallery` : "/gallery"} className="text-dark text-decoration-none hover-gold">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href={currentSlug ? `/${currentSlug}/contact` : "/contact"} className="text-dark text-decoration-none hover-gold">
                  Location &amp; Contact
                </Link>
              </li>
              <li>
                <Link href="/future-developments" className="text-dark text-decoration-none hover-gold">
                  Future Developments
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Links */}
          <div className="col-12 col-md-4 col-lg-3 mb-4 mb-md-0">
            <h6 className="fw-bold mb-4" style={{ fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}>Opera Hotels</h6>
            <ul className="list-unstyled" style={{ fontSize: "12px", lineHeight: "2.5", fontWeight: "500", textTransform: "uppercase" }}>
              <li><Link href="/about" className="text-dark text-decoration-none hover-gold">About Us</Link></li>
              <li><Link href="/brands" className="text-dark text-decoration-none hover-gold">Brands &amp; Hotels</Link></li>
              <li><Link href="/destinations" className="text-dark text-decoration-none hover-gold">Destinations</Link></li>
              <li><Link href="/offers" className="text-dark text-decoration-none hover-gold">Special Offers</Link></li>
              <li><Link href="/terms-conditions" className="text-dark text-decoration-none hover-gold">Terms and Conditions</Link></li>
              <li><Link href="/privacy-policy" className="text-dark text-decoration-none hover-gold">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div className="col-12 col-md-4 col-lg-3">
            <h6 className="fw-bold mb-4" style={{ fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}>Stay In Touch</h6>
            <form className="mb-5" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control border-0 border-bottom border-dark rounded-0 px-0 shadow-none bg-transparent"
                  placeholder="Your email"
                  style={{ fontSize: "13px" }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-dark rounded-0 px-4 py-2"
                style={{ fontSize: "12px", letterSpacing: "1px", fontWeight: "bold" }}
              >
                SIGN UP
              </button>
            </form>

            <h6 className="fw-bold mb-3" style={{ fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}>Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-dark fs-5" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-dark fs-5" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-dark fs-5" aria-label="X Twitter"><i className="fab fa-x-twitter"></i></a>
              <a href="#" className="text-dark fs-5" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="text-dark fs-5" aria-label="Threads"><i className="fab fa-threads"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-100 py-3" style={{ backgroundColor: "#f5f5f5", borderTop: "1px solid #eaeaea" }}>
        <div className="container-fluid px-4 px-lg-5 text-center">
          <p className="mb-0" style={{ fontSize: "11px", color: "#666", letterSpacing: "0.5px" }}>
            &copy; Copyright {new Date().getFullYear()} {displayHotelName} - Hospitality Management Holding.
          </p>
        </div>
      </div>
    </footer>
  );
}