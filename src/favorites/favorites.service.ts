import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
  ) {}

  async getFavorites(userId: string) {
    return this.favoriteModel.find({ userId }).exec();
  }

  async addFavorite(userId: string, productId: string) {
    // Verificamos que no exista previamente para evitar duplicados
    const exists = await this.favoriteModel.findOne({ userId, productId }).exec();
    
    if (!exists) {
      const newFavorite = new this.favoriteModel({ userId, productId });
      await newFavorite.save();
    }
    
    return {
      message: 'Producto agregado a favoritos',
      favorites: await this.getFavorites(userId),
    };
  }

  async removeFavorite(userId: string, productId: string) {
    await this.favoriteModel.findOneAndDelete({ userId, productId }).exec();
    
    return {
      message: 'Producto eliminado de favoritos',
      favorites: await this.getFavorites(userId),
    };
  }
}