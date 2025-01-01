'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  User, 
  Mail, 
  MessageCircle, 
  CheckCircle2, 
  AlertTriangle,
  Loader2
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    suggestion: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    suggestion: ''
  });
  
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      suggestion: ''
    };
    
    if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.suggestion.length < 10) {
      newErrors.suggestion = 'Suggestion must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', suggestion: '' });
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: '' }));
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

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section 
      id="contact" 
      className="py-7 flex items-center"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl text-center mb-8 md:mb-12 text-amber-300 font-bold"
        >
          Share Your Suggestions
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-purple-900/30 p-6 md:p-8 rounded-xl shadow-2xl backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <motion.div 
              variants={fieldVariants}
              className="relative"
            >
              <label className="text-white mb-2 flex items-center text-sm md:text-base">
                <User className="mr-2 text-purple-400 h-4 w-4 md:h-5 md:w-5" />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                disabled={isSubmitting}
                className={`w-full p-3 bg-gray-800/90 text-white rounded-lg 
                  focus:ring-2 focus:ring-purple-500 transition-all duration-300
                  disabled:opacity-50 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Email Field */}
            <motion.div 
              variants={fieldVariants}
              className="relative"
            >
              <label className="text-white mb-2 flex items-center text-sm md:text-base">
                <Mail className="mr-2 text-purple-400 h-4 w-4 md:h-5 md:w-5" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                disabled={isSubmitting}
                className={`w-full p-3 bg-gray-800/90 text-white rounded-lg 
                  focus:ring-2 focus:ring-purple-500 transition-all duration-300
                  disabled:opacity-50 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Suggestion Field */}
            <motion.div 
              variants={fieldVariants}
              className="relative"
            >
              <label className="text-white mb-2 flex items-center text-sm md:text-base">
                <MessageCircle className="mr-2 text-purple-400 h-4 w-4 md:h-5 md:w-5" />
                Suggestion
              </label>
              <textarea
                name="suggestion"
                value={formData.suggestion}
                onChange={handleChange}
                onFocus={() => setFocusedField('suggestion')}
                onBlur={() => setFocusedField(null)}
                required
                disabled={isSubmitting}
                className={`w-full p-3 bg-gray-800/90 text-white rounded-lg h-32 
                  focus:ring-2 focus:ring-purple-500 transition-all duration-300
                  disabled:opacity-50 ${focusedField === 'suggestion' ? 'scale-[1.02]' : ''}`}
              />
              <AnimatePresence>
                {errors.suggestion && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.suggestion}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Submit Button */}
            <motion.button 
              type="submit" 
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-purple-600 text-white p-3 rounded-lg 
                hover:bg-purple-700 transition duration-300 
                flex items-center justify-center space-x-2
                disabled:opacity-50 disabled:cursor-not-allowed
                text-sm md:text-base"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin mr-2" />
                  Sending...
                </span>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4 md:h-5 md:w-5" /> 
                  Send Suggestion
                </>
              )}
            </motion.button>
            
            {/* Status Messages */}
            <AnimatePresence mode="wait">
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 bg-green-500/20 p-3 rounded-lg flex items-center text-green-400"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-sm md:text-base">Suggestion sent successfully!</span>
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 bg-red-500/20 p-3 rounded-lg flex items-center text-red-400"
                >
                  <AlertTriangle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-sm md:text-base">Failed to send suggestion. Please try again.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;