import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class CartItem {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;
}

@Schema()
export class Cart {
  @Prop({ required: true, default: '1' })
  userId: string;

  @Prop({ type: [CartItem], default: [] })
  items: CartItem[];

  @Prop({ required: true, default: 0 })
  total: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);