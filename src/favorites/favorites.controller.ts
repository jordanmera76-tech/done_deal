import { Controller, Get, Post, Delete, Param, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('api/favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // Obtener todos los favoritos del usuario
  @Get()
  getFavorites(@Query('userId') userId: string = '1') { 
    return this.favoritesService.getFavorites(userId);
  }

  // Agregar un producto a favoritos
  @Post(':productId')
  addFavorite(@Param('productId') productId: string, @Query('userId') userId: string = '1') {
    return this.favoritesService.addFavorite(userId, productId);
  }

  // Quitar un producto de favoritos
  @Delete(':productId')
  removeFavorite(@Param('productId') productId: string, @Query('userId') userId: string = '1') {
    return this.favoritesService.removeFavorite(userId, productId);
  }
}