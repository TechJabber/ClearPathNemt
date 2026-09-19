import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';

interface ChatMessageRequest {
  message: string;
  userId?: string;
  conversationId?: string;
}

interface ChatMessageResponse {
  id: string;
  message: string;
  response: string;
  timestamp: Date;
}

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  @ApiOperation({ summary: 'Send a message to the ClearPath assistant' })
  async sendMessage(@Body() input: ChatMessageRequest): Promise<ChatMessageResponse> {
    return this.chatService.processMessage(input);
  }

  @Post('conversation')
  @ApiOperation({ summary: 'Get conversation history' })
  async getConversation(@Body() { conversationId }: { conversationId: string }) {
    return this.chatService.getConversationHistory(conversationId);
  }
}
