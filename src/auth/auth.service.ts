import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { ProfileService } from '../profile/profile.service';
import { AdsService } from '../ads/ads.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly profileService: ProfileService,
    private readonly adsService: AdsService,
  ) {}

  async register(userData: any) {
    // 1. Guardar el usuario real en MongoDB
    const newUser = new this.userModel({
      email: userData.email,
      password: userData.password,
    });
    const savedUser = await newUser.save();

    // Convertimos el _id de MongoDB a string para usarlo con Profile
    const userId = savedUser._id.toString();

    // 2. Inicializar su perfil asociado
    try {
      await this.profileService.updateProfile(userId, {
        name: userData.name || 'Usuario Nuevo',
        email: userData.email,
        phone: '',
        location: '',
        bio: '',
      });
    } catch (e) {
      console.log('Error al crear perfil inicial:', e);
    }

    return {
      message: 'Usuario registrado y perfil inicializado exitosamente',
      user: { id: userId, email: savedUser.email },
    };
  }

  async login(credentials: any) {
    // Buscar el usuario en MongoDB por email y contraseña
    const user = await this.userModel.findOne({
      email: credentials.email,
      password: credentials.password,
    }).exec();

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return {
      message: 'Inicio de sesión exitoso',
      access_token: 'jwt-token-simulado-123456789',
    };
  }

  forgotPassword(email: string) {
    return {
      message: `Se han enviado las instrucciones de recuperación a ${email}`,
    };
  }

  async deleteAccount(id: string) {
    // Buscar y eliminar el usuario en MongoDB por su ID
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // ELIMINACIÓN EN CASCADA AUTOMÁTICA
    try {
      await this.profileService.removeProfile(id); // Borra su perfil
    } catch (e) {}

    try {
      await this.adsService.removeAdsByUser(id); // Borra todos sus anuncios publicados
    } catch (e) {}

    return {
      message: 'Cuenta, perfil y anuncios eliminados exitosamente',
      user_deleted: deletedUser.email,
    };
  }
}