import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProfileService {
  private profiles = [
    {
      userId: '1',
      name: 'Jordan Mera',
      email: 'jordan@correo.com',
      phone: '+52 123 456 7890',
      location: 'Tula de Allende',
      bio: 'Desarrollador y estudiante de TI apasionado por la tecnología.',
    }
  ];

  getProfile(userId: string) {
    const profile = this.profiles.find(p => p.userId === userId);
    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }
    return profile;
  }

  updateProfile(userId: string, updateData: any) {
    let profileIndex = this.profiles.findIndex(p => p.userId === userId);

    if (profileIndex === -1) {
      const newProfile = { userId, ...updateData };
      this.profiles.push(newProfile);
      return {
        message: 'Perfil creado exitosamente',
        profile: newProfile
      };
    }

    this.profiles[profileIndex] = { ...this.profiles[profileIndex], ...updateData };
    
    return {
      message: 'Perfil actualizado exitosamente',
      profile: this.profiles[profileIndex]
    };


  


  }

  // Permitir que otros módulos (como Auth) eliminen el perfil en cascada
  removeProfile(userId: string) {
    const index = this.profiles.findIndex(p => p.userId === userId);
    if (index !== -1) {
      this.profiles.splice(index, 1);
    }
  }

}