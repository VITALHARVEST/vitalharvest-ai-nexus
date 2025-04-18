
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold mb-4">VitalHarvest में आपका स्वागत है</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          हम आपके व्यवसाय को डिजिटल दुनिया में सफल बनाने में मदद करते हैं। हमारे AI-संचालित समाधान आपके व्यवसाय को नई ऊंचाइयों तक ले जाएंगे।
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Button asChild>
            <Link to="/products">उत्पाद देखें</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">संपर्क करें</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
