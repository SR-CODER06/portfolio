"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { Button } from "./ui/button";
import { ArrowRight, Download, Github } from "lucide-react";

interface HeroSectionProps {
  name?: string;
  title?: string;
  introduction?: string;
  backgroundPattern?: boolean;
}

const HeroSection = ({
  name = "Saswat Ranjan",
  title = "MERN/Front-End Developer",
  introduction = "Hi, I'm Saswat Ranjan. A passionate Front-end React Developer & MERN stack Developer based in Bhubaneswar.",
  backgroundPattern = true,
}: HeroSectionProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const patternRef = useRef<HTMLDivElement>(null);
  const projectBtnRef = useRef<HTMLButtonElement>(null);
  const resumeBtnRef = useRef<HTMLButtonElement>(null);
  const [floatingElements, setFloatingElements] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
    }>
  >([]);

  // Generate floating elements
  useEffect(() => {
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      speed: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    }));
    setFloatingElements(elements);
  }, []);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } =
          heroRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        setMousePosition({ x, y });

        // Move background pattern with enhanced effect
        if (patternRef.current) {
          const moveX = (x - width / 2) * 0.04; // Increased from 0.02
          const moveY = (y - height / 2) * 0.04; // Increased from 0.02
          gsap.to(patternRef.current, {
            x: moveX,
            y: moveY,
            duration: 0.8, // Faster response
            ease: "power3.out", // More fluid easing
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Magnetic effect for buttons with enhanced response
  useEffect(() => {
    const applyMagneticEffect = (
      btnRef: React.RefObject<HTMLButtonElement>,
    ) => {
      if (!btnRef.current) return;

      const btn = btnRef.current;
      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = btn.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const centerX = width / 2;
        const centerY = height / 2;
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2),
        );

        if (distance < 120) {
          // Increased from 100 for wider effect range
          const moveX = (x - centerX) * 0.4; // Increased from 0.3
          const moveY = (y - centerY) * 0.4; // Increased from 0.3
          gsap.to(btn, {
            x: moveX,
            y: moveY,
            scale: 1.05, // Add slight scale effect
            duration: 0.3, // Faster response
            ease: "power3.out", // More fluid easing
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      };

      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    const cleanupProject = applyMagneticEffect(projectBtnRef);
    const cleanupResume = applyMagneticEffect(resumeBtnRef);

    return () => {
      if (cleanupProject) cleanupProject();
      if (cleanupResume) cleanupResume();
    };
  }, []);

  // Text animation when in view with enhanced animations
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 30 }, // Increased from y: 20
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15, // Faster sequence (was 0.2)
        duration: 0.9, // Slightly longer for more fluid motion
        ease: [0.215, 0.61, 0.355, 1], // Cubic bezier for smooth motion
      },
    }),
  };

  // Floating element animation
  const floatingVariants = {
    animate: (i: number) => ({
      x: [`${i % 2 === 0 ? "-10%" : "10%"}`, `${i % 2 === 0 ? "10%" : "-10%"}`],
      y: [`${i % 3 === 0 ? "-15%" : "15%"}`, `${i % 3 === 0 ? "15%" : "-15%"}`],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 10 + i * 2,
          ease: "easeInOut",
        },
        y: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 15 + i * 2,
          ease: "easeInOut",
        },
      },
    }),
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Enhanced background pattern with more elements */}
      {backgroundPattern && (
        <div
          ref={patternRef}
          className="absolute inset-0 z-0 opacity-15 dark:opacity-10 pointer-events-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_700px_at_50%_50%,#3498db,transparent)]" />
          <div className="grid grid-cols-[repeat(30,1fr)] grid-rows-[repeat(30,1fr)] h-full w-full">
            {Array.from({ length: 150 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: Math.random() * 0.8 + 0.2,
                  opacity: Math.random() * 0.5 + 0.2,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.01,
                  ease: "easeOut",
                }}
                className="rounded-full bg-primary/30 dark:bg-primary/20"
                style={{
                  gridColumn: `${(i % 30) + 1} / span 1`,
                  gridRow: `${Math.floor(i / 30) + 1} / span 1`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Floating tech icons with cursor attraction */}
      {[
        { icon: "react", x: 15, y: 20 },
        { icon: "javascript", x: 80, y: 15 },
        { icon: "typescript", x: 25, y: 70 },
        { icon: "node", x: 75, y: 65 },
        { icon: "python", x: 60, y: 25 },
        { icon: "java", x: 10, y: 40 },
        { icon: "aws", x: 85, y: 45 },
        { icon: "docker", x: 40, y: 80 },
        { icon: "git", x: 20, y: 85 },
        { icon: "nextjs", x: 70, y: 80 },
        { icon: "nestjs", x: 30, y: 30 },
        { icon: "prisma", x: 50, y: 15 },
        { icon: "django", x: 90, y: 70 },
        { icon: "fastapi", x: 15, y: 60 },
      ].map((tech, index) => {
        // Calculate distance from mouse to determine attraction with improved precision
        const distance =
          mousePosition.x && mousePosition.y
            ? Math.sqrt(
                Math.pow(
                  (mousePosition.x / (heroRef.current?.clientWidth || 1000)) *
                    100 -
                    tech.x,
                  2,
                ) +
                  Math.pow(
                    (mousePosition.y / (heroRef.current?.clientHeight || 800)) *
                      100 -
                      tech.y,
                    2,
                  ),
              )
            : 100;

        // Enhanced attraction effect when cursor is nearby (increased range from 20% to 30% of screen)
        const isNearby = distance < 30; // Increased from 20 for wider attraction range

        // Direction towards cursor with enhanced attraction
        const directionX = isNearby
          ? (((mousePosition.x / (heroRef.current?.clientWidth || 1000)) * 100 -
              tech.x) /
              distance) *
            25 // Increased from 10 for stronger attraction
          : 0;
        const directionY = isNearby
          ? (((mousePosition.y / (heroRef.current?.clientHeight || 800)) * 100 -
              tech.y) /
              distance) *
            25 // Increased from 10 for stronger attraction
          : 0;

        return (
          <motion.div
            key={index}
            className="absolute z-0"
            style={{
              left: `${tech.x}%`,
              top: `${tech.y}%`,
              cursor: isNearby ? "pointer" : "default",
            }}
            animate={{
              x: isNearby ? directionX : [0, Math.random() * 20 - 10, 0],
              y: isNearby ? directionY : [0, Math.random() * 20 - 10, 0],
              rotate: isNearby
                ? [0, 15, -15, 0]
                : [0, Math.random() * 20 - 10, 0],
              scale: isNearby ? 1.3 : 1, // Increased from 1.2 for more noticeable effect
              opacity: isNearby ? 1 : [0.4, 0.7, 0.4], // Increased from 0.9 for better visibility
            }}
            transition={{
              x: {
                duration: isNearby ? 0.2 : 5 + Math.random() * 5, // Faster response when nearby
                ease: isNearby ? "easeOut" : "easeInOut",
                type: isNearby ? "tween" : "tween",
              },
              y: {
                duration: isNearby ? 0.2 : 5 + Math.random() * 5, // Faster response when nearby
                ease: isNearby ? "easeOut" : "easeInOut",
                type: isNearby ? "tween" : "tween",
              },
              rotate: {
                duration: isNearby ? 0.3 : 5, // Faster rotation response
                repeat: isNearby ? 0 : Infinity,
                ease: "easeInOut",
                type: "tween",
              },
              scale: {
                duration: 0.2, // Faster scaling
                ease: "easeOut",
                type: "tween",
              },
              opacity: {
                duration: isNearby ? 0.2 : 5,
                repeat: isNearby ? 0 : Infinity,
                ease: "easeInOut",
                type: "tween",
              },
              default: {
                repeat: isNearby ? 0 : Infinity,
                ease: "easeInOut",
                type: "tween",
              },
            }}
            whileHover={{ scale: 1.3, rotate: 0 }}
          >
            <div className="bg-background/40 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                alt={tech.icon}
                className="w-8 h-8 md:w-12 md:h-12"
                onError={(e) => {
                  // Fallback if original icon not found
                  e.currentTarget.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-plain.svg`;
                }}
              />
            </div>
          </motion.div>
        );
      })}

      <div
        ref={textRef}
        className="relative z-10 max-w-4xl mx-auto text-center space-y-8"
      >
        <motion.div
          initial="hidden"
          animate={controls}
          custom={0}
          variants={textVariants}
          className="inline-block px-6 py-2 border border-primary/30 rounded-full text-sm font-medium text-primary dark:text-primary-foreground mb-4 backdrop-blur-sm"
        >
          <motion.span
            className="mr-2 inline-block"
            animate={{ rotate: [0, 15, 0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
          >
            👋
          </motion.span>
          Welcome to my portfolio
        </motion.div>

        <motion.h1
          initial="hidden"
          animate={controls}
          custom={1}
          variants={textVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
        >
          {name.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.8 + index * 0.05,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.h2
          initial="hidden"
          animate={controls}
          custom={2}
          variants={textVariants}
          className="text-xl md:text-2xl font-medium text-muted-foreground mt-4"
        >
          <motion.span
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeInOut" }}
            className="inline-block overflow-hidden whitespace-nowrap"
          >
            {title}
          </motion.span>
        </motion.h2>

        <motion.p
          initial="hidden"
          animate={controls}
          custom={3}
          variants={textVariants}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-6"
        >
          {introduction}
        </motion.p>

        <motion.div
          initial="hidden"
          animate={controls}
          custom={4}
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Button
            ref={projectBtnRef}
            size="lg"
            className="group relative overflow-hidden shadow-lg hover:shadow-primary/20"
          >
            <span className="relative z-10 flex items-center">
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>

          <Button
            ref={resumeBtnRef}
            variant="outline"
            size="lg"
            className="group relative overflow-hidden shadow-md hover:shadow-primary/10"
          >
            <span className="relative z-10 flex items-center">
              Download Resume
              <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </span>
            <span className="absolute inset-0 bg-primary/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          custom={5}
          variants={textVariants}
          className="flex justify-center mt-12 opacity-80"
        >
          <motion.div
            className="flex items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <div className="h-10 w-[1px] bg-muted-foreground/50" />
            <span className="text-sm text-muted-foreground">Scroll Down</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced floating elements that follow mouse */}
      <motion.div
        className="absolute pointer-events-none w-60 h-60 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          x: { duration: 0.5, ease: "easeOut" },
          y: { duration: 0.5, ease: "easeOut" },
          scale: { repeat: Infinity, duration: 5, ease: "easeInOut" },
          opacity: { repeat: Infinity, duration: 5, ease: "easeInOut" },
        }}
      />
    </section>
  );
};

export default HeroSection;
