import React from "react";

export default function RootLoading() {
  return (
    <div className="luxury-page-loader-overlay active" role="status" aria-live="polite">
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
