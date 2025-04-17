"use client";

import React, { RefObject } from "react";
import { motion } from "framer-motion";

interface MouseFollowerProps {
  mousePosition: { x: number; y: number };
}

const MouseFollower: React.FC<MouseFollowerProps> = ({ mousePosition }) => {
  return (
    <div
      className="absolute pointer-events-none w-40 h-40 md:w-60 md:h-60 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-blue-500/20 dark:to-purple-500/10 blur-3xl will-change-transform animate-pulse"
      style={{
        transform: `translate3d(${mousePosition.x - 100}px, ${mousePosition.y - 100}px, 0)`,
        WebkitTransform: `translate3d(${mousePosition.x - 100}px, ${mousePosition.y - 100}px, 0)`,
        transition: "transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)",
        opacity: 0.4,
      }}
    />
  );
};

export default MouseFollower;
