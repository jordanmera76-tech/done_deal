import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable( )
export class CartService {
  private cart = {
    userId: '1',
    items: [],
    total: 0
  };

  getCart() {
    return this.cart;
  }

  addItem(itemData: { productId: string; title: string; price: number; quantity: number }) {
    const existingItem = this.cart.items.find(item => item.productId === itemData.productId);

    if (existingItem) {
      existingItem.quantity += itemData.quantity;
    } else {
      this.cart.items.push(itemData);
    }
    
    this.calculateTotal();
    return this.cart;
  }

  updateQuantity(productId: string, quantity: number) {
    const item = this.cart.items.find(item => item.productId === productId);
    if (!item) throw new NotFoundException('Producto no encontrado en el carrito');

    item.quantity = quantity;
    this.calculateTotal();
    return this.cart;
  }

  removeItem(productId: string) {
    this.cart.items = this.cart.items.filter(item => item.productId !== productId);
    this.calculateTotal();
    return this.cart;
  }

  private calculateTotal() {
    this.cart.total = this.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}