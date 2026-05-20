
import React from 'react';
import { motion } from 'framer-motion';

const BenefitCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-muted rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
        {title}
      </h3>
      <p className="text-sm text-foreground/70 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default BenefitCard;
