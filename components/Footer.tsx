"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Booking Bar */}
      <div className="footer-booking-bar">
        <p className="footer-booking-text">
          Book Online or Call - <a href="tel:+97142909999" className="footer-booking-number">+97142909999</a>
        </p>
      </div>

      {/* Footer Body */}
      <div className="footer-body">
        <div className="container">
          <div className="row gy-5">

            {/* Col 1: Logo + Best Rate */}
            <div className="col-12 col-md-3 footer-logo-col">
              <Link href="/" className="footer-logo-link">
                <img src="/img/dark.png" alt="Opera Grand Hotel Logo" className="footer-logo-img" />
              </Link>
              <p className="footer-best-rate">Best Rate Guaranteed</p>
            </div>

            {/* Col 2: Opera Grand Hotel links */}
            <div className="col-12 col-sm-6 col-md-3">
              <h4 className="footer-col-heading">Opera Grand Hotel</h4>
              <ul className="footer-links">
                <li><a href="#">Facilities</a></li>
                <li><Link href="/destinations">Destinations</Link></li>
                <li><a href="#">Gallery</a></li>
                <li><Link href="/contact">Location &amp; Contact</Link></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>

            {/* Col 3: Quick Links */}
            <div className="col-12 col-sm-6 col-md-3">
              <h4 className="footer-col-heading">Quick Link</h4>
              <ul className="footer-links">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><a href="#">Press Release</a></li>
                <li><a href="#">Terms And Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Col 4: Stay In Touch */}
            <div className="col-12 col-md-3">
              <h4 className="footer-col-heading">Stay In Touch</h4>
              <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
                <div className="footer-input-group">
                  <input
                    type="email"
                    className="footer-email-input"
                    placeholder="Your Email"
                    aria-label="Email address"
                  />
                  <button type="submit" className="footer-signup-btn">Sign Up</button>
                </div>
              </form>
              <div className="footer-social">
                <p className="footer-social-label">Follow Us</p>
                <div className="footer-social-icons">
                  <a href="#" className="footer-social-icon" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a href="#" className="footer-social-icon" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a href="#" className="footer-social-icon" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a href="#" className="footer-social-icon" aria-label="Twitter / X">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>{/* /.row */}
        </div>{/* /.container */}
      </div>{/* /.footer-body */}

      {/* Copyright Bar */}
      <div className="footer-copyright">
        <p>Copyright &copy; Opera Grand Hotel 2026. All Right Reserved.</p>
      </div>

    </footer>
  );
}
