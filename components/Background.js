"use client";

import PrismaticBurst from "./PrismaticBurst";

export default function Background() {
  return (
    <div className="bg-root">
      <PrismaticBurst
        animationType="rotate3d"
        intensity={2.4}
        speed={0.45}
        distort={2.2}
        paused={false}
        offset={{ x: 0, y: 0 }}
        hoverDampness={0.25}
        rayCount={24}
        mixBlendMode="normal"
        colors={["#18af19", "#ffffff", "#8ef510", "#ff7a18"]}
      />
      <div className="bg-wash" />
    </div>
  );
}