import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! 👋 I'm ClearPath's AI assistant. I can help you with information about our services, booking rides, insurance coverage, careers, and more. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate bot response (in production, this would call your backend API)
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  const generateBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    // Service & Booking questions
    if (lowerInput.includes('book') || lowerInput.includes('ride')) {
      return "To book a ride with ClearPath NEMT, you have several options:\n\n1. **Online**: Click 'Book a Ride' on our website\n2. **Phone**: Call 1-800-NEMT-NOW (1-800-636-8669)\n3. **Healthcare Provider**: Ask your doctor or clinic to arrange transportation\n\nWe recommend booking at least 24 hours in advance. What type of ride do you need?";
    }

    if (lowerInput.includes('wheelchair') || lowerInput.includes('accessible')) {
      return "Yes! All our vehicles are wheelchair accessible. When booking, just let us know you need a wheelchair-accessible vehicle, and we'll ensure the right equipment is available. Your caregiver or companion can ride with you at no extra cost. 🚐";
    }

    if (lowerInput.includes('service') || lowerInput.includes('what do you offer')) {
      return "ClearPath NEMT offers:\n\n✅ **Ambulatory Rides** - For mobile patients\n✅ **Wheelchair Accessible** - Full accessibility\n✅ **Stretcher Rides** - For patients needing stretchers\n✅ **Companion Care** - Your caregiver can ride along\n✅ **Real-Time Tracking** - Monitor your ride via GPS\n✅ **24/7 Transportation** - Always available\n\nWhich service interests you?";
    }

    // Insurance questions
    if (lowerInput.includes('insurance') || lowerInput.includes('cost') || lowerInput.includes('copay')) {
      return "We accept multiple insurance plans:\n\n💳 **MassHealth** - $0 copay (for eligible members)\n💳 **Medicare** - $0 copay (for eligible members)\n💳 **Medicaid** - $0 copay (for eligible members)\n💳 **Private Insurance** - Varies by plan\n\nMost eligible patients pay nothing! Want to verify your coverage?";
    }

    if (lowerInput.includes('coverage area') || lowerInput.includes('serve') || lowerInput.includes('where')) {
      return "ClearPath NEMT serves:\n\n📍 Massachusetts\n📍 Connecticut\n📍 Rhode Island\n📍 Vermont\n📍 New Hampshire\n\nEnter your location when booking to confirm coverage in your area.";
    }

    // Career/Join Us questions
    if (lowerInput.includes('job') || lowerInput.includes('career') || lowerInput.includes('hire') || lowerInput.includes('join')) {
      return "We're hiring! 🚀 Current openings:\n\n👨‍💼 **Professional Drivers**\n👨‍💼 **Dispatchers**\n👨‍💼 **Healthcare Coordinators**\n👨‍💼 **Operations Manager**\n\nVisit our 'Join Us' page to see full details, requirements, and apply. You can also email careers@clearpathnemt.com";
    }

    if (lowerInput.includes('benefit') || lowerInput.includes('why work')) {
      return "Why join ClearPath NEMT?\n\n✨ Health Insurance (medical, dental, vision)\n✨ Flexible Hours\n✨ 401(k) Retirement Plan\n✨ Professional Training\n✨ Growth Opportunities\n✨ Supportive Team Culture\n\nVisit our 'Join Us' page to learn more or apply!";
    }

    // Contact/Appointment questions
    if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('call')) {
      return "📞 **Contact ClearPath NEMT**\n\n☎️ **Phone**: 1-800-NEMT-NOW (1-800-636-8669)\n📧 **Email**: info@clearpathnemt.com\n💼 **Careers**: careers@clearpathnemt.com\n⏰ **Hours**: 24/7 Medical Transportation\n\nOur team is ready to help!";
    }

    // Cancellation/Changes
    if (lowerInput.includes('cancel') || lowerInput.includes('change') || lowerInput.includes('late')) {
      return "Need to modify your ride?\n\n✏️ **Changes**: Call us ASAP at 1-800-NEMT-NOW\n❌ **Cancellations**: You can cancel up to 2 hours before pickup without penalty\n⏰ **Late Changes**: Late cancellations may result in fees\n⚠️ **Running Late**: Call us if your appointment runs over\n\nOur drivers are flexible and understand that medical appointments don't always stay on schedule!";
    }

    // About ClearPath
    if (lowerInput.includes('about') || lowerInput.includes('mission') || lowerInput.includes('who are you')) {
      return "**About ClearPath NEMT**\n\nWe provide safe, reliable, and compassionate non-emergency medical transportation to MassHealth, Medicare, and Medicaid members across New England.\n\n🎯 **Our Mission**: Ensure every patient has access to safe, timely, and affordable medical transportation.\n\n💙 **Our Values**:\n• Compassion - We treat every patient with dignity\n• Reliability - Punctual, safe transportation\n• Accessibility - Serving all communities\n• Excellence - Continuous improvement";
    }

    // Companion/Caregiver
    if (lowerInput.includes('companion') || lowerInput.includes('caregiver') || lowerInput.includes('family')) {
      return "Absolutely! Companions and caregivers can ride with you at no additional cost. 👨‍👩‍👧\n\nThis is especially helpful if you need assistance or just want support during your medical appointment. Just let us know when booking that you'll have a companion.\n\nIs there anything else I can help you with?";
    }

    // FAQ redirect
    if (lowerInput.includes('faq') || lowerInput.includes('question')) {
      return "Great question! I've covered many common topics, but if you'd like to see more:\n\n📖 Visit our **FAQ page** on our website for 10+ detailed answers\n\nOr feel free to ask me anything about ClearPath NEMT services, booking, insurance, careers, or anything else! 😊";
    }

    // Default friendly response
    return "That's a great question! I can help with:\n\n🚐 Booking rides\n💳 Insurance & costs\n📍 Coverage areas\n👨‍💼 Careers & jobs\n❓ General questions\n\nWhat would you like to know more about?";
  };

  return (
    <>
      {/* Chat Widget Container */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen ? 'w-96' : 'w-auto'
        }`}
      >
        {isOpen ? (
          /* Chat Window */
          <div className="bg-white rounded-lg shadow-2xl flex flex-col" style={{ height: '600px' }}>
            {/* Header */}
            <div className="flex justify-between items-center p-4 rounded-t-lg" style={{ backgroundColor: '#003366' }}>
              <div className="flex items-center gap-2 text-white">
                <MessageCircle size={20} />
                <span className="font-semibold">ClearPath Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:opacity-80 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
                  style={{ borderColor: '#D4A574' }}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded text-white font-semibold flex items-center gap-2"
                  style={{ backgroundColor: '#D4A574' }}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Chat Button */
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full text-white font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            style={{ backgroundColor: '#D4A574' }}
          >
            <MessageCircle size={28} />
          </button>
        )}
      </div>
    </>
  );
}
