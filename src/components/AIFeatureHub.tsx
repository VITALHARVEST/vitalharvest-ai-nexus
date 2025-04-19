
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Image as ImageIcon, Video, MessageSquare, FileText, Upload, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Image to Video conversion component
const ImageToVideo = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setVideoUrl(null);
    }
  };

  const convertToVideo = async () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }

    setLoading(true);
    
    // Simulating API call for demo purposes
    setTimeout(() => {
      // Mock video URL - in a real implementation, this would be returned from the API
      setVideoUrl("https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4");
      setLoading(false);
      toast.success("Image successfully converted to video");
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-64 relative">
        {preview ? (
          <img 
            src={preview} 
            alt="Preview" 
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="text-center p-6">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Upload an image to convert</p>
          </div>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" /> Select Image
        </Button>
        
        <Button 
          onClick={convertToVideo} 
          className="w-full"
          disabled={!image || loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
            </>
          ) : (
            <>
              <ArrowRight className="mr-2 h-4 w-4" /> Convert to Video
            </>
          )}
        </Button>
      </div>
      
      {videoUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Generated Video</h3>
          <video 
            controls 
            className="w-full rounded-lg border border-gray-200"
            src={videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

// Content Generation component
const ContentGenerator = () => {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("blog");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    setLoading(true);
    
    // Simulating API call for demo purposes
    setTimeout(() => {
      // Mock content generation
      const content = {
        blog: `# ${topic}: The Ultimate Guide\n\nIn today's fast-paced digital world, ${topic} has become increasingly important. Let's explore why it matters and how you can leverage it effectively.\n\n## Why ${topic} Matters\n\n${topic} is transforming the way businesses operate and customers engage with products. The innovation in this space has accelerated dramatically in recent years.\n\n## Key Strategies for ${topic}\n\n1. Research thoroughly before implementation\n2. Start with small, measurable goals\n3. Iterate based on feedback\n4. Stay updated with industry trends`,
        
        social: `📣 Game-changing insights about ${topic}! 🚀\n\nWe've been exploring the latest trends in ${topic} and the results are mind-blowing! Our team discovered that implementing ${topic} strategies can boost engagement by up to 45%.\n\nSwipe up to learn our top 3 tips for mastering ${topic} in 2024! 👆\n\n#${topic.replace(/\s+/g, '')} #Innovation #DigitalTransformation`,
        
        email: `Subject: Transform Your Business with Our ${topic} Solutions\n\nDear Valued Customer,\n\nI hope this email finds you well.\n\nI'm reaching out to share some exciting developments in our ${topic} offerings that I believe would be perfect for your business needs.\n\nOur team has developed a comprehensive approach to ${topic} that has helped companies like yours achieve remarkable results - increasing efficiency by 30% and reducing costs by 25%.\n\nWould you be available for a quick 15-minute call next week to discuss how our ${topic} solutions could benefit your operations?\n\nBest regards,\nThe VitalHarvest Team`
      };
      
      setGeneratedContent(content[contentType as keyof typeof content]);
      setLoading(false);
      toast.success(`${contentType.charAt(0).toUpperCase() + contentType.slice(1)} content successfully generated`);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Content copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="topic">Topic or Keyword</Label>
        <Input 
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., AI Marketing, Sustainable Farming)"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Content Type</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={contentType === "blog" ? "default" : "outline"}
            onClick={() => setContentType("blog")}
            className="flex items-center gap-2"
          >
            <FileText size={16} />
            Blog Post
          </Button>
          <Button
            variant={contentType === "social" ? "default" : "outline"}
            onClick={() => setContentType("social")}
            className="flex items-center gap-2"
          >
            <MessageSquare size={16} />
            Social Media
          </Button>
          <Button
            variant={contentType === "email" ? "default" : "outline"}
            onClick={() => setContentType("email")}
            className="flex items-center gap-2"
          >
            <MessageSquare size={16} />
            Email
          </Button>
        </div>
      </div>
      
      <Button 
        onClick={generateContent} 
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Content
          </>
        ) : (
          "Generate Content"
        )}
      </Button>
      
      {generatedContent && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <Label>Generated Content</Label>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              Copy
            </Button>
          </div>
          <Textarea 
            value={generatedContent} 
            readOnly 
            className="min-h-[300px] font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
};

// Human-Like AI Chat component
const AIChat = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<{role: "user" | "ai", content: string}[]>([
    {role: "ai", content: "Hello! I'm your AI assistant. How can I help you today?"}
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const sendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    const userMessage = message;
    setConversation([...conversation, {role: "user", content: userMessage}]);
    setMessage("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on my understanding, the best approach would be to analyze your specific needs first before implementing a solution.",
        "I see what you're trying to accomplish. Many of our customers have had success with similar initiatives by starting with a pilot program.",
        "Interesting point! Looking at recent trends in this area, there's been significant innovation that could benefit your specific use case.",
        "I understand your concern. Let me suggest a few alternative approaches that might work better for your situation.",
        "Based on what you've shared, I'd recommend considering a more customized strategy that aligns with your unique requirements."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setConversation(prev => [...prev, {role: "ai", content: randomResponse}]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
        {conversation.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.role === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-4 flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={sendMessage} disabled={isTyping || !message.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
};

const AIFeatureHub = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Hub</h1>
        <p className="text-gray-600 mb-6">Advanced AI tools to enhance your digital experience</p>
        
        <Tabs defaultValue="chat">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">AI Assistant</TabsTrigger>
            <TabsTrigger value="image-to-video">Image to Video</TabsTrigger>
            <TabsTrigger value="content">Content Generator</TabsTrigger>
          </TabsList>
          
          <Card className="mt-4 border-t-0 rounded-t-none">
            <CardContent className="pt-6">
              <TabsContent value="chat" className="mt-0">
                <AIChat />
              </TabsContent>
              
              <TabsContent value="image-to-video" className="mt-0">
                <ImageToVideo />
              </TabsContent>
              
              <TabsContent value="content" className="mt-0">
                <ContentGenerator />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default AIFeatureHub;
