import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ad, AdDocument } from './schemas/ad.schemas';

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ad.name) private adModel: Model<AdDocument>) {}

  async create(createAdDto: any): Promise<Ad> {
    const newAd = new this.adModel(createAdDto);
    return newAd.save();
  }

  // Método que llama el controlador como createAd
  async createAd(userId: string, createAdDto: any): Promise<Ad> {
    const newAd = new this.adModel({ ...createAdDto, userId });
    return newAd.save();
  }

  async findAll(): Promise<Ad[]> {
    return this.adModel.find().exec();
  }

  async findOne(id: string): Promise<Ad> {
    const ad = await this.adModel.findById(id).exec();
    if (!ad) {
      throw new NotFoundException(`Anuncio con ID ${id} no encontrado`);
    }
    return ad;
  }

  // Método que llama el controlador para buscar por usuario
  async findByUser(userId: string): Promise<Ad[]> {
    return this.adModel.find({ userId }).exec();
  }

  async update(id: string, updateAdDto: any): Promise<Ad> {
    const updatedAd = await this.adModel
      .findByIdAndUpdate(id, updateAdDto, { new: true })
      .exec();
    if (!updatedAd) {
      throw new NotFoundException(`Anuncio con ID ${id} no encontrado para actualizar`);
    }
    return updatedAd;
  }

  async remove(id: string): Promise<Ad> {
    const deletedAd = await this.adModel.findByIdAndDelete(id).exec();
    if (!deletedAd) {
      throw new NotFoundException(`Anuncio con ID ${id} no encontrado para eliminar`);
    }
    return deletedAd;
  }

  // Método que llama el controlador como removeAd
  async removeAd(id: string): Promise<Ad> {
    return this.remove(id);
  }

  // Método para la eliminación en cascada desde Auth Service
  async removeAdsByUser(userId: string): Promise<any> {
    return this.adModel.deleteMany({ userId }).exec();
  }
}