"use client";

import React from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "tools" | "languages";
}

const skills: Skill[] = [
  // Frontend
  { name: "React", icon: "react", category: "frontend" },
  { name: "Next.js", icon: "nextjs", category: "frontend" },
  { name: "TypeScript", icon: "typescript", category: "frontend" },
  { name: "JavaScript", icon: "javascript", category: "frontend" },
  { name: "HTML5", icon: "html5", category: "frontend" },
  { name: "CSS3", icon: "css3", category: "frontend" },
  { name: "Tailwind CSS", icon: "tailwindcss", category: "frontend" },
  { name: "Redux", icon: "redux", category: "frontend" },

  // Backend
  { name: "Node.js", icon: "nodejs", category: "backend" },
  { name: "Express", icon: "express", category: "backend" },
  { name: "MongoDB", icon: "mongodb", category: "backend" },
  { name: "Firebase", icon: "firebase", category: "backend" },
  { name: "PostgreSQL", icon: "postgresql", category: "backend" },

  // Tools
  { name: "Git", icon: "git", category: "tools" },
  { name: "Docker", icon: "docker", category: "tools" },
  { name: "AWS", icon: "amazonwebservices", category: "tools" },
  { name: "Figma", icon: "figma", category: "tools" },

  // Languages
  { name: "Python", icon: "python", category: "languages" },
  { name: "Java", icon: "java", category: "languages" },
  { name: "C++", icon: "cplusplus", category: "languages" },
];

const categories = [
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "tools", name: "Tools & DevOps" },
  { id: "languages", name: "Languages" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I've worked with a variety of technologies in the web development
            world. Here's a showcase of my technical expertise and tools I use
            regularly.
          </p>
        </motion.div>

        <div className="grid gap-10">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center md:text-left">
                {category.name}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {skills
                  .filter((skill) => skill.category === category.id)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                      className="flex flex-col items-center justify-center p-4 rounded-xl bg-card hover:bg-card/80 border border-border/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 mb-3 flex items-center justify-center">
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                          alt={skill.name}
                          onError={(e) => {
                            // Fallback to plain if original doesn't exist
                            (e.target as HTMLImageElement).src =
                              `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-plain.svg`;
                          }}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
