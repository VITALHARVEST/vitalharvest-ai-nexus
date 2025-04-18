
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const CustomerFeedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !feedback || !rating) {
      toast.error("कृपया सभी आवश्यक फ़ील्ड भरें");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("कृपया वैध ईमेल पता दर्ज करें");
      return;
    }
    
    // Mobile validation (optional field)
    if (mobile && !/^\d{10}$/.test(mobile)) {
      toast.error("कृपया 10 अंकों का मोबाइल नंबर दर्ज करें");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("फीडबैक सफलतापूर्वक जमा किया गया! धन्यवाद।");
      
      // Reset form
      setName("");
      setEmail("");
      setMobile("");
      setFeedback("");
      setRating(null);
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">ग्राहक फीडबैक</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">नाम <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="आपका नाम"
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">ईमेल <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="आपका ईमेल"
              className="mt-1"
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="mobile">मोबाइल नंबर (वैकल्पिक)</Label>
          <Input
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="10 अंकों का मोबाइल नंबर"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="feedback">फीडबैक <span className="text-red-500">*</span></Label>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="अपना फीडबैक यहां लिखें..."
            className="mt-1 min-h-32"
            required
          />
        </div>
        
        <div>
          <Label>उत्पाद रेटिंग <span className="text-red-500">*</span></Label>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                type="button"
                variant={rating === star ? "default" : "outline"}
                onClick={() => setRating(star)}
                className="h-12 w-12 text-lg font-semibold"
              >
                {star}
              </Button>
            ))}
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "जमा हो रहा है..." : "फीडबैक जमा करें"}
        </Button>
      </form>
    </div>
  );
};

export default CustomerFeedback;
