"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Lenis from "@studio-freight/lenis";
import { CustomLenisOptions } from "../types/globals";
import  LoadingScreen  from "@/app/components/LoadingScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and content preparation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5500); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !loading) {
      const lenis = new Lenis({
        duration: 10,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        smoothTouch: true,
        touchMultiplier: 2,
      } as CustomLenisOptions);

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-br from-gray-900 via-purple-800 to-gray-900 min-h-screen text-white overflow-x-hidden"
      >
        <Navbar />
        <section
          id="home"
          className="relative flex flex-col items-center justify-center min-h-screen text-center"
        >
          <Hero />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-[150px] opacity-50"></div>
        </section>

        <section className="relative px-[5%] py-[10%]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            id="about"
            className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-[5%] lg:p-10 rounded-xl shadow-xl backdrop-blur-md"
          >
            <About />
          </motion.div>
        </section>

        <section className="relative px-[5%] py-[10%]">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            id="skills"
            className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-[5%] lg:p-10 rounded-xl shadow-xl backdrop-blur-md"
          >
            <Skills />
          </motion.div>
        </section>

        <section className="relative">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            id="projects"
          >
            <Projects />
          </motion.div>
        </section>

        <section id="contact" className="relative h-[80%]">
          <Contact />
        </section>

        <Footer />
      </motion.div>
    </>
  );
}