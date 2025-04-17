"use client";

import React, { useRef, lazy, Suspense } from "react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { useStarryBackground } from "@/hooks/useStarryBackground";
// Lazy load components for better initial load performance
const StarryBackground = lazy(() => import("./StarryBackground"));
const TechIcons = lazy(() => import("./TechIcons"));
const HeroContent = lazy(() => import("./HeroContent"));
const MouseFollower = lazy(() => import("./MouseFollower"));

interface HeroSectionProps {
  name?: string;
  title?: string;
  introduction?: string;
  backgroundPattern?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  name = "Saswat Ranjan",
  title = "MERN/Front-End Developer",
  introduction = "Hi, I'm Saswat Ranjan. A passionate Front-end React Developer & MERN stack Developer based in Bhubaneswar.",
  backgroundPattern = true,
}) => {
  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);
  const projectBtnRef = useRef<HTMLButtonElement>(null);
  const resumeBtnRef = useRef<HTMLButtonElement>(null);

  // Custom hooks
  const { mousePosition } = useStarryBackground(heroRef);
  useMagneticEffect([projectBtnRef, resumeBtnRef]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Starry background with mouse movement */}
      <Suspense
        fallback={<div className="absolute inset-0 bg-background"></div>}
      >
        {backgroundPattern && (
          <StarryBackground heroRef={heroRef} patternRef={patternRef} />
        )}
      </Suspense>

      {/* Floating tech icons with cursor attraction */}
      <Suspense fallback={null}>
        <TechIcons heroRef={heroRef} mousePosition={mousePosition} />
      </Suspense>

      {/* Hero content with text animations */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="w-20 h-20 border-t-4 border-primary rounded-full animate-spin"></div>
          </div>
        }
      >
        <HeroContent
          textRef={textRef}
          projectBtnRef={projectBtnRef}
          resumeBtnRef={resumeBtnRef}
          name={name}
          title={title}
          introduction={introduction}
        />
      </Suspense>

      {/* Mouse follower effect */}
      <Suspense fallback={null}>
        <MouseFollower mousePosition={mousePosition} />
      </Suspense>
    </section>
  );
};

export default HeroSection;
