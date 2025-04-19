
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="text-center space-y-6 p-8 max-w-5xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to VitalHarvest</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We help your business succeed in the digital world. Our powerful AI solutions transform your business operations and drive growth.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Content Creation</h3>
            <p className="text-gray-600 mb-4">Generate compelling content for blogs, social media, and emails with our AI tools.</p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/ai-hub">Try Now</Link>
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Image to Video Conversion</h3>
            <p className="text-gray-600 mb-4">Transform static images into dynamic videos with our cutting-edge AI technology.</p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/ai-hub">Try Now</Link>
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Human-like AI Chat</h3>
            <p className="text-gray-600 mb-4">Experience conversations with our advanced AI that responds like a real human.</p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/ai-hub">Try Now</Link>
            </Button>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center mt-12">
          <Button asChild size="lg">
            <Link to="/ai-hub">Explore AI Features</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
