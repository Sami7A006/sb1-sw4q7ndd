import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Bot, Heart, ScanLine, UtensilsCrossed } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { mockChatResponses } from '../utils/mockData';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI health assistant. I can help you with product ingredients, diet plans, and health advice. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const suggestedQuestions = [
    "Is sodium lauryl sulfate harmful?",
    "What's a good diet for weight loss?",
    "Can you analyze this ingredient list?",
    "What should my daily calorie intake be?",
    "How harmful is titanium dioxide?",
  ];
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const getBotResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Simple keyword matching for demo purposes
    if (lowercaseInput.includes('ingredient') || lowercaseInput.includes('harmful')) {
      return mockChatResponses.ingredients;
    } else if (lowercaseInput.includes('diet') || lowercaseInput.includes('weight loss')) {
      return mockChatResponses.diet;
    } else if (lowercaseInput.includes('calorie') || lowercaseInput.includes('calories')) {
      return mockChatResponses.calories;
    } else if (lowercaseInput.includes('sodium lauryl sulfate') || lowercaseInput.includes('sls')) {
      return mockChatResponses.sls;
    } else if (lowercaseInput.includes('titanium dioxide')) {
      return mockChatResponses.titaniumDioxide;
    } else {
      return mockChatResponses.default;
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6 text-center text-3xl font-bold">AI Health Assistant</h1>
        <p className="mb-8 text-center text-lg text-gray-600">
          Ask questions about product ingredients, diet plans, and health advice.
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <h2 className="mb-4 text-lg font-semibold">Ask me about:</h2>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <ScanLine className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Product Safety</h3>
                    <p className="text-sm text-gray-600">Analyze ingredients and check for harmful chemicals</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Heart className="mr-3 h-5 w-5 text-red-500" />
                  <div>
                    <h3 className="font-medium">Health Advice</h3>
                    <p className="text-sm text-gray-600">Get tips on health, nutrition, and wellness</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <UtensilsCrossed className="mr-3 h-5 w-5 text-secondary" />
                  <div>
                    <h3 className="font-medium">Diet Plans</h3>
                    <p className="text-sm text-gray-600">Personalized nutrition and meal recommendations</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="mb-2 text-sm font-medium text-gray-700">Suggested Questions</h3>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="w-full rounded-md bg-gray-50 py-2 px-3 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Section */}
          <div className="flex flex-col lg:col-span-3">
            <Card className="flex h-[600px] flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[80%] items-start ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                          message.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="h-5 w-5" />
                          ) : (
                            <Bot className="h-5 w-5" />
                          )}
                        </div>
                        
                        <div className={`mx-2 rounded-2xl px-4 py-2 ${
                          message.sender === 'user' 
                            ? 'rounded-tr-none bg-primary text-white' 
                            : 'rounded-tl-none bg-gray-100 text-gray-800'
                        }`}>
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div className={`mt-1 text-xs ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[80%] items-start">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                          <Bot className="h-5 w-5" />
                        </div>
                        <div className="mx-2 rounded-2xl rounded-tl-none bg-gray-100 px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.2s' }}></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Input area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-end">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 resize-none rounded-lg border border-gray-300 py-2 px-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    rows={2}
                  />
                  <Button
                    variant="primary"
                    className="ml-2 h-10 w-10 rounded-full p-0"
                    onClick={handleSend}
                    disabled={!input.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatbotPage;