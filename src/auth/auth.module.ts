import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProfileModule } from '../profile/profile.module';
import { AdsModule } from '../ads/ads.module'; // <-- IMPORTADO

@Module({
  imports: [ProfileModule, AdsModule], // <-- AGREGADO AQUÍ
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}