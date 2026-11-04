import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async getProfile(userId: string) {
    const profile = await this.profileModel.findOne({ userId }).exec();
    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }
    return profile;
  }

  async updateProfile(userId: string, updateData: any) {
    let profile = await this.profileModel.findOne({ userId }).exec();

    if (!profile) {
      const newProfile = new this.profileModel({ userId, ...updateData });
      await newProfile.save();
      return {
        message: 'Perfil creado exitosamente',
        profile: newProfile,
      };
    }

    // Actualizar campos existentes
    Object.assign(profile, updateData);
    await profile.save();

    return {
      message: 'Perfil actualizado exitosamente',
      profile,
    };
  }

  // Permitir que otros módulos (como Auth) eliminen el perfil en cascada
  async removeProfile(userId: string) {
    await this.profileModel.findOneAndDelete({ userId }).exec();
  }
}