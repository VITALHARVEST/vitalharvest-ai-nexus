import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, User, Bot, StopCircle } from "lucide-react";
import { toast } from "sonner";

declare global {
  interface Window {
    SpeechRecognition?: typeof SpeechRecognition;
    webkitSpeechRecognition?: typeof SpeechRecognition;
  }
}

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const mockResponses = [
  "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूं?",
  "हमारे पास स्वास्थ्य और डायबिटीज़ उत्पादों की एक विस्तृत श्रृंखला है। क्या आप किसी विशेष उत्पाद में रुचि रखते हैं?",
  "हमारे डायबिटीज़ स्पेशल आटे के बारे में अधिक जानकारी के लिए, आप हमारी वेबसाइट पर उत्पाद विवरण देख सकते हैं।",
  "क्या आप हमारे नवीनतम स्वास्थ्य सप्लीमेंट्स के बारे में जानना चाहते हैं?",
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesis = window.speechSynthesis;
  const speechRecognition = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      speechRecognition.current = new SpeechRecognition();
      speechRecognition.current.continuous = true;
      speechRecognition.current.interimResults = true;
      speechRecognition.current.lang = 'hi-IN'; // Set language to Hindi
      
      speechRecognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInput(transcript);
      };
      
      speechRecognition.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
        toast.error("वॉइस इनपुट में त्रुटि हुई");
      };
    } else {
      toast.error("आपका ब्राउज़र वॉइस इनपुट का समर्थन नहीं करता है");
    }
    
    return () => {
      if (speechRecognition.current) {
        speechRecognition.current.abort();
      }
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

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
  
  const speakText = (text: string) => {
    if (speechSynthesis) {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        toast.error("वॉइस आउटपुट में त्रुटि हुई");
      };
      
      speechSynthesis.speak(utterance);
    }
  };
  
  const handleSend = () => {
    if (input.trim() === "") return;
    
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    
    setTimeout(() => {
      const botResponse = getRandomResponse();
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      
      speakText(botResponse);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  
  const toggleRecording = () => {
    if (!speechRecognition.current) {
      toast.error("आपका ब्राउज़र वॉइस इनपुट का समर्थन नहीं करता है");
      return;
    }
    
    if (isRecording) {
      speechRecognition.current.stop();
      setIsRecording(false);
      if (input.trim()) {
        handleSend();
      }
    } else {
      speechRecognition.current.start();
      setIsRecording(true);
      toast.success("वॉइस इनपुट शुरू हुआ");
    }
  };
  
  const stopSpeaking = () => {
    if (speechSynthesis && speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
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
          <div className="p-3 bg-primary text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">VitalHarvest AI असिस्टेंट</h3>
            {isSpeaking && (
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8" 
                onClick={stopSpeaking}
              >
                <StopCircle size={18} className="text-white" />
              </Button>
            )}
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
                disabled={isRecording}
              />
              <Button 
                size="icon" 
                onClick={toggleRecording} 
                variant={isRecording ? "destructive" : "outline"}
                title={isRecording ? "वॉइस इनपुट बंद करें" : "वॉइस इनपुट शुरू करें"}
              >
                <Mic size={18} />
              </Button>
              <Button 
                size="icon" 
                onClick={handleSend}
                disabled={!input.trim()}
              >
                <Send size={18} />
              </Button>
            </div>
            {isRecording && (
              <p className="text-xs text-center mt-2 text-red-500 animate-pulse">
                वॉइस रिकॉर्डिंग चल रही है...
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
