"use client";

import React, { RefObject, useMemo } from "react";

interface TechIcon {
  icon: string;
  x: number;
  y: number;
  iconType: string;
}

interface TechIconsProps {
  heroRef: RefObject<HTMLDivElement>;
  mousePosition: { x: number; y: number };
}

// Predefined tech icons with optimized positioning
const techIcons: TechIcon[] = [
  { icon: "react", x: 15, y: 20, iconType: "original" },
  { icon: "javascript", x: 80, y: 15, iconType: "plain" },
  { icon: "typescript", x: 25, y: 70, iconType: "plain" },
  { icon: "nodejs", x: 75, y: 65, iconType: "plain" },
  { icon: "python", x: 60, y: 25, iconType: "plain" },
  { icon: "html5", x: 30, y: 30, iconType: "plain" },
  { icon: "css3", x: 50, y: 15, iconType: "plain" },
  { icon: "mongodb", x: 90, y: 70, iconType: "plain" },
  { icon: "tailwindcss", x: 40, y: 40, iconType: "plain" },
  { icon: "git", x: 65, y: 85, iconType: "plain" },
];

const TechIcons: React.FC<TechIconsProps> = ({ heroRef, mousePosition }) => {
  // Calculate attraction parameters only when mouse position changes
  const iconPositions = useMemo(() => {
    return techIcons.map((tech) => {
      // Only calculate if we have valid mouse position
      if (!mousePosition.x && !mousePosition.y) {
        return { ...tech, directionX: 0, directionY: 0, isNearby: false };
      }

      // Get container dimensions with fallbacks
      const containerWidth = heroRef.current?.clientWidth || 1000;
      const containerHeight = heroRef.current?.clientHeight || 800;

      // Convert mouse position to percentage coordinates
      const mouseX = (mousePosition.x / containerWidth) * 100;
      const mouseY = (mousePosition.y / containerHeight) * 100;

      // Calculate distance with optimized math
      const deltaX = mouseX - tech.x;
      const deltaY = mouseY - tech.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Enhanced attraction parameters
      const attractionThreshold = 25; // Reduced from 30 for more precise control
      const attractionStrength = 20; // Increased from 15 for more responsive movement
      const isNearby = distance < attractionThreshold;

      // Calculate direction with improved precision
      let directionX = 0;
      let directionY = 0;

      if (isNearby) {
        // Normalize direction vector and apply strength
        const normalizedDistance = Math.max(distance, 1);
        directionX = (deltaX / normalizedDistance) * attractionStrength;
        directionY = (deltaY / normalizedDistance) * attractionStrength;

        // Apply non-linear scaling for more natural movement
        const proximityFactor = 1 - distance / attractionThreshold;
        directionX *= proximityFactor * proximityFactor; // Squared for more natural falloff
        directionY *= proximityFactor * proximityFactor;
      }

      return { ...tech, directionX, directionY, isNearby };
    });
  }, [mousePosition.x, mousePosition.y, heroRef]);

  return (
    <>
      {iconPositions.map((tech, index) => (
        <div
          key={index}
          className="absolute z-0 will-change-transform"
          style={{
            left: `${tech.x}%`,
            top: `${tech.y}%`,
            cursor: tech.isNearby ? "pointer" : "default",
            transform: `translate3d(${tech.directionX}px, ${tech.directionY}px, 0) scale(${tech.isNearby ? 1.1 : 1})`,
            transition: `transform ${tech.isNearby ? 0.2 : 0.4}s cubic-bezier(0.25, 0.1, 0.25, 1)`,
            opacity: 1,
          }}
        >
          <div className="bg-background/40 backdrop-blur-sm p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
            <img
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-${tech.iconType}.svg`}
              alt={tech.icon}
              className="w-6 h-6 md:w-8 md:h-8"
              loading="eager"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default TechIcons;
