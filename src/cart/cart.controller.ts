import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart() {
    return this.cartService.getCart();
  }

  @Post('items')
  addItem(@Body() body: { productId: string; title: string; price: number; quantity: number }) {
    return this.cartService.addItem(body);
  }

  @Put('items/:id')
  updateQuantity(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.cartService.updateQuantity(id, body.quantity);
  }

  @Delete('items/:id')
  removeItem(@Param('id') id: string) {
    return this.cartService.removeItem(id);
  }
}