'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Book } from 'lucide-react';

const About = () => {
  const [activeEdu, setActiveEdu] = useState<number | null>(null);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  const educationData = [
    {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'Sankalchand Patel College of Engineering',
      year: '2023 - 2027',
      description: 'Focusing on core computer science concepts, advanced programming, and modern web technologies.',
      icon: <Book className="w-6 h-6 text-purple-400" />
    },
    {
      degree: '11th and 12th science',
      institution: 'Seth K.V. High School',
      year: '2021 - 2023',
      description: 'Concentrated on Physics, Chemistry, and Mathematics, laying a strong foundation for engineering.',
      icon: <Book className="w-6 h-6 text-purple-400" />
    },
    {
      degree: '1st to 10th Standard',
      institution: 'Upasana Vidhyalaya',
      year: '2010 - 2020',
      description: 'Built fundamental academic skills and discovered my passion for technology and science.',
      icon: <Book className="w-6 h-6 text-purple-400" />
    }
  ];

  const interests = [
    { 
      interest: 'Coding', 
      emoji: '💻',
      description: 'Passionate about creating innovative solutions and learning new technologies.'
    },
    { 
      interest: 'Music', 
      emoji: '🎵',
      description: 'Enjoy listening to music in my free time.'
    },
    { 
      interest: 'Drawing', 
      emoji: '🎨',
      description: 'Love expressing creativity through digital and traditional art.'
    },
    { 
      interest: 'Gaming', 
      emoji: '🎮',
      description: 'Enthusiast of strategy and puzzle games that challenge the mind.'
    }
  ];

  return (
    <section  className="bg-gradient-to-br from-gray-800 via-purple-900 to-black py-10 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3 flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsImageEnlarged(!isImageEnlarged)}
              className={`relative cursor-pointer transition-all duration-300 ${
                isImageEnlarged ? 'w-72 h-72 sm:w-96 sm:h-96' : 'w-48 h-48 sm:w-64 sm:h-64'
              }`}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-purple-600 hover:border-purple-400 transition-colors duration-300">
                <Image
                  src="/Image.jpeg"
                  alt="Uday Panchal"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-2/3 text-center lg:text-left"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text mb-6"
              whileHover={{ scale: 1.05 }}
            >
              About Me
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                <span className="font-semibold text-purple-400">Hi there! </span>It&apos;m 
                <span className="text-purple-400 font-bold"> Panchal Uday Dipakbhai </span>, 
                a passionate Full Stack Web Developer who loves crafting engaging and 
                interactive web experiences.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Specializing in the 
                <span className="text-purple-400"> MERN stack</span> and 
                <span className="text-purple-400"> Next.js</span>, I enjoy building solutions that 
                are not only functional but also visually appealing.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-amber-300 text-center mb-8">
            Education
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-purple-800/30 rounded-lg shadow-xl overflow-hidden"
              >
                <div
                  onClick={() => setActiveEdu(activeEdu === index ? null : index)}
                  className="p-6 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    {edu.icon}
                    <span className="text-gray-400 text-sm">{edu.year}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">{edu.degree}</h4>
                  <p className="text-purple-300">{edu.institution}</p>
                  
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: activeEdu === index ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-300 mt-4">{edu.description}</p>
                  </motion.div>
                  
                  <button className="mt-4 text-purple-400 hover:text-purple-300 transition-colors duration-300">
                    {activeEdu === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interests & Hobbies Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-amber-300 text-center mb-8">
            Interests & Hobbies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
                className="bg-purple-800/30 p-6 rounded-lg shadow-xl flex flex-col items-center justify-center gap-4 hover:bg-purple-700/30 transition-colors duration-300"
              >
                <span className="text-5xl">{item.emoji}</span>
                <h4 className="text-white text-xl font-semibold">{item.interest}</h4>
                <p className="text-gray-300 text-center text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;