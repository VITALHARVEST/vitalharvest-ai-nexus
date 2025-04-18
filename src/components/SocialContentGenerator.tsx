
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Image, Facebook, Instagram, Twitter, Youtube, Copy, Calendar } from "lucide-react";

type Platform = 'facebook' | 'instagram' | 'twitter' | 'youtube';
type ContentType = 'text' | 'image' | 'video';

const SocialContentGenerator = () => {
  const [topic, setTopic] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [contentType, setContentType] = useState<ContentType>('text');
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const platforms = [
    { id: 'facebook', name: 'फेसबुक', icon: Facebook },
    { id: 'instagram', name: 'इंस्टाग्राम', icon: Instagram },
    { id: 'twitter', name: 'ट्विटर', icon: Twitter },
    { id: 'youtube', name: 'यूट्यूब', icon: Youtube },
  ];
  
  const contentTypes = [
    { id: 'text', name: 'टेक्स्ट पोस्ट' },
    { id: 'image', name: 'इमेज पोस्ट' },
    { id: 'video', name: 'वीडियो आइडिया' },
  ];
  
  const togglePlatform = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };
  
  const handleContentTypeChange = (type: ContentType) => {
    setContentType(type);
  };
  
  const mockContentGeneration = () => {
    const platformText = selectedPlatforms.length > 0 
      ? selectedPlatforms.join(', ') 
      : 'सभी प्लेटफॉर्म्स';
    
    const contentMap = {
      'text': `"${topic}" विषय पर ${platformText} के लिए पोस्ट:
      
क्या आप जानते हैं कि हमारा नया ${topic} उत्पाद आपकी उत्पादकता को 50% तक बढ़ा सकता है? 
विशेष लॉन्च ऑफर: अभी खरीदें और 20% की छूट प्राप्त करें! 
#VitalHarvest #${topic.replace(/\s+/g, '')} #ऑर्गेनिकखेती`,

      'image': `"${topic}" विषय पर ${platformText} के लिए इमेज पोस्ट आइडिया:
      
इमेज में दिखाएँ: किसान के हाथों में हमारा ${topic} उत्पाद
कैप्शन: "अपनी फसल को प्राकृतिक तरीके से बढ़ावा दें। हमारे नए ${topic} के साथ 50% अधिक उपज पाएँ।"
कॉल टू एक्शन: अभी ऑर्डर करें और मुफ्त डिलीवरी पाएँ!
हैशटैग: #VitalHarvest #ऑर्गेनिकखेती #${topic.replace(/\s+/g, '')}`,

      'video': `"${topic}" विषय पर ${platformText} के लिए वीडियो आइडिया:
      
शीर्षक: "${topic} - आधुनिक किसान की सफलता का राज़"
अवधि: 2-3 मिनट
सामग्री: 
- उत्पाद का संक्षिप्त परिचय (15 सेकंड)
- किसान के साथ इंटरव्यू जो इसका उपयोग कर रहे हैं (1 मिनट)
- उत्पाद के उपयोग का डेमो (45 सेकंड)
- परिणामों का प्रदर्शन (30 सेकंड)
- ऑफर और कॉल टू एक्शन (15 सेकंड)
हैशटैग: #VitalHarvest #${topic.replace(/\s+/g, '')} #किसानविडियो`
    };
    
    return contentMap[contentType];
  };
  
  const generateContent = () => {
    if (!topic.trim()) {
      toast.error("कृपया एक विषय दर्ज करें");
      return;
    }
    
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedContent(mockContentGeneration());
      setIsGenerating(false);
      toast.success("कंटेंट जनरेट किया गया!");
    }, 1500);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("कंटेंट क्लिपबोर्ड पर कॉपी किया गया");
  };
  
  const schedulePost = () => {
    toast.success("पोस्ट शेड्यूल करने के लिए कैलेंडर खुला");
    // Here we would open a scheduling modal or redirect to a scheduling page
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">सोशल मीडिया कंटेंट जनरेटर</h2>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="topic">विषय या उत्पाद</Label>
          <Input 
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="जैसे: ऑर्गेनिक खाद, कीट नियंत्रक इत्यादि"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label>प्लेटफॉर्म चुनें</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {platforms.map(platform => (
              <Button
                key={platform.id}
                variant={selectedPlatforms.includes(platform.id as Platform) ? "default" : "outline"}
                onClick={() => togglePlatform(platform.id as Platform)}
                className="flex items-center gap-2"
              >
                <platform.icon size={16} />
                {platform.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <Label>कंटेंट प्रकार</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {contentTypes.map(type => (
              <Button
                key={type.id}
                variant={contentType === type.id ? "default" : "outline"}
                onClick={() => handleContentTypeChange(type.id as ContentType)}
              >
                {type.name}
              </Button>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={generateContent} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? "कंटेंट जनरेट हो रहा है..." : "कंटेंट जनरेट करें"}
        </Button>
        
        {generatedContent && (
          <div className="mt-4">
            <Label>जनरेटेड कंटेंट</Label>
            <div className="mt-2 p-4 bg-gray-50 rounded-md border">
              <Textarea 
                value={generatedContent} 
                readOnly 
                className="min-h-32 bg-transparent border-0 focus-visible:ring-0 resize-none"
              />
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={copyToClipboard} className="flex items-center gap-2">
                  <Copy size={16} />
                  कॉपी करें
                </Button>
                <Button variant="outline" onClick={schedulePost} className="flex items-center gap-2">
                  <Calendar size={16} />
                  शेड्यूल करें
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialContentGenerator;
