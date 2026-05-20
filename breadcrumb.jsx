
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ClassCard = ({ classItem, index, onRegister, isRegistered }) => {
  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'Privada':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'Bootcamp':
        return 'bg-accent/20 text-accent-foreground border-accent/30';
      default:
        return 'bg-secondary/20 text-secondary-foreground border-secondary/30';
    }
  };

  const spotsLeft = classItem.max_capacity - (classItem.current_enrollment || 0);
  const isFull = spotsLeft <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold flex-1" style={{ fontFamily: 'Playfair Display, serif' }}>
          {classItem.name}
        </h3>
        <Badge variant="outline" className={getTypeBadgeColor(classItem.type)}>
          {classItem.type}
        </Badge>
      </div>

      <p className="text-sm text-foreground/70 leading-relaxed mb-6">
        {classItem.description}
      </p>

      <div className="space-y-3 mb-6">
        {classItem.schedule && (
          <div className="flex items-center space-x-2 text-sm text-foreground/80">
            <Clock className="w-4 h-4 text-primary" />
            <span>{classItem.schedule}</span>
          </div>
        )}
        {classItem.max_capacity && (
          <div className="flex items-center space-x-2 text-sm text-foreground/80">
            <Users className="w-4 h-4 text-primary" />
            <span>
              {spotsLeft > 0 ? `${spotsLeft} lugares disponibles` : 'Clase llena'}
            </span>
          </div>
        )}
      </div>

      <div className="mt-auto">
        {onRegister && (
          <Button
            onClick={() => onRegister(classItem)}
            disabled={isFull || isRegistered}
            className="w-full bg-primary hover:bg-primary-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRegistered ? 'Ya registrado' : isFull ? 'Clase llena' : 'Registrarse'}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ClassCard;
