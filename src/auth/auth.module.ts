import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // <-- 1. Importar MongooseModule
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schemas/user.schema'; // <-- 2. Importar tu esquema de usuario
import { ProfileModule } from '../profile/profile.module';
import { AdsModule } from '../ads/ads.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // <-- 3. Registrar el esquema aquí
    ProfileModule, 
    AdsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // <-- Recomendado para que otros módulos puedan usar el servicio de auth
})
export class AuthModule {}