import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  // Simulamos una base de datos de mensajes
  private messages = [
    {
      id: '1',
      senderId: '2',
      receiverId: '1',
      productId: '1',
      content: 'Hola, ¿el iPhone 13 Pro todavía está disponible?',
      createdAt: new Date().toISOString()
    }
  ];

  // Obtener todos los mensajes donde participa un usuario (como emisor o receptor)
  getMessagesForUser(userId: string) {
    return this.messages.filter(
      msg => msg.senderId === userId || msg.receiverId === userId
    );
  }

  // Enviar un nuevo mensaje
  sendMessage(messageData: { senderId: string; receiverId: string; productId: string; content: string }) {
    const newMessage = {
      id: String(this.messages.length + 1),
      ...messageData,
      createdAt: new Date().toISOString()
    };
    
    this.messages.push(newMessage);
    
    return {
      message: 'Mensaje enviado exitosamente',
      data: newMessage
    };
  }
}