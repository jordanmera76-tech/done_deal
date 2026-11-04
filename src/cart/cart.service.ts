import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
  ) {}

  // Método auxiliar para obtener o crear el carrito por defecto (userId: '1')
  private async getOrCreateCart() {
    let cart = await this.cartModel.findOne({ userId: '1' }).exec();
    if (!cart) {
      cart = new this.cartModel({ userId: '1', items: [], total: 0 });
      await cart.save();
    }
    return cart;
  }

  async getCart() {
    return this.getOrCreateCart();
  }

  async addItem(itemData: { productId: string; title: string; price: number; quantity: number }) {
    const cart = await this.getOrCreateCart();

    const existingItem = cart.items.find(item => item.productId === itemData.productId);

    if (existingItem) {
      existingItem.quantity += itemData.quantity;
    } else {
      cart.items.push(itemData);
    }
    
    this.calculateTotal(cart);
    return cart.save();
  }

  async updateQuantity(productId: string, quantity: number) {
    const cart = await this.getOrCreateCart();
    const item = cart.items.find(item => item.productId === productId);
    
    if (!item) throw new NotFoundException('Producto no encontrado en el carrito');

    item.quantity = quantity;
    this.calculateTotal(cart);
    return cart.save();
  }

  async removeItem(productId: string) {
    const cart = await this.getOrCreateCart();
    cart.items = cart.items.filter(item => item.productId !== productId);
    
    this.calculateTotal(cart);
    return cart.save();
  }

  private calculateTotal(cart: any) {
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}