"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface UIContextType {
  isNavOpen: boolean;
  setIsNavOpen: (v: boolean) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (v: boolean) => void;
  closeAll: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const closeAll = () => {
    setIsNavOpen(false);
    setIsBookingOpen(false);
  };

  useEffect(() => {
    if (isNavOpen || isBookingOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavOpen, isBookingOpen]);

  return (
    <UIContext.Provider value={{ isNavOpen, setIsNavOpen, isBookingOpen, setIsBookingOpen, closeAll }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
