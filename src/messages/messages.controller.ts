import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // Consultar mensajes de un usuario
  @Get()
  getMessages(@Query('userId') userId: string = '1') {
    return this.messagesService.getMessagesForUser(userId);
  }

  // Enviar un mensaje
  @Post()
  sendMessage(@Body() body: { senderId: string; receiverId: string; productId: string; content: string }) {
    return this.messagesService.sendMessage(body);
  }
}