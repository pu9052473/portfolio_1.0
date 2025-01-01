'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, 
  SiNodedotjs, SiPython, SiGit, SiGithub, 
  SiPostgresql, SiMongodb, SiFirebase, SiC, 
  SiExpress, SiJest, SiPostman, SiTypescript, SiNextdotjs 
} from 'react-icons/si';
import { AiOutlineJava } from "react-icons/ai";
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { SkillDetailsProps, SkillItemProps } from '@/types/globals';

const SkillItem: React.FC<SkillItemProps> = ({ icon: Icon, name, color, proficiency, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      whileHover={{ 
        scale: 1.05,
        rotate: 3,
        boxShadow: `0px 0px 20px rgba(${color === '#000000' ? '255, 255, 255' : color.replace(/[^\d,]/g, '')}, 0.3)`
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex flex-col items-center justify-center h-28 w-28 bg-purple-800/30 
                 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-sm
                 hover:bg-purple-700/40 border border-transparent hover:border-purple-500/50"
    >
      <motion.div 
        className="mb-3"
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={48} color={color} />
      </motion.div>
      <p className="text-sm text-white font-medium">{name}</p>
      
      {/* Proficiency indicator */}
      <div className="absolute bottom-2 w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${proficiency}%` }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  );
};

const SkillDetails: React.FC<SkillDetailsProps> = ({ skill, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed inset-0 z-50 flex items-center justify-center px-4"
  >
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-purple-900/90 p-6 rounded-xl max-w-md w-full shadow-2xl border border-purple-500/30">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>
      
      <div className="flex items-center gap-4 mb-4">
        <skill.icon size={60} color={skill.color} />
        <div>
          <h3 className="text-2xl font-bold text-white">{skill.name}</h3>
          <p className="text-purple-300">Proficiency: {skill.proficiency}%</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Experience</h4>
          <p className="text-gray-300">{skill.description}</p>
        </div>        
      </div>
    </div>
  </motion.div>
);

const Skills = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const skills = [
    { 
      icon: SiHtml5, 
      name: 'HTML', 
      color: 'orange',
      category: 'frontend',
      proficiency: 85,
      description: 'Extensive experience in semantic HTML5 and accessibility best practices, with focus on creating well-structured, SEO-friendly markup.',
    },
    { 
      icon: SiCss3, 
      name: 'CSS', 
      color: 'blue',
      category: 'frontend',
      proficiency: 85,
      description: 'Strong knowledge of modern CSS, including Flexbox, Grid, animations, and responsive design principles for creating beautiful user interfaces.',
    },
    { 
      icon: SiJavascript, 
      name: 'JavaScript', 
      color: 'yellow',
      category: 'frontend',
      proficiency: 85,
      description: 'Deep understanding of core JavaScript concepts, ES6+ features, async programming, and DOM manipulation for creating interactive web applications.',
    },
    { 
      icon: SiC, 
      name: 'C', 
      color: '#A8B9CC',
      category: 'programming',
      proficiency: 85,
      description: 'Fundamental knowledge of C programming, including memory management, pointers, and data structures for system-level programming.',
    },
    { 
      icon: SiPython, 
      name: 'Python', 
      color: '#3776AB',
      category: 'programming',
      proficiency: 65,
      description: 'Proficient in Python development with experience in data processing, automation, and backend development using various Python frameworks.',
      relatedSkills: ['Django', 'Flask', 'Data Processing', 'Automation', 'Scripting']
    },
    { 
      icon: SiReact, 
      name: 'React', 
      color: '#61DAFB',
      category: 'frontend',
      proficiency: 85,
      description: 'Advanced knowledge of React, including hooks, context API, and state management for building complex single-page applications.',
      relatedSkills: [
        { id: '1', name: 'React Hooks' },
        { id: '2', name: 'Context API' },
        { id: '3', name: 'React Router' },
        { id: '4', name: 'Component Design' }
      ]
    },
    { 
      icon: SiNodedotjs, 
      name: 'Node.js', 
      color: '#43853d',
      category: 'backend',
      proficiency: 85,
      description: 'Experienced in building scalable server-side applications with Node.js, including REST APIs and real-time applications.',
      relatedSkills: ['Express.js', 'NPM', 'REST APIs', 'WebSockets', 'Middleware']
    },
    { 
      icon: SiExpress, 
      name: 'Express.js', 
      color: '#000000',
      category: 'backend',
      proficiency: 80,
      description: 'Proficient in creating robust backend applications using Express.js, including routing, middleware implementation, and API development.',
      relatedSkills: ['Node.js', 'REST APIs', 'Middleware', 'Authentication']
    },
    { 
      icon: SiTypescript, 
      name: 'TypeScript', 
      color: '#3178C6',
      category: 'backend',
      proficiency: 85,
      description: 'Strong understanding of TypeScript for building type-safe applications, including interfaces, generics, and advanced type systems.',
      relatedSkills: ['JavaScript', 'Static Typing', 'Interfaces']
    },
    { 
      icon: SiNextdotjs, 
      name: 'Next.js', 
      color: '#000000',
      category: 'backend',
      proficiency: 85,
      description: 'Advanced experience with Next.js for building server-side rendered React applications with focus on performance and SEO.',
      relatedSkills: ['React', 'Static Generation', 'API Routes', 'Dynamic Routing']
    },
    { 
      icon: AiOutlineJava,
      name: 'Java', 
      color: '#007396',
      category: 'programming',
      proficiency: 65,
      description: 'Proficient in Java for building scalable backend systems, including experience with OOP, multi-threading, and frameworks like Spring Boot.',
      relatedSkills: [ 'OOP', 'Multi-threading']
    },        
    { 
      icon: SiJest, 
      name: 'Jest.js', 
      color: '#C21325',
      category: 'testing',
      proficiency: 70,
      description: 'Experienced in writing comprehensive test suites using Jest for JavaScript applications, including unit and integration testing.',
      relatedSkills: ['Testing', 'Unit Tests', 'Integration Tests', 'Mocking', 'TDD']
    },
    { 
      icon: SiGit, 
      name: 'Git', 
      color: '#F1502F',
      category: 'tools',
      proficiency: 80,
      description: 'Proficient in version control using Git, including branching strategies, merge conflict resolution, and collaborative development workflows.',
      relatedSkills: ['Version Control', 'Branching', 'Collaboration', 'CI/CD', 'GitHub']
    },
    { 
      icon: SiGithub, 
      name: 'GitHub', 
      color: '#181717',
      category: 'tools',
      proficiency: 85,
      description: 'Experienced in using GitHub for project management, collaboration, and CI/CD implementation, including Actions and project organization.',
      relatedSkills: ['Git', 'Project Management', 'CI/CD', 'Code Review', 'Documentation']
    },
    { 
      icon: SiPostgresql, 
      name: 'PostgreSQL', 
      color: '#336791',
      category: 'database',
      proficiency: 85,
      description: 'Strong knowledge of PostgreSQL database design, optimization, and management, including complex queries and performance tuning.',
    },
    { 
      icon: SiMongodb, 
      name: 'MongoDB', 
      color: '#47A248',
      category: 'database',
      proficiency: 85,
      description: 'Proficient in MongoDB database design and operations, including aggregation pipelines, indexing, and data modeling for NoSQL applications.',
    },
    { 
      icon: SiFirebase, 
      name: 'Firebase', 
      color: '#FFCA28',
      category: 'database',
      proficiency: 80,
      description: 'Experience with Firebase services including authentication, real-time database, cloud functions, and hosting for building serverless applications.',
    },
    { 
      icon: SiPostman, 
      name: 'Postman', 
      color: '#FF6C37',
      category: 'tools',
      proficiency: 85,
      description: 'Skilled in using Postman for API development, testing, and documentation, including automated testing and environment management.',
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'tools', name: 'Tools' },
    { id: 'programming', name: 'Programming' },
    { id: 'database', name: 'Database' },
    { id: 'testing', name: 'Testing' }
  ];

  // Filter skills based on search and category
  const filteredSkills = skills
    .filter(skill => 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === 'all' || skill.category === categoryFilter)
    );

  const visibleSkills = showAll ? filteredSkills : filteredSkills.slice(0, 10);

  return (
    <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-black py-16">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl text-center mb-8 text-transparent bg-clip-text bg-amber-300  font-bold"
        >
          Technical Skills
        </motion.h2>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-full text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div className="flex justify-center flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCategoryFilter(category.id)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all
                  ${categoryFilter === category.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center"
        >
          <AnimatePresence>
            {visibleSkills.map((skill) => (
              <SkillItem 
                key={skill.name}
                icon={skill.icon}
                name={skill.name}
                color={skill.color}
                proficiency={skill.proficiency}
                onClick={() => setSelectedSkill(skill)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More/Less button */}
        {filteredSkills.length > 10 && (
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-6 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 
                text-white rounded-full transition-all duration-300 hover:shadow-lg"
            >
              <span>{showAll ? 'Show Less' : 'Show More'}</span>
              {showAll ? (
                <ChevronUp className="group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </motion.div>
        )}

        {/* Skill Details Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <SkillDetails 
              skill={selectedSkill} 
              onClose={() => setSelectedSkill(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;