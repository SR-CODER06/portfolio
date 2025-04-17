"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "#" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Social",
      links: [
        { name: "GitHub", href: "https://github.com/" },
        { name: "LinkedIn", href: "https://linkedin.com/in/" },
        { name: "Twitter", href: "https://twitter.com/" },
        { name: "Instagram", href: "https://instagram.com/" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Resume", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Portfolio", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <motion.span
                className="text-xl font-bold text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Saswat
              </motion.span>
              <motion.span
                className="text-xl font-bold text-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                .dev
              </motion.span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              A passionate Front-end React Developer & MERN stack Developer
              based in Bhubaneswar, India.
            </p>
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp size={16} />
              Back to top
            </motion.button>
          </div>

          {/* Footer links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors relative inline-block overflow-hidden group"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                        {link.name}
                      </span>
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
                        initial={{ width: 0, opacity: 0 }}
                        whileHover={{ width: "100%", opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-full bg-primary/5 rounded-md"
                        initial={{ y: "100%", opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <motion.p className="mb-4 md:mb-0" whileHover={{ scale: 1.02 }}>
            © {currentYear} Saswat Ranjan. All rights reserved.
          </motion.p>
          <motion.p
            className="flex items-center gap-1"
            whileHover={{ scale: 1.02 }}
          >
            Made with <Heart size={14} className="text-red-500 animate-pulse" />{" "}
            using Next.js & Tailwind CSS
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
