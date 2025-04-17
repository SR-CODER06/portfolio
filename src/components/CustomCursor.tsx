"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  // Use refs to store the last position for smoother interpolation
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    // Optimization: Use a separate function for animation frame updates
    const animateCursor = () => {
      // Apply smoother easing with optimized calculation
      const easeAmount = 0.15; // Lower value = smoother but slower follow

      const newX =
        lastPositionRef.current.x +
        (position.x - lastPositionRef.current.x) * easeAmount;
      const newY =
        lastPositionRef.current.y +
        (position.y - lastPositionRef.current.y) * easeAmount;

      // Only update DOM if there's a meaningful change (reduces repaints)
      if (
        Math.abs(newX - lastPositionRef.current.x) > 0.01 ||
        Math.abs(newY - lastPositionRef.current.y) > 0.01
      ) {
        lastPositionRef.current = { x: newX, y: newY };

        // Update cursor elements directly for better performance
        const mainCursor = document.getElementById("main-cursor");
        const trailCursor = document.getElementById("trail-cursor");

        if (mainCursor && trailCursor) {
          const transform = `translate3d(${newX}px, ${newY}px, 0) translate(-50%, -50%)`;
          mainCursor.style.transform = transform;

          // Slightly delayed trail effect
          setTimeout(() => {
            trailCursor.style.transform = transform;
          }, 50);
        }
      }

      rafRef.current = requestAnimationFrame(animateCursor);
    };

    // Start animation loop
    rafRef.current = requestAnimationFrame(animateCursor);

    // Optimized mouse move handler with direct state update
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check for pointer cursor less frequently
      if (Math.random() < 0.1) {
        // Only check ~10% of the time
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (target) {
          const computedStyle = window.getComputedStyle(target);
          setIsPointer(computedStyle.cursor === "pointer");
        }
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Use passive event listeners for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, {
      passive: true,
    });
    document.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });

    return () => {
      // Restore default cursor
      document.body.style.cursor = "";

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  // Determine cursor colors based on theme
  const cursorColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)";
  const trailColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";

  return (
    <>
      {/* Main cursor dot with hardware acceleration */}
      <div
        id="main-cursor"
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          width: isPointer ? "40px" : "12px",
          height: isPointer ? "40px" : "12px",
          backgroundColor: cursorColor,
          borderRadius: "50%",
          transition: "width 0.2s, height 0.2s",
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Cursor trail effect with hardware acceleration */}
      <div
        id="trail-cursor"
        className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform"
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: trailColor,
          borderRadius: "50%",
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
};

export default CustomCursor;
