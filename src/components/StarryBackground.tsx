"use client";

import React, { RefObject } from "react";
import { useStarryBackground } from "@/hooks/useStarryBackground";

interface StarryBackgroundProps {
  heroRef: RefObject<HTMLDivElement>;
  patternRef: RefObject<HTMLDivElement>;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({
  heroRef,
  patternRef,
}) => {
  const { mousePosition, stars, orbs } = useStarryBackground(heroRef);

  return (
    <div
      ref={patternRef}
      className="absolute inset-0 z-0 opacity-70 dark:opacity-100 pointer-events-none overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_700px_at_50%_50%,#3498db10,transparent)] dark:bg-[radial-gradient(circle_700px_at_50%_50%,#12121530,transparent)]" />

      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${star.shine ? "animate-pulse" : ""}`}
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: star.opacity,
              backgroundColor: star.shine ? "#ffffff" : "#f8f8f8",
              boxShadow: `0 0 ${star.size * (star.shine ? 4 : 2)}px rgba(255, 255, 255, ${star.shine ? 0.9 : star.opacity})`,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
              transform: star.shine ? `scale(1.5)` : `scale(1)`,
              transition:
                "box-shadow 0.5s ease-out, opacity 0.5s ease-out, transform 0.5s ease-out",
              zIndex: star.shine ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Larger glowing orbs */}
      {orbs.map((orb) => (
        <div
          key={`orb-${orb.id}`}
          className="absolute rounded-full bg-blue-500/10 dark:bg-blue-300/5 blur-3xl"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            opacity: orb.opacity,
            background: `radial-gradient(circle, hsla(${orb.hue}, 80%, 70%, ${orb.opacity * 2}) 0%, transparent 70%)`,
            transform: `translate(${(mousePosition.x - (heroRef.current?.clientWidth || 0) / 2) * -0.02 * orb.parallaxFactor}px, ${(mousePosition.y - (heroRef.current?.clientHeight || 0) / 2) * -0.02 * ((orb.id % 2) + 1)}px)`,
            transition: "transform 0.8s ease-out",
          }}
        />
      ))}

      {/* Single large meteor with longer interval */}
      <div
        className="absolute w-[300px] h-[3px] bg-gradient-to-r from-transparent via-white to-transparent"
        style={{
          left: `${Math.random() * 70}%`,
          top: `${Math.random() * 40}%`,
          opacity: 0.9,
          transform: "rotate(-45deg)",
          animation: `shootingstar 8s linear infinite`,
          animationDelay: "5s",
          boxShadow:
            "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(70, 130, 240, 0.6)",
        }}
      />
    </div>
  );
};

export default StarryBackground;
