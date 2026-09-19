import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface ChatMessage {
  id: string;
  message: string;
  response: string;
  timestamp: Date;
}

@Injectable()
export class ChatService {
  private conversations: Map<string, ChatMessage[]> = new Map();

  async processMessage(input: {
    message: string;
    userId?: string;
    conversationId?: string;
  }): Promise<any> {
    const conversationId = input.conversationId || uuidv4();
    const messageId = uuidv4();

    // Generate AI response (placeholder - would integrate with LiteLLM in production)
    const response = this.generateResponse(input.message);

    const chatMessage: ChatMessage = {
      id: messageId,
      message: input.message,
      response,
      timestamp: new Date(),
    };

    // Store in conversation history
    if (!this.conversations.has(conversationId)) {
      this.conversations.set(conversationId, []);
    }
    this.conversations.get(conversationId)!.push(chatMessage);

    return {
      id: messageId,
      message: input.message,
      response,
      timestamp: new Date(),
      conversationId,
    };
  }

  async getConversationHistory(conversationId: string): Promise<ChatMessage[]> {
    return this.conversations.get(conversationId) || [];
  }

  private generateResponse(userMessage: string): string {
    const lowerInput = userMessage.toLowerCase();

    // Service & Booking
    if (lowerInput.includes('book') || lowerInput.includes('ride')) {
      return "To book a ride with ClearPath NEMT:\n1. Online: Visit our website\n2. Phone: 1-800-NEMT-NOW\n3. Ask your healthcare provider\n\nWe recommend booking 24 hours in advance.";
    }

    if (lowerInput.includes('wheelchair') || lowerInput.includes('accessible')) {
      return "All our vehicles are wheelchair accessible! When booking, let us know your needs and we'll ensure the right vehicle. Your caregiver can ride with you at no extra cost.";
    }

    if (lowerInput.includes('service') || lowerInput.includes('offer')) {
      return "ClearPath offers:\n✅ Ambulatory Rides\n✅ Wheelchair Accessible\n✅ Stretcher Rides\n✅ Companion Care\n✅ Real-Time Tracking\n✅ 24/7 Service";
    }

    // Insurance
    if (lowerInput.includes('insurance') || lowerInput.includes('cost')) {
      return "We accept:\n💳 MassHealth - $0\n💳 Medicare - $0\n💳 Medicaid - $0\n💳 Private Insurance - Varies\n\nMost eligible patients pay nothing!";
    }

    if (lowerInput.includes('coverage') || lowerInput.includes('area')) {
      return "We serve: MA, CT, RI, VT, NH\n\nEnter your location when booking to confirm service in your area.";
    }

    // Careers
    if (lowerInput.includes('job') || lowerInput.includes('career')) {
      return "We're hiring! Positions:\n👨‍💼 Professional Drivers\n👨‍💼 Dispatchers\n👨‍💼 Healthcare Coordinators\n👨‍💼 Operations Manager\n\nVisit our 'Join Us' page to apply!";
    }

    // Contact
    if (lowerInput.includes('contact') || lowerInput.includes('phone')) {
      return "📞 1-800-NEMT-NOW\n📧 info@clearpathnemt.com\n💼 careers@clearpathnemt.com\n⏰ 24/7 Service";
    }

    // Default
    return "I can help with:\n🚐 Booking rides\n💳 Insurance info\n📍 Coverage areas\n👨‍💼 Careers\n❓ General questions\n\nWhat would you like to know?";
  }
}
