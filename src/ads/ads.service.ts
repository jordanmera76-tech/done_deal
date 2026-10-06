import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AdsService {
  private ads = [
    {
      id: '1',
      userId: '1',
      title: 'iPhone 13 Pro 128GB (Usado)',
      price: 550,
      category: 'Electronics',
      description: 'En excelente estado, batería al 85%.',
      status: 'active'
    }
  ];

  findAll() {
    return this.ads;
  }

  findByUser(userId: string) {
    return this.ads.filter(ad => ad.userId === userId);
  }

  createAd(userId: string, adData: any) {
    const newAd = {
      id: String(this.ads.length + 1),
      userId,
      ...adData,
      status: 'active'
    };
    this.ads.push(newAd);
    return {
      message: 'Anuncio publicado exitosamente',
      ad: newAd
    };
  }

  removeAd(id: string) {
    const index = this.ads.findIndex(ad => ad.id === id);
    if (index === -1) throw new NotFoundException('Anuncio no encontrado');

    const deleted = this.ads.splice(index, 1);
    return {
      message: 'Anuncio eliminado exitosamente',
      ad: deleted[0]
    };
  }

  // NUEVO: Eliminar todos los anuncios de un usuario al borrar su cuenta
  removeAdsByUser(userId: string) {
    this.ads = this.ads.filter(ad => ad.userId !== userId);
  }
}