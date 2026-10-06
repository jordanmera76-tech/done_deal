import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('api/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@Query('userId') userId: string = '1') {
    return this.profileService.getProfile(userId);
  }

  @Put()
  updateProfile(@Query('userId') userId: string = '1', @Body() body: any) {
    return this.profileService.updateProfile(userId, body);
  }
}