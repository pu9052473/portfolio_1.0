"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Github, X, ArrowRight, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string[];
  technologies: string[];
  imageUrl: string;
  githubLink: string;
  liveLink: string;
}

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      title: "Project Management System",
      description: [
        "Developed a platform for managing organizations, members, and projects.",
        "Key features: ",
        "User authentication for secure access. Role-based organization and member management. Project tracking with statuses: Pending, In-Progress, Completed. Drag-and-drop status updates and task assignment. Collaborative commenting system on project cards.",
      ],
      technologies: ["React", "TypeScript", "Tailwind"],
      imageUrl: "/PMS.png",
      githubLink:
        "https://github.com/pu9052473/MY_WD301/tree/main/smarter-tasks",
      liveLink: "https://wd301-kvn5.onrender.com/signup",
    },
    {
      title: "Learning Management System",
      description: [
        "Built an LMS with secure user authentication, course creation, and progress tracking.",
        "Key features: ",
        "Sign up, login, and password recovery functionalities. Course creation for educators and performance analytics. Advanced search for easy course discovery.",
      ],
      technologies: ["Node.js", "Express.js", "EJS", "Jest.js", "PostgreSQL"],
      imageUrl: "/LMS.png",
      githubLink: "https://github.com/pu9052473/LMS",
      liveLink: "https://lms-gzxi.onrender.com/",
    },
    {
      title: "Todo Manager",
      description: [
        "Created a full-stack web application with user authentication and task management.",
        "Key features: ",
        "Secure sign-up and login. Add, display, and delete tasks on a dynamic Todos page.",
      ],
      technologies: ["Node.js", "Express.js", "EJS", "Jest.js", "PostgreSQL"],
      imageUrl: "/TO-DO.png",
      githubLink: "https://github.com/pu9052473/MY_WD201",
      liveLink: "https://to-do-system.onrender.com",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <section className="py-5 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-amber-300 via-purple-500 to-amber-300 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-purple-900/30 
                rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm border border-purple-500/20"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transform transition-transform duration-500 hover:scale-110"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent
                    flex flex-col justify-end p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-purple-500/30 rounded-full text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      onClick={() => setSelectedProject(project)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full
                        flex items-center gap-2 text-sm transition-colors duration-300"
                    >
                      <Eye size={16} />
                      Details
                    </motion.button>
                    <motion.a
                      variants={buttonVariants}
                      whileHover="hover"
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full
                        flex items-center gap-2 text-sm transition-colors duration-300"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-start justify-center 
        overflow-y-auto pt-16 pb-6 px-4 sm:px-6"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedProject(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gradient-to-br from-purple-900/90 via-purple-800/90 to-purple-900/90 
          rounded-xl w-full max-w-4xl relative border border-purple-500/30 backdrop-blur-md
          my-auto"
              >
                {/* Sticky Header with Close Button */}
                <div
                  className="sticky top-0 z-10 flex justify-between items-center p-4 
          bg-gradient-to-b from-purple-900/90 to-purple-900/60 backdrop-blur-md
          border-b border-purple-500/30 rounded-t-xl"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white pr-8">
                    {selectedProject.title}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedProject(null)}
                    className="bg-red-500/20 hover:bg-red-500 p-2 rounded-full 
              transition-colors duration-300 flex-shrink-0"
                  >
                    <X className="text-white w-5 h-5" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Image Container */}
                    <div
                      className="relative w-full aspect-video sm:aspect-[4/3] lg:aspect-auto lg:h-[400px] 
              rounded-lg overflow-hidden"
                    >
                      <Image
                        src={selectedProject.imageUrl}
                        alt={selectedProject.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-lg"
                        priority
                      />
                    </div>

                    {/* Project Details */}
                    <div className="space-y-6">
                      {/* Description */}
                      <div className="space-y-3 text-gray-300">
                        {selectedProject.description.map((desc, index) => (
                          <p key={index} className="text-sm sm:text-base">
                            {desc}
                          </p>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                          Technologies Used
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="bg-purple-600/50 text-white px-3 py-1 rounded-full 
                        text-xs sm:text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full 
                    flex items-center justify-center gap-2 transition-colors duration-300
                    text-sm sm:text-base"
                        >
                          <Github size={18} />
                          View Code
                          <ArrowRight size={16} className="hidden sm:block" />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={selectedProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full 
                    flex items-center justify-center gap-2 transition-colors duration-300
                    text-sm sm:text-base"
                        >
                          <ExternalLink size={18} />
                          Live Demo
                          <ArrowRight size={16} className="hidden sm:block" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
