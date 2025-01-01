"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Home, User, Code, Briefcase, Mail } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { label: "Home", href: "#home", icon: Home, description: "Enter my digital realm" },
    { label: "About", href: "#about", icon: User, description: "My professional narrative" },
    { label: "Skills", href: "#skills", icon: Code, description: "Technical expertise" },
    { label: "Projects", href: "#projects", icon: Briefcase, description: "Creative innovations" },
    { label: "Contact", href: "#contact", icon: Mail, description: "Let's connect" },
  ];

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-purple-600 origin-left z-50"
        style={{ scaleX: scrollProgress / 100 }}
      />

      <nav className="fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-black/5">
        <div className="container mx-auto flex justify-between items-center py-2 px-4 relative">
          {/* Logo with hover effect */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl tracking-wider cursor-pointer"
          >
            <span className="font-bold bg-gradient-to-r from-purple-500 to-amber-300 bg-clip-text text-transparent">
              {"<"} Uday Panchal {"/>"}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300
                  }}
                  className={`flex items-center gap-0.5 px-4 py-2 rounded-full transition-all duration-300
                    ${activeSection === item.href.substring(1)
                      ? "bg-purple-600 text-white"
                      : "text-amber-300 hover:bg-purple-600/20"}`}
                >
                  <Icon size={18} />
                  {item.label}
                </motion.a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-full bg-purple-600/20 text-amber-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 right-0 w-full md:w-[420px] h-screen 
                bg-gradient-to-br from-black via-purple-900 to-black 
                text-amber-300 p-6 z-50 shadow-2xl overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-light tracking-wider"
                  >
                    Menu
                  </motion.div>
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-purple-600/20"
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Navigation Items */}
                <div className="flex-grow flex flex-col justify-center space-y-4">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: {
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 300
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center justify-between p-4 rounded-xl
                          ${activeSection === item.href.substring(1)
                            ? "bg-purple-600 text-white"
                            : "bg-purple-900/30 border border-purple-800/30"}`}
                      >
                        <div className="flex items-center space-x-4">
                          <Icon size={24} className="opacity-70" />
                          <div>
                            <h3 className="text-xl font-light">{item.label}</h3>
                            <p className="text-sm opacity-60">{item.description}</p>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="opacity-60"
                        >
                          <ArrowUpRight size={24} />
                        </motion.div>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center bg-purple-900/20 rounded-xl p-4"
                >
                  <p className="text-sm">
                    © {new Date().getFullYear()} Uday Panchal
                    <br />
                    <span className="text-xs text-purple-400 mt-1 block">
                      Crafted with precision & passion
                    </span>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;