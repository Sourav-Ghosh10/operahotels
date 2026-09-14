"use client";
import React from "react";
import Link from "next/link";

export default function ArabicFooter() {
  return (
    <footer dir="rtl" className="site-footer arabic-footer lang-ar">
      <div className="footer-booking-bar">
        <p className="footer-booking-text">
          احجز عبر الإنترنت أو اتصل -{" "}
          <a href="tel:+97142909999" className="footer-booking-number">
            +97142909999
          </a>
        </p>
      </div>

      <div className="footer-body">
        <div className="container">
          <div className="row gy-5">
            <div className="col-12 col-md-3 footer-logo-col">
              <Link href="/" className="footer-logo-link">
                <img src="/img/dark.png" alt="Opera Grand Hotel Logo" className="footer-logo-img" />
              </Link>
              <p className="footer-best-rate">أفضل سعر مضمون</p>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <h4 className="footer-col-heading">فندق أوبرا جراند</h4>
              <ul className="footer-links">
                <li>
                  <Link href="/destinations">الوجهات</Link>
                </li>
                <li>
                  <Link href="/gallery">معرض الصور</Link>
                </li>
                <li>
                  <Link href="/contact">الموقع والتواصل</Link>
                </li>
                <li>
                  <Link href="/future-developments">المشاريع المستقبلية</Link>
                </li>
              </ul>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <h4 className="footer-col-heading">روابط سريعة</h4>
              <ul className="footer-links">
                <li>
                  <Link href="/about">من نحن</Link>
                </li>
                <li>
                  <Link href="/contact">اتصل بنا</Link>
                </li>
                <li>
                  <Link href="/press-release">البيانات الصحفية</Link>
                </li>
                <li>
                  <Link href="/terms-conditions">الشروط والأحكام</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">سياسة الخصوصية</Link>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-3">
              <h4 className="footer-col-heading">ابقَ على تواصل</h4>
              <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
                <div className="footer-input-group">
                  <input
                    type="email"
                    className="footer-email-input"
                    placeholder="بريدك الإلكتروني"
                    aria-label="البريد الإلكتروني"
                  />
                  <button type="submit" className="footer-signup-btn">
                    اشتراك
                  </button>
                </div>
              </form>
              <div className="footer-social">
                <p className="footer-social-label">تابعنا</p>
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
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>حقوق النشر © فندق أوبرا جراند 2026. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
