"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    period: "Jan 2022 - Present",
    description: [
      "Led the development of a React-based dashboard that improved user engagement by 40%",
      "Implemented performance optimizations that reduced load time by 60%",
      "Mentored junior developers and conducted code reviews to maintain high code quality",
      "Collaborated with design and product teams to create intuitive user experiences",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
  },
  {
    title: "Full Stack Developer",
    company: "WebSolutions Ltd.",
    period: "Mar 2020 - Dec 2021",
    description: [
      "Developed and maintained multiple client websites using the MERN stack",
      "Built RESTful APIs and integrated third-party services",
      "Implemented responsive designs and ensured cross-browser compatibility",
      "Participated in agile development processes and sprint planning",
    ],
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "AWS"],
  },
  {
    title: "Junior Web Developer",
    company: "Digital Creations",
    period: "Jun 2018 - Feb 2020",
    description: [
      "Created and maintained websites for small to medium-sized businesses",
      "Collaborated with designers to implement pixel-perfect layouts",
      "Optimized websites for maximum speed and scalability",
      "Assisted in troubleshooting and fixing bugs",
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "jQuery", "PHP"],
  },
];

const ExperienceSection = () => {
  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey through various roles and companies,
            showcasing my growth and expertise in the field.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line with animation */}
          <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-muted-foreground/20 transform md:-translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary"
              style={{ height: lineHeight }}
            />
          </div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`relative mb-12 md:mb-24 experience-card ${index % 2 === 0 ? "md:ml-auto md:pl-12 md:pr-0" : "md:mr-auto md:pr-12 md:pl-0"} md:w-1/2 pl-10 md:pl-0`}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 md:left-auto md:right-auto md:translate-x-0 top-0 w-4 h-4 rounded-full bg-primary z-10 timeline-dot"
                style={{ [index % 2 === 0 ? "md:left" : "md:right"]: "-8px" }}
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />

              {/* Content card with hover effect */}
              <motion.div
                className="bg-card p-6 rounded-lg shadow-md border border-border/50 relative z-0"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-sm font-medium text-muted-foreground block mb-2">
                  {exp.period}
                </span>
                <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                <h4 className="text-lg text-primary font-medium mb-4">
                  {exp.company}
                </h4>

                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, i) => (
                    <motion.li
                      key={i}
                      className="text-muted-foreground text-sm flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-primary mr-2 mt-1">•</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{
                        y: -2,
                        backgroundColor: "rgba(var(--primary), 0.2)",
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
