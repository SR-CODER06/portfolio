"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  shine: boolean;
}

const GlobalStarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  // Generate stars only once on mount
  useEffect(() => {
    const generateStars = () => {
      // Reduce number of stars for better performance
      const newStars = Array.from({ length: 70 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        shine: false,
      }));
      setStars(newStars);
    };

    generateStars();

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Handle mouse movement with throttling
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse move events
      const now = Date.now();
      if (now - lastTimeRef.current > 50) {
        // Only update every 50ms
        lastTimeRef.current = now;

        if (containerRef.current) {
          const { clientWidth, clientHeight } = document.documentElement;
          setMousePosition({ x: e.clientX, y: e.clientY });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Random star shine effect with reduced frequency
  useEffect(() => {
    const makeRandomStarShine = () => {
      setStars((prevStars) => {
        // Only update if we have stars
        if (prevStars.length === 0) return prevStars;

        const newStars = [...prevStars];
        const randomIndex = Math.floor(Math.random() * newStars.length);

        // Make the star shine
        newStars[randomIndex] = {
          ...newStars[randomIndex],
          shine: true,
          size: newStars[randomIndex].size * 4,
          opacity: 1,
        };

        // Reset the star after a short duration
        setTimeout(() => {
          setStars((currentStars) => {
            // Safety check
            if (
              currentStars.length === 0 ||
              randomIndex >= currentStars.length
            ) {
              return currentStars;
            }

            const resetStars = [...currentStars];
            resetStars[randomIndex] = {
              ...resetStars[randomIndex],
              shine: false,
              size: resetStars[randomIndex].size / 4,
              opacity: Math.random() * 0.5 + 0.2,
            };
            return resetStars;
          });
        }, 2000);

        return newStars;
      });
    };

    // Reduce frequency of star shine effect
    const shineInterval = setInterval(() => {
      makeRandomStarShine();
    }, 3000); // Increased to 3 seconds

    return () => clearInterval(shineInterval);
  }, []);

  // Create a pattern movement effect with optimized performance
  useEffect(() => {
    const moveStarsInPattern = (timestamp: number) => {
      // Throttle updates to every 200ms for better performance
      if (timestamp - lastTimeRef.current > 200) {
        lastTimeRef.current = timestamp;

        const time = Date.now() / 20000; // Even slower movement

        setStars((prevStars) => {
          return prevStars.map((star) => {
            // Create a wave pattern movement with reduced amplitude
            const offsetX = Math.sin(time + star.id * 0.05) * 1;
            const offsetY = Math.cos(time + star.id * 0.05) * 1;

            return {
              ...star,
              x: (star.x + offsetX + 100) % 100,
              y: (star.y + offsetY + 100) % 100,
            };
          });
        });
      }

      rafIdRef.current = requestAnimationFrame(moveStarsInPattern);
    };

    rafIdRef.current = requestAnimationFrame(moveStarsInPattern);
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background dark:from-background dark:to-background/80" />

      {/* Stars - reduced number for better performance */}
      {stars.slice(0, 50).map((star) => {
        // Calculate subtle movement based on mouse position
        const moveX = (mousePosition.x / window.innerWidth - 0.5) * -3;
        const moveY = (mousePosition.y / window.innerHeight - 0.5) * -3;

        return (
          <div
            key={star.id}
            className={`absolute rounded-full ${star.shine ? "animate-pulse" : ""}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              backgroundColor: star.shine ? "#ffffff" : "#f8f8f8",
              boxShadow: `0 0 ${star.size * (star.shine ? 8 : 2)}px rgba(255, 255, 255, ${star.shine ? 0.9 : star.opacity})`,
              transform: `translate(${moveX * ((star.id % 5) + 1) * 0.1}px, ${moveY * ((star.id % 3) + 1) * 0.1}px)`,
              transition: "transform 0.8s ease-out",
            }}
          />
        );
      })}

      {/* Occasional shooting star - reduced frequency */}
      <motion.div
        className="absolute w-[200px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
        style={{
          top: "20%",
          left: "-10%",
          transform: "rotate(-45deg)",
          opacity: 0,
        }}
        animate={{
          x: ["0%", "120%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatDelay: 30, // Increased delay to reduce CPU usage
          duration: 2,
          ease: "easeOut",
        }}
      />
    </div>
  );
};

export default GlobalStarryBackground;
