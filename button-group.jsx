
import React, { useState } from 'react';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ProfileEditForm = ({ onCancel, onSuccess }) => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await pb.collection('users').update(
        currentUser.id,
        {
          name: formData.name,
          phone: formData.phone,
          profile_complete: true
        },
        { $autoCancel: false }
      );

      toast.success('Perfil actualizado correctamente');
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error('Error al actualizar perfil. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          disabled
          className="mt-2 opacity-50 cursor-not-allowed"
        />
        <p className="text-xs text-foreground/60 mt-1">El correo no se puede modificar</p>
      </div>

      <div>
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+52 442 123 4567"
          className="mt-2"
        />
      </div>

      <div className="flex space-x-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-primary hover:bg-primary-dark text-white"
        >
          {isLoading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
