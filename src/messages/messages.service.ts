import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  // Obtener todos los mensajes donde participa un usuario (como emisor o receptor)
  async getMessagesForUser(userId: string) {
    return this.messageModel
      .find({
        $or: [{ senderId: userId }, { receiverId: userId }],
      })
      .exec();
  }

  // Enviar y guardar un nuevo mensaje en MongoDB
  async sendMessage(messageData: { senderId: string; receiverId: string; productId: string; content: string }) {
    const newMessage = new this.messageModel(messageData);
    const savedMessage = await newMessage.save();

    return {
      message: 'Mensaje enviado exitosamente',
      data: savedMessage,
    };
  }
}