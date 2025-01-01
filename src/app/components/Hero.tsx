"use client";

import React, { FC, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
} from "react-icons/si";
import { Github, Linkedin } from "lucide-react";
import { SocialButtonProps, TechIconProps } from "@/types/globals";

const TechIcon: FC<TechIconProps> = ({ Icon, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Handle touch devices
  const handleTouchStart = () => {
    setIsClicked(!isClicked);
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.15,
      rotate: [0, 5, -5, 0],
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.95,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

if (isHovered) console.log('Hovered!');

  return (
    <div className="relative">
      <motion.div
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsClicked(false);
        }}
        onTouchStart={handleTouchStart}
        variants={iconVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        {/* Glow effect background */}
        <motion.div
          className={`absolute inset-0 rounded-full blur-xl opacity-0
            group-hover:opacity-20 transition-opacity duration-300`}
          style={{
            backgroundColor: color.includes("white")
              ? "#fff"
              : color
                  .replace("text-", "")
                  .replace("-500", "")
                  .replace("-700", ""),
          }}
        />

        {/* Icon */}
        <div
          className={`relative ${color} 
          text-3xl sm:text-4xl md:text-5xl
          transition-all duration-300 ease-in-out
          group-hover:text-opacity-100 text-opacity-70 cursor-pointer
          transform group-hover:shadow-lg`}
        >
          <Icon />
        </div>
      </motion.div>
    </div>
  );
};

const SocialButton: FC<SocialButtonProps> = ({ Icon, label, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-2 px-4 py-2 rounded-full
      bg-white/10 hover:bg-white/20 transition-all duration-300
      text-sm md:text-base"
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </motion.a>
);

const Hero = () => {
  const ref = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) console.log('Hovered!');


  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const technologies = [
    {
      Icon: SiHtml5,
      color: "text-orange-500",
      name: "HTML5",
      description: "Semantic markup & accessibility",
    },
    {
      Icon: SiCss3,
      color: "text-blue-500",
      name: "CSS3",
      description: "Modern layouts & animations",
    },
    {
      Icon: SiJavascript,
      color: "text-yellow-500",
      name: "JavaScript",
      description: "ES6+ & DOM manipulation",
    },
    {
      Icon: SiReact,
      color: "text-sky-500",
      name: "React",
      description: "Component-based architecture",
    },
    {
      Icon: SiNodedotjs,
      color: "text-green-500",
      name: "Node.js",
      description: "Server-side JavaScript",
    },
    {
      Icon: SiExpress,
      color: "text-white",
      name: "Express.js",
      description: "RESTful API development",
    },
    {
      Icon: SiTailwindcss,
      color: "text-teal-500",
      name: "Tailwind",
      description: "Utility-first CSS framework",
    },
    {
      Icon: SiNextdotjs,
      color: "text-white",
      name: "Next.js",
      description: "React framework for production",
    },
    {
      Icon: SiTypescript,
      color: "text-blue-700",
      name: "TypeScript",
      description: "Type-safe JavaScript",
    },
  ];

  return (
    <motion.div
      ref={ref}
      style={{ y: backgroundY, opacity }}
      className="relative min-h-screen flex flex-col justify-center items-center 
        bg-gradient-to-br from-gray-900 via-purple-900 to-black 
        text-white p-4 overflow-hidden"
    >
      <motion.div
        style={{ y: textY }}
        className="text-center z-10 relative max-w-4xl mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 
              bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500
              text-transparent bg-clip-text"
          >
            Panchal Uday Dipakbhai
          </motion.h1>

          <motion.p
            className="text-xl md:text-3xl lg:text-4xl text-amber-300 mb-4 
              tracking-wider font-light"
          >
            Full Stack Web Developer
          </motion.p>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 
              max-w-2xl mx-auto leading-relaxed"
          >
            Crafting innovative web solutions with a passion for cutting-edge
            technologies
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <SocialButton
              Icon={Github}
              label="GitHub"
              href="https://github.com/pu9052473"
            />
            <SocialButton
              Icon={Linkedin}
              label="LinkedIn"
              href="https://www.linkedin.com/in/uday-panchal-b1b228299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            />
          </motion.div>
        </motion.div>

        {/* Technologies Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10
            p-6 md:p-8 lg:p-10 rounded-xl 
            bg-black/20 backdrop-blur-sm
            border border-amber-500/20"
        >
          {technologies.map((tech, index) => (
            <TechIcon key={index} {...tech} />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
