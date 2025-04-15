"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

interface CustomCursorProps {
  color?: string;
  size?: number;
  ringSize?: number;
  trailEffect?: boolean;
  glowEffect?: boolean;
}

const CustomCursor = ({
  color = "#3b82f6",
  size = 12,
  ringSize = 40,
  trailEffect = true,
  glowEffect = true,
}: CustomCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    // Initialize GSAP for smooth cursor movement
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;

    if (!cursor || !cursorRing) return;

    // Hide default cursor
    document.body.style.cursor = "none";

    // Set up cursor movement with GSAP
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08, // Faster response
        ease: "power3.out", // More fluid easing
      });

      gsap.to(cursorRing, {
        x: e.clientX,
        y: e.clientY,
        duration: trailEffect ? 0.25 : 0.12, // Slightly faster
        ease: "power3.out", // More fluid easing
      });
    };

    // Check for interactive elements with enhanced detection
    const checkInteractive = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"]), .skill-badge, .project-card, .magnetic-element',
      );

      interactiveElements.forEach((el) => {
        // Get data attributes for custom cursor behavior
        const cursorLabel = el.getAttribute("data-cursor-text");
        const cursorStyle = el.getAttribute("data-cursor-style");

        el.addEventListener("mouseenter", () => {
          setIsPointer(true);

          // Set custom text if provided
          if (cursorLabel) {
            setCursorText(cursorLabel);
            setCursorVariant("text");
          } else if (cursorStyle) {
            setCursorVariant(cursorStyle);
          } else {
            setCursorVariant("hover");
          }

          gsap.to(cursorRing, {
            scale: 1.5,
            backgroundColor: "rgba(59, 130, 246, 0.1)", // Light blue background
            duration: 0.3,
            ease: "elastic.out(1, 0.3)",
          });
        });

        el.addEventListener("mouseleave", () => {
          setIsPointer(false);
          setCursorText("");
          setCursorVariant("default");

          gsap.to(cursorRing, {
            scale: 1,
            backgroundColor: "transparent",
            duration: 0.3,
            ease: "elastic.out(1, 0.3)",
          });
        });
      });
    };

    // Handle mouse down/up for click effect with enhanced animation
    const handleMouseDown = () => {
      setIsActive(true);
      gsap.to(cursorRing, {
        scale: 0.8,
        duration: 0.2,
        ease: "power3.out",
        borderColor: "rgba(59, 130, 246, 0.8)", // Brighter border on click
      });

      // Add ripple effect on click
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple";
      ripple.style.position = "fixed";
      ripple.style.top = `${position.y}px`;
      ripple.style.left = `${position.x}px`;
      ripple.style.width = "0";
      ripple.style.height = "0";
      ripple.style.borderRadius = "50%";
      ripple.style.backgroundColor = "rgba(59, 130, 246, 0.3)";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.zIndex = "9997";
      ripple.style.pointerEvents = "none";
      document.body.appendChild(ripple);

      gsap.to(ripple, {
        width: 100,
        height: 100,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          document.body.removeChild(ripple);
        },
      });
    };

    const handleMouseUp = () => {
      setIsActive(false);
      gsap.to(cursorRing, {
        scale: isPointer ? 1.5 : 1,
        borderColor: color,
        duration: 0.2,
        ease: "power3.out",
      });
    };

    // Add event listeners
    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Initial check for interactive elements
    checkInteractive();

    // Set up mutation observer to detect DOM changes and update interactive elements
    const observer = new MutationObserver(checkInteractive);
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
    };
  }, [isPointer, trailEffect, color, position]);

  // Apply enhanced magnetic effect to nearby buttons
  useEffect(() => {
    const applyMagneticEffect = () => {
      const buttons = document.querySelectorAll(
        "button, .magnetic-element, .skill-badge",
      );

      buttons.forEach((button) => {
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const distanceX = position.x - buttonCenterX;
        const distanceY = position.y - buttonCenterY;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY,
        );

        // Apply magnetic effect if cursor is within 120px of button center (increased range)
        if (distance < 120) {
          const strength = 0.4; // Stronger effect (was 0.3)
          const moveX = distanceX * strength;
          const moveY = distanceY * strength;

          gsap.to(button, {
            x: moveX,
            y: moveY,
            scale: 1.05, // Add slight scale effect
            duration: 0.3,
            ease: "power3.out", // More fluid easing
          });
        } else {
          gsap.to(button, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power3.out",
          });
        }
      });
    };

    const interval = setInterval(applyMagneticEffect, 100);

    return () => clearInterval(interval);
  }, [position]);

  // Cursor variants for different states
  const cursorVariants = {
    default: {
      opacity: 1,
      scale: 1,
      backgroundColor: color,
    },
    hover: {
      opacity: 1,
      scale: 1.2,
      backgroundColor: color,
    },
    text: {
      opacity: 1,
      scale: 3,
      backgroundColor: "rgba(59, 130, 246, 0.3)",
    },
    button: {
      opacity: 1,
      scale: 1.4,
      backgroundColor: "rgba(59, 130, 246, 0.5)",
    },
  };

  // Ring variants
  const ringVariants = {
    default: {
      opacity: 0.5,
      scale: 1,
    },
    hover: {
      opacity: 0.7,
      scale: 1.5,
    },
    text: {
      opacity: 0.7,
      scale: 3.5,
    },
    button: {
      opacity: 0.7,
      scale: 2,
    },
  };

  return (
    <>
      {/* Main cursor dot with enhanced animation */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          borderRadius: "50%",
          transform: `translate(-50%, -50%)`,
          mixBlendMode: "difference",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={cursorVariants[cursorVariant as keyof typeof cursorVariants]}
        transition={{ duration: 0.2 }}
      />

      {/* Cursor ring/outline with enhanced animation */}
      <motion.div
        ref={cursorRingRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          border: `2px solid ${color}`,
          borderRadius: "50%",
          transform: `translate(-50%, -50%)`,
          mixBlendMode: "difference",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          ...ringVariants[cursorVariant as keyof typeof ringVariants],
          opacity: isActive
            ? 0.8
            : ringVariants[cursorVariant as keyof typeof ringVariants].opacity,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Text display for cursor when hovering elements with data-cursor-text */}
      <AnimatePresence>
        {cursorText && (
          <motion.div
            className="fixed top-0 left-0 z-[9998] pointer-events-none flex items-center justify-center text-xs font-medium"
            style={{
              color: "#fff",
              transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%))`,
              width: `${ringSize * 3}px`,
              height: `${ringSize * 3}px`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {cursorText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced trail effect elements */}
      {trailEffect && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed top-0 left-0 z-[9997] pointer-events-none"
              style={{
                width: `${size * (1 + i * 0.5)}px`,
                height: `${size * (1 + i * 0.5)}px`,
                backgroundColor: color,
                borderRadius: "50%",
                transform: `translate(-50%, -50%)`,
                opacity: 0.15 - i * 0.03,
              }}
              initial={{ opacity: 0, x: position.x, y: position.y }}
              animate={{
                x: position.x,
                y: position.y,
                opacity: 0.15 - i * 0.03,
              }}
              transition={{ duration: 0.3 + i * 0.1 }}
            />
          ))}
        </>
      )}

      {/* Glow effect */}
      {glowEffect && (
        <motion.div
          className="fixed top-0 left-0 z-[9996] pointer-events-none"
          style={{
            width: "150px",
            height: "150px",
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            borderRadius: "50%",
            transform: `translate(-50%, -50%)`,
          }}
          animate={{
            x: position.x,
            y: position.y,
            scale: isActive ? 1.5 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
      )}
    </>
  );
};

export default CustomCursor;
