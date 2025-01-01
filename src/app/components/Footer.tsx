import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram, FaHeart } from 'react-icons/fa';

export const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  
  const socialLinks = [
    {
      id: 'linkedin',
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/uday-panchal-b1b228299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      label: 'LinkedIn',
      color: '#0077b5'
    },
    {
      id: 'github',
      icon: FaGithub,
      href: 'https://github.com/pu9052473',
      label: 'GitHub',
    },
    {
      id: 'instagram',
      icon: FaInstagram,
      href: 'https://www.instagram.com/p_uday_1003/',
      label: 'Instagram',
      color: '#e4405f'
    }
  ];

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.3,
        rotate: {
          duration: 0.5,
          repeat: 0
        }
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.footer 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-5 bg-gradient-to-t from-purple-900/30 to-transparent"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-8"
        >
          {/* Social Links */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 md:gap-8"
          >
            {socialLinks.map(({ id, icon: Icon, href, label, color }) => (
              <motion.div
                key={id}
                className="relative group"
                onHoverStart={() => setHoveredIcon(id)}
                onHoverEnd={() => setHoveredIcon(null)}
              >
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-full bg-gray-800/50 backdrop-blur-sm 
                    hover:bg-gray-700/50 transition-colors duration-300"
                  variants={iconVariants}
                  whileHover="hover"
                  aria-label={label}
                >
                  <Icon 
                    size={28} 
                    className="text-white transition-colors duration-300"
                    style={{ color: hoveredIcon === id ? color : 'white' }}
                  />
                </motion.a>
                
                {/* Tooltip */}
                <motion.span
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ 
                    opacity: hoveredIcon === id ? 1 : 0,
                    y: hoveredIcon === id ? 0 : 20,
                    scale: hoveredIcon === id ? 1 : 0.8
                  }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2
                    text-sm text-white bg-gray-800 px-2 py-1 rounded whitespace-nowrap"
                >
                  {label}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div 
            className="w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Copyright */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm md:text-base"
            variants={containerVariants}
          >
            <motion.p 
              className="text-gray-400"
              whileHover={{ scale: 1.02 }}
            >
              © {new Date().getFullYear()} Uday Panchal.
            </motion.p>
            <motion.p 
              className="flex items-center gap-2 text-gray-400"
              whileHover={{ scale: 1.02 }}
            >
              Made with <FaHeart className="text-red-500 animate-pulse" /> All Rights Reserved.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;