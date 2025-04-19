
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to VitalHarvest</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We help your business succeed in the digital world. Our AI-powered solutions will take your business to new heights.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Button asChild>
            <Link to="/products">View Products</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
