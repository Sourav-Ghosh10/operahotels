"use client";

import React, { useEffect, useState, useCallback } from "react";

export type DestinationSubnavItem = {
  id: string | number;
  slug: string;
  label: string;
};

interface DestinationSubnavProps {
  items: DestinationSubnavItem[];
}

export default function DestinationSubnav({ items }: DestinationSubnavProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(items[0]?.slug || null);

  const scrollToSection = useCallback((slug: string) => {
    setActiveSlug(slug);
    const targetElement = document.getElementById(slug);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // If page was loaded with a hash in URL (e.g. #ajman), scroll to it and remove the hash so URL stays clean
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        scrollToSection(hash);
      }
      // Clean the hash without triggering a page reload or state change
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, [scrollToSection]);

  // Track the active section based on scroll position
  useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="uae-subnav">
      {items.map((item) => {
        const isActive = activeSlug === item.slug;
        return (
          <button
            type="button"
            key={item.id}
            className={`uae-subnav-link ${isActive ? "active" : ""}`}
            onClick={() => scrollToSection(item.slug)}
            aria-label={`Scroll to ${item.label}`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
