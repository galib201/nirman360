
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, MessageCircle, Scale, Search, Home } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const NirmanBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm NirmanBot, your virtual real estate assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { label: "Ask Legal Question", icon: Scale, action: "legal" },
    { label: "Search Properties", icon: Search, action: "search" },
    { label: "Area Information", icon: Home, action: "area" },
    { label: "Budget Planning", icon: MessageCircle, action: "budget" }
  ];

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('legal') || input.includes('lawyer') || input.includes('document')) {
      return "For legal questions, I recommend consulting with our certified real estate lawyers. They can help with property documentation, registration, and legal compliance. Would you like me to connect you with our legal team?";
    }
    
    if (input.includes('pet') && input.includes('2bhk')) {
      return "Let me help you find a pet-friendly 2BHK in Dhanmondi! I found several options with pet-friendly policies. Would you like to see properties with gardens or balconies for your pet?";
    }
    
    if (input.includes('budget') || input.includes('price') || input.includes('cost')) {
      return "I can help you plan your budget! For a typical 2BHK in Dhaka, prices range from BDT 15,000 to BDT 40,000 per month for rent, or BDT 50 lakhs to BDT 1.5 crore for purchase. What's your preferred budget range?";
    }
    
    if (input.includes('area') || input.includes('location') || input.includes('dhanmondi') || input.includes('gulshan')) {
      return "I can provide detailed area information! Popular areas like Dhanmondi offer great connectivity, schools, and shopping centers. Gulshan is known for its upscale environment and business district proximity. Which area interests you?";
    }
    
    if (input.includes('search') || input.includes('find') || input.includes('property')) {
      return "I'll help you search for properties! To give you the best recommendations, please tell me: your preferred location, budget range, property type (apartment/house), and any specific requirements like parking or furnishing.";
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm here to assist you with all your real estate needs. You can ask me about properties, legal requirements, area information, or budget planning. What would you like to know?";
    }
    
    return "I understand you're looking for real estate assistance. I can help you with property searches, legal questions, area information, and budget planning. Could you please be more specific about what you need?";
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(messageText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      legal: "I need help with legal documentation and property registration.",
      search: "I want to search for properties in Dhaka.",
      area: "Can you tell me about different areas in Dhaka?",
      budget: "Help me plan my budget for buying/renting a property."
    };
    
    handleSendMessage(actionMessages[action as keyof typeof actionMessages]);
  };

  return (
    <div className="flex flex-col h-96 max-w-md mx-auto">
      {/* Chat Header */}
      <div className="bg-nirman-navy text-white p-4 rounded-t-lg flex items-center gap-2">
        <Bot className="h-6 w-6" />
        <div>
          <h3 className="font-semibold">NirmanBot</h3>
          <p className="text-xs opacity-90">Real Estate Assistant</p>
        </div>
        <Badge variant="secondary" className="ml-auto bg-green-500 text-white">
          Online
        </Badge>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'bg-nirman-navy text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-3 bg-white border-t">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {quickActions.map((action) => (
            <Button
              key={action.action}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.action)}
              className="text-xs justify-start"
            >
              <action.icon className="h-3 w-3 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white rounded-b-lg border-t flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1"
        />
        <Button 
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim() || isTyping}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NirmanBot;
