import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { AdsService } from '../ads/ads.service'; // <-- IMPORTADO

@Injectable()
export class AuthService {
  private users = [];

  constructor(
    private readonly profileService: ProfileService,
    private readonly adsService: AdsService // <-- INYECTADO
  ) {}

  register(userData: any) {
    const newUser = {
      id: String(this.users.length + 1),
      email: userData.email,
      password: userData.password,
    };
    this.users.push(newUser);

    this.profileService.updateProfile(newUser.id, {
      name: userData.name || 'Usuario Nuevo',
      email: userData.email,
      phone: '',
      location: '',
      bio: ''
    });

    return {
      message: 'Usuario registrado y perfil inicializado exitosamente',
      user: { id: newUser.id, email: newUser.email }
    };
  }

  login(credentials: any) {
    const user = this.users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return {
      message: 'Inicio de sesión exitoso',
      access_token: 'jwt-token-simulado-123456789'
    };
  }

  forgotPassword(email: string) {
    return {
      message: `Se han enviado las instrucciones de recuperación a ${email}`
    };
  }

  deleteAccount(id: string) {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const deletedUser = this.users[userIndex];
    this.users.splice(userIndex, 1);

    // ELIMINACIÓN EN CASCADA AUTOMÁTICA
    try {
      this.profileService.removeProfile(id); // Borra su perfil
    } catch (e) {}

    try {
      this.adsService.removeAdsByUser(id); // Borra todos sus anuncios publicados
    } catch (e) {}

    return {
      message: 'Cuenta, perfil y anuncios eliminados exitosamente',
      user_deleted: deletedUser.email
    };
  }
}