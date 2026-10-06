import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  // Simulamos una lista donde guardaremos qué producto le gusta a qué usuario
  private favorites = [];

  getFavorites(userId: string) {
    // Filtramos solo los favoritos del usuario que los pide
    return this.favorites.filter(fav => fav.userId === userId);
  }

  addFavorite(userId: string, productId: string) {
    // Verificamos que no lo haya agregado antes para no duplicar
    const exists = this.favorites.find(fav => fav.userId === userId && fav.productId === productId);
    
    if (!exists) {
      this.favorites.push({ userId, productId });
    }
    
    return {
      message: 'Producto agregado a favoritos',
      favorites: this.getFavorites(userId)
    };
  }

  removeFavorite(userId: string, productId: string) {
    // Dejamos en la lista todos los que NO coincidan con el que queremos borrar
    this.favorites = this.favorites.filter(
      fav => !(fav.userId === userId && fav.productId === productId)
    );
    
    return {
      message: 'Producto eliminado de favoritos',
      favorites: this.getFavorites(userId)
    };
  }
}