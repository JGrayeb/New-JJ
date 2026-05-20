
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ClassRegistrationForm = ({ classItem, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!currentUser) {
      toast.error('Debes iniciar sesión para registrarte');
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      const data = {
        user_id: currentUser.id,
        class_id: classItem.id,
        attended: false
      };

      await pb.collection('class_registrations').create(data, { $autoCancel: false });

      if (classItem.current_enrollment !== undefined && classItem.max_capacity) {
        await pb.collection('classes').update(
          classItem.id,
          { current_enrollment: (classItem.current_enrollment || 0) + 1 },
          { $autoCancel: false }
        );
      }

      toast.success('Registro exitoso');
      if (onSuccess) onSuccess();
    } catch (error) {
      if (error.message.includes('duplicate')) {
        toast.error('Ya estás registrado en esta clase');
      } else {
        toast.error('Error al registrarse. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleRegister}
      disabled={isLoading}
      className="w-full bg-primary hover:bg-primary-dark text-white"
    >
      {isLoading ? 'Registrando...' : 'Confirmar Registro'}
    </Button>
  );
};

export default ClassRegistrationForm;
