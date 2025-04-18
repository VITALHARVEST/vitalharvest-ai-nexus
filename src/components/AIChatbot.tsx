
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, User, Bot } from "lucide-react";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const mockResponses = [
  "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूं?",
  "हमारे पास कृषि उत्पादों की एक विस्तृत श्रृंखला है। क्या आप किसी विशेष उत्पाद में रुचि रखते हैं?",
  "हमारे ऑर्गेनिक खाद के बारे में अधिक जानकारी के लिए, आप हमारी वेबसाइट पर उत्पाद विवरण देख सकते हैं।",
  "क्या आप हमारे नवीनतम प्रशिक्षण कार्यक्रमों के बारे में जानना चाहते हैं?",
  "हमारे उत्पादों को खरीदने के लिए आप हमारी वेबसाइट पर ऑर्डर कर सकते हैं या हमारे विक्रेताओं से संपर्क कर सकते हैं।",
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "नमस्ते! मैं VitalHarvest AI असिस्टेंट हूं। मैं आपकी क्या मदद कर सकता हूं?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const getRandomResponse = () => {
    const randomIndex = Math.floor(Math.random() * mockResponses.length);
    return mockResponses[randomIndex];
  };
  
  const handleSend = () => {
    if (input.trim() === "") return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getRandomResponse(),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording functionality would be implemented here
    if (!isRecording) {
      // Start recording
      // This is a mock implementation
      setTimeout(() => {
        setIsRecording(false);
        setInput("मुझे फसलों के लिए उत्पादों के बारे में जानकारी चाहिए।");
      }, 2000);
    }
  };
  
  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 p-0 shadow-lg"
      >
        <Bot size={24} />
      </Button>
      
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col border border-gray-200">
          <div className="p-3 bg-primary text-white rounded-t-lg">
            <h3 className="font-medium">VitalHarvest AI असिस्टेंट</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.isUser 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="मेसेज लिखें..."
                className="flex-1"
              />
              <Button 
                size="icon" 
                onClick={toggleRecording} 
                variant={isRecording ? "destructive" : "outline"}
              >
                <Mic size={18} />
              </Button>
              <Button size="icon" onClick={handleSend}>
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
