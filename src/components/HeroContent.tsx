"use client";

import React, { RefObject } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Download } from "lucide-react";
import { useTextAnimation } from "@/hooks/useTextAnimation";

interface HeroContentProps {
  textRef: RefObject<HTMLDivElement>;
  projectBtnRef: RefObject<HTMLButtonElement>;
  resumeBtnRef: RefObject<HTMLButtonElement>;
  name: string;
  title: string;
  introduction: string;
}

const HeroContent: React.FC<HeroContentProps> = ({
  textRef,
  projectBtnRef,
  resumeBtnRef,
  name,
  title,
  introduction,
}) => {
  const { controls, textVariants } = useTextAnimation(textRef);

  return (
    <div
      ref={textRef}
      className="relative z-10 max-w-4xl mx-auto text-center space-y-6 md:space-y-8 px-4"
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
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground will-change-transform"
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
        className="text-lg sm:text-xl md:text-2xl font-medium text-muted-foreground mt-3 md:mt-4 will-change-transform"
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
        className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-4 md:mt-6 will-change-transform"
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
  );
};

export default HeroContent;
