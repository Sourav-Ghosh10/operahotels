"use client";

import React, { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useUI } from "@/app/UIContext";

export default function PageLoader() {
  const { isPageLoading, setIsPageLoading } = useUI();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrlRef = useRef("");

  // Store current URL on mount and whenever it changes
  useEffect(() => {
    currentUrlRef.current = window.location.pathname + window.location.search;
  }, []);

  // When pathname or searchParams change, route has loaded!
  useEffect(() => {
    const newUrl = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    if (newUrl !== currentUrlRef.current) {
      currentUrlRef.current = newUrl;
    }

    // Small delay to ensure the new DOM is painted and provide a smooth fadeout
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, setIsPageLoading]);

  // Safety timeout in case navigation is cancelled or hangs
  useEffect(() => {
    if (!isPageLoading) return;

    const timeout = setTimeout(() => {
      setIsPageLoading(false);
    }, 7000);

    return () => clearTimeout(timeout);
  }, [isPageLoading, setIsPageLoading]);

  // Global click listener for internal link navigation
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Ignore modified clicks (Ctrl, Cmd, Shift, Alt)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      // Ignore right or middle clicks
      if (e.button !== 0) return;
      // Ignore if event was already prevented
      if (e.defaultPrevented) return;

      const target = (e.target as Element).closest("a");
      if (!target || !target.href) return;

      // Ignore external tabs, downloads, protocols
      if (target.target && target.target !== "_self") return;
      if (target.hasAttribute("download")) return;

      const href = target.getAttribute("href");
      if (!href) return;
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;

      try {
        const destUrl = new URL(target.href, window.location.href);
        const currUrl = new URL(window.location.href);

        // Ignore external domains
        if (destUrl.origin !== currUrl.origin) return;

        // Ignore pure hash links on the exact same page (e.g. #facilities, #dining)
        if (destUrl.pathname === currUrl.pathname && destUrl.search === currUrl.search) {
          if (destUrl.hash || href.startsWith("#")) {
            return;
          }
          // Exact same route, no navigation
          return;
        }

        // It is an internal page transition!
        setIsPageLoading(true);
      } catch {
        // Ignore invalid URLs
      }
    };

    const handlePopState = () => {
      setIsPageLoading(true);
    };

    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setIsPageLoading]);

  return (
    <div
      className={`luxury-page-loader-overlay ${isPageLoading ? "active" : ""}`}
      aria-hidden={!isPageLoading}
      role="status"
      aria-live="polite"
    >
      <div className="luxury-loader-center">
        {/* Orbital rings & brand emblem */}
        <div className="luxury-loader-orbit">
          <div className="luxury-loader-ring-outer"></div>
          <div className="luxury-loader-ring-inner"></div>
          <div className="luxury-loader-logo-wrap">
            <img
              src="/img/operalogo-white.png"
              alt="Opera Hotels Logo"
              className="luxury-loader-logo"
              onError={(e) => {
                e.currentTarget.src = "/img/operalogo-white 1.png";
              }}
            />
          </div>
        </div>

        {/* Brand label */}
        <div className="luxury-loader-brand">Opera Grand Hotels</div>

        {/* Shimmering luxury progress line */}
        <div className="luxury-loader-progress-track">
          <div className="luxury-loader-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}
