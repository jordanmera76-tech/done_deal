import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ProfileModule } from './profile/profile.module';
import { MessagesModule } from './messages/messages.module';
import { AdsModule } from './ads/ads.module';
// ... tus otros imports de módulos

@Module({
  imports: [
    // Conexión a tu MongoDB local con el nombre de base de datos 'donedeal'
    MongooseModule.forRoot('mongodb://localhost:27017/donedeal'),
    ProductsModule,
    AuthModule,
    CartModule,
    FavoritesModule,
    ProfileModule,
    MessagesModule,
    AdsModule,
  ],
})
export class AppModule {}