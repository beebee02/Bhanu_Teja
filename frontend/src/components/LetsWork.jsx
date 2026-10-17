import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

const LetsWork = () => {
  const bgPath = `${process.env.PUBLIC_URL || ''}/contact-bg.jpg`;

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-16 flex flex-col justify-center overflow-hidden"
    >
      {/* 1. Base Image - Set to high visibility */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url(${bgPath})`,
          opacity: 0.85, // Adjust between 0.70 and 1.0 to taste
        }}
      />

      {/* 2. Soft Darkening Film (Only 35% darkness so the artwork is clearly visible) */}
      <div className="absolute inset-0 z-0 bg-black/35 pointer-events-none" />

      {/* 3. Subtle edge fade to blend naturally with preceding and succeeding sections */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-80 pointer-events-none" />

      {/* Main Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mono text-xs tracking-[0.3em] text-[#ff5f19] uppercase mb-4">
            <span>CONTACT</span>
            <span className="text-white/30">//</span>
            <span>06</span>
          </div>

          <h2 className="display-font text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.05] drop-shadow-md">
            Let&apos;s build something impactful.
          </h2>

          <p className="mt-6 text-sm sm:text-base text-neutral-200 max-w-xl font-mono leading-relaxed drop-shadow-sm">
            Whether you want to talk data pipelines, marketplace analytics, or custom projects, drop your message below.
          </p>
        </motion.div>

        {/* Form Container */}
        <div className="relative max-w-4xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default LetsWork;