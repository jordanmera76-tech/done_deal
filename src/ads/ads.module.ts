import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // <-- 1. Importar esto
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { Ad, AdSchema } from './schemas/ad.schemas'; // <-- 2. Importar tu esquema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ad.name, schema: AdSchema }]), // <-- 3. Registrar el esquema aquí
  ],
  controllers: [AdsController],
  providers: [AdsService],
  exports: [AdsService], // <-- Tu exportación que ya tenías
})
export class AdsModule {}