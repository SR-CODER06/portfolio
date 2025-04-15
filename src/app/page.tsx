"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import CustomCursor from "@/components/CustomCursor";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Import ScrollTrigger
if (typeof window !== "undefined") {
  // This is now handled in the useEffect to avoid SSR issues
}

export default function Home() {
  // Register GSAP ScrollTrigger plugin
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ScrollTriggerInstance = require("gsap/ScrollTrigger").ScrollTrigger;
      gsap.registerPlugin(ScrollTriggerInstance);
    }
  }, []);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Portfolio data
  const portfolioData = {
    name: "Saswat Ranjan",
    location: "Bhubaneswar, Odisha, India",
    title: "MERN/Front-End Developer",
    introduction:
      "Hi, I'm Saswat Ranjan. A passionate Front-end React Developer & MERN stack Developer based in Bhubaneswar.",
    about: {
      current_position: "Software Development Engineer I (SDE 1) at HyScaler",
      education: {
        postgraduate:
          "MCA from United School of Business Management, Bhubaneswar",
        undergraduate: "BSc from Utkal University",
      },
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "React Native",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Git",
        "GitHub",
        "Tailwind",
        "Bootstrap",
        "Java (SE)",
        "C",
      ],
      description:
        "I'm a Software Development Engineer (SDE 1) at HyScaler, specializing in React, React Native, and Node.js. With a Master's in Computer Applications,",
      description2:
        "I focus on building responsive UIs and backend solutions. I'm passionate about continuous learning and keeping up with industry trends..",
      location: "Bhubaneswar, Odisha, India",
      email: "contact@saswatmohanty.com",
    },
    projects: [
      { project_name: "Yelp-Camp", code_link: "https://github.com/..." },
      {
        project_name: "Spotify-Music-App",
        code_link: "https://github.com/...",
      },
      { project_name: "Movie-App", code_link: "https://github.com/..." },
      { project_name: "Zoom-Clone-App", code_link: "https://github.com/..." },
      { project_name: "Note-Taker", code_link: "https://github.com/..." },
      {
        project_name: "Food-Ordering-App",
        code_link: "https://github.com/...",
      },
    ],
    experience: [
      {
        title: "Software Development Engineer 1",
        company: "HyScaler",
        duration: "Apr 2025 - present",
        location: "Bhubaneswar, Odisha, India · On-site",
        type: "Full-time",
        description:
          "Working on React Native, and developing multiple web and mobile/Web applications.",
        skills: ["Django REST Framework", "React Native", "Swift"],
        logo: "/path_to_logo_image",
      },
      {
        title: "Junior Software Developer",
        company: "HyScaler",
        duration: "Apr 2024 - Apr 2025",
        location: "Bhubaneswar, Odisha, India · On-site",
        type: "Full-time",
        description:
          "Working on Django REST Framework, React Native, and developing multiple web and mobile applications.",
        skills: ["Django REST Framework", "React Native", "+5 skills"],
        logo: "/path_to_logo_image",
      },
      {
        title: "Apprentice Trainee",
        company: "HyScaler",
        duration: "Aug 2023 - Mar 2024 (8 mos)",
        location: "Bhubaneswar, Odisha, India · On-site",
        type: "Trainee",
        description:
          "Gaining hands-on experience in React.js, React Native, and other web technologies.",
        skills: ["React.js", "React Native", "+4 skills"],
        logo: "/path_to_logo_image",
      },
    ],
    contact: {
      message:
        "Feel free to contact with me. Let's Talk. Don't wish for it! Work for it!",
    },
  };

  useEffect(() => {
    setIsMounted(true);

    // Initialize GSAP animations
    if (typeof window !== "undefined") {
      // Skills section animation with enhanced effects
      gsap.from(".skill-badge", {
        scrollTrigger: {
          trigger: "#skills-section",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      // Experience timeline animation with enhanced effects
      gsap.from(".experience-card", {
        scrollTrigger: {
          trigger: "#experience-section",
          start: "top 70%",
          end: "bottom 50%",
          toggleActions: "play none none reverse",
          scrub: 0.5, // Smooth scrubbing effect tied to scroll
        },
        x: -100,
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        stagger: 0.4,
        ease: "power3.out",
      });

      // Timeline dots animation
      gsap.from(".timeline-dot", {
        scrollTrigger: {
          trigger: "#experience-section",
          start: "top 70%",
          end: "bottom 50%",
          toggleActions: "play none none reverse",
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.4,
        ease: "back.out(2)",
      });

      // About section animation
      gsap.from("#about-section .content", {
        scrollTrigger: {
          trigger: "#about-section",
          start: "top 70%",
          end: "bottom 50%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
      });
    }
  }, []);

  if (!isMounted) {
    return null; // Prevent hydration issues
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <CustomCursor />
      <Navbar />

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0% 0%" }}
      />

      {/* Scroll down indicator */}
      <motion.div
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-40"
        style={{ opacity: progressOpacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Hero Section */}
      <HeroSection
        name={portfolioData.name}
        title={portfolioData.title}
        introduction={portfolioData.introduction}
      />

      {/* About Section */}
      <section
        id="about-section"
        className="py-20 px-4 md:px-8 lg:px-16 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center content">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-lg border-4 border-primary/20 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800&q=80"
                  alt="Saswat Ranjan"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">
                {portfolioData.about.current_position}
              </h3>
              <p className="text-muted-foreground mb-4">
                {portfolioData.about.description}
              </p>
              <p className="text-muted-foreground mb-6">
                {portfolioData.about.description2}
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-muted-foreground">
                      {portfolioData.about.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">
                      {portfolioData.about.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Education</h4>
                    <p className="text-muted-foreground">
                      {portfolioData.about.education.postgraduate}
                    </p>
                    <p className="text-muted-foreground">
                      {portfolioData.about.education.undergraduate}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section - Completely redesigned with icons */}
      <section
        id="skills-section"
        className="py-20 px-4 md:px-8 lg:px-16 bg-muted/30 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
            <motion.div
              className="w-20 h-1 bg-primary mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Skills categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Frontend Skills */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-lg border border-primary/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h10" />
                    <path d="M7 12h10" />
                    <path d="M7 17h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Frontend</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React",
                  "React Native",
                  "Tailwind",
                  "Bootstrap",
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center p-3 bg-background rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.toLowerCase().replace(" ", "")}/${skill.toLowerCase().replace(" ", "")}-original.svg`}
                      alt={skill}
                      className="w-10 h-10 mb-2"
                      onError={(e) => {
                        // Fallback if original icon not found
                        e.currentTarget.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.toLowerCase().replace(" ", "")}/${skill.toLowerCase().replace(" ", "")}-plain.svg`;
                      }}
                    />
                    <span className="text-xs font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Backend Skills */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-lg border border-primary/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M18 6V4H6v2" />
                    <path d="M18 16v2H6v-2" />
                    <path d="M12 4v16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Backend</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "Django",
                  "FastAPI",
                  "Prisma",
                  "NestJS",
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center p-3 bg-background rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.toLowerCase().replace(".js", "").replace(" ", "")}/${skill.toLowerCase().replace(".js", "").replace(" ", "")}-original.svg`}
                      alt={skill}
                      className="w-10 h-10 mb-2"
                      onError={(e) => {
                        // Fallback if original icon not found
                        e.currentTarget.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.toLowerCase().replace(".js", "").replace(" ", "")}/${skill.toLowerCase().replace(".js", "").replace(" ", "")}-plain.svg`;
                      }}
                    />
                    <span className="text-xs font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tools & Others */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-lg border border-primary/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Tools & Others</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {["Git", "GitHub", "Docker", "AWS", "Java", "Python", "C"].map(
                  (skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center justify-center p-3 bg-background rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.toLowerCase().replace(" ", "")}/${skill.toLowerCase().replace(" ", "")}-original.svg`}
                        alt={skill}
                        className="w-10 h-10 mb-2"
                        onError={(e) => {
                          // Fallback if original icon not found
                          e.currentTarget.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.toLowerCase().replace(" ", "")}/${skill.toLowerCase().replace(" ", "")}-plain.svg`;
                        }}
                      />
                      <span className="text-xs font-medium">{skill}</span>
                    </motion.div>
                  ),
                )}
              </div>
            </motion.div>
          </div>

          {/* Skill meter section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 shadow-lg border border-primary/10"
          >
            <h3 className="text-xl font-bold mb-6 text-center">
              Proficiency Levels
            </h3>
            <div className="space-y-6">
              {[
                { name: "Frontend Development", percentage: 90 },
                { name: "Backend Development", percentage: 85 },
                { name: "Mobile App Development", percentage: 80 },
                { name: "UI/UX Design", percentage: 75 },
                { name: "DevOps", percentage: 70 },
              ].map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary">{skill.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      transition={{
                        duration: 1,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </section>

      {/* Experience Section - Enhanced with animations */}
      <section
        id="experience-section"
        className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Work Experience
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="relative">
            {/* Timeline line with animation */}
            <motion.div
              className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-primary/20"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* Animated progress indicator */}
              <motion.div
                className="absolute top-0 left-0 w-full bg-primary rounded-full"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                viewport={{ once: false, amount: 0.1 }}
              />
            </motion.div>

            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: index * 0.3,
                  staggerChildren: 0.1,
                }}
                viewport={{ once: false, amount: 0.3 }}
                className={`experience-card mb-12 md:mb-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"}`}
              >
                <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
                  <CardContent className="p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="flex items-center mb-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{exp.title}</h3>
                        <p className="text-primary">{exp.company}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mb-4"
                    >
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {exp.duration}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {exp.location}
                      </div>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-muted-foreground mb-4"
                    >
                      {exp.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex flex-wrap gap-2"
                    >
                      {exp.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>

                {/* Timeline dot with animation */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.3 + 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                  }}
                  className="timeline-dot absolute left-0 md:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/20"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects-section"
        className="py-20 px-4 md:px-8 lg:px-16 bg-muted/30 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.project_name}
                description="A detailed project description would go here. This is a placeholder text to demonstrate the layout."
                image={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80`}
                technologies={["React", "Node.js", "MongoDB"]}
                codeLink={project.code_link}
                demoLink="#"
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Contact Section */}
      <section
        id="contact-section"
        className="py-20 px-4 md:px-8 lg:px-16 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {portfolioData.contact.message}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl shadow-xl border border-primary/10 p-8 max-w-3xl mx-auto"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                type="submit"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-primary/10 py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Saswat.dev</h3>
              <p className="text-muted-foreground mb-6">
                Junior Software Developer specialized in React, React Native,
                and Node.js development. Based in Bhubaneswar, Odisha, India.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="mailto:contact@saswatmohanty.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about-section"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#experience-section"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Experience
                  </a>
                </li>
                <li>
                  <a
                    href="#skills-section"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#projects-section"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#contact-section"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3 text-primary mt-1"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-muted-foreground">
                    {portfolioData.location}
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3 text-primary mt-1"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="text-muted-foreground">
                    {portfolioData.about.email}
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3 text-primary mt-1"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-muted-foreground">+91 98765 43210</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 opacity-20" />

          <div className="text-center text-muted-foreground text-sm">
            <p>© 2025 Saswat Ranjan Mohanty. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
