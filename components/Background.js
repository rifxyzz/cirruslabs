"use client";

import Aurora from "./Aurora";

export default function Background() {
  return (
    <div className="bg-root" aria-hidden>
      <video
        className="bg-video"
        src="/clouds.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="bg-aurora">
        <Aurora
          colorStops={["#007bff", "#ece8e8", "#60e9ff"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
          lightMode
        />
      </div>
      <div className="bg-wash" />
    </div>
  );
}
