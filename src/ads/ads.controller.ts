import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { AdsService } from './ads.service';

@Controller('api/ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get()
  findAll() {
    return this.adsService.findAll();
  }

  @Get('my-ads')
  findMyAds(@Query('userId') userId: string = '1') {
    return this.adsService.findByUser(userId);
  }

  @Post()
  createAd(@Query('userId') userId: string = '1', @Body() body: any) {
    return this.adsService.createAd(userId, body);
  }

  @Delete(':id')
  removeAd(@Param('id') id: string) {
    return this.adsService.removeAd(id);
  }
}