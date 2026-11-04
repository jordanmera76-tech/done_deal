import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdDocument = Ad & Document;

@Schema()
export class Ad {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: false })
  userId: string; // Necesario para relacionar el anuncio con el usuario
}

export const AdSchema = SchemaFactory.createForClass(Ad);