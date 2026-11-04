import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: false, default: '' })
  name: string;

  @Prop({ required: false, default: '' })
  email: string;

  @Prop({ required: false, default: '' })
  phone: string;

  @Prop({ required: false, default: '' })
  location: string;

  @Prop({ required: false, default: '' })
  bio: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);