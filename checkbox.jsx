
import React from 'react';
import { motion } from 'framer-motion';

const InstructorCard = ({ instructor, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={instructor.photo}
            alt={instructor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-sm leading-relaxed text-foreground/90">
              {instructor.bio}
            </p>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {instructor.name}
          </h3>
          <p className="text-sm text-primary font-medium tracking-wide">
            {instructor.specialty}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default InstructorCard;
