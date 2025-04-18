import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Updated mock data for health and wellness products
const initialProducts = [
  {
    id: 1,
    name: "डायबिटीज़ स्पेशल आटा",
    description: "विशेष रूप से डायबिटीज़ रोगियों के लिए तैयार किया गया कम जी.आई. वाला आटा",
    price: 250,
    image: "https://assets.lovable.dev/templates/ecommerce/health1.jpg",
    category: "डायबिटीज़ फूड",
  },
  {
    id: 2,
    name: "शुगर फ्री स्वीटनर",
    description: "100% प्राकृतिक स्टीविया आधारित स्वीटनर",
    price: 180,
    image: "https://assets.lovable.dev/templates/ecommerce/health2.jpg",
    category: "डायबिटीज़ फूड",
  },
  {
    id: 3,
    name: "ऑर्गेनिक किनवा",
    description: "प्रोटीन और फाइबर से भरपूर सुपरफूड",
    price: 450,
    image: "https://assets.lovable.dev/templates/ecommerce/food1.jpg",
    category: "होलग्रेन",
  },
  {
    id: 4,
    name: "मिक्स्ड मिलेट्स",
    description: "विभिन्न प्रकार के पौष्टिक मिलेट्स का मिश्रण",
    price: 299,
    image: "https://assets.lovable.dev/templates/ecommerce/food2.jpg",
    category: "होलग्रेन",
  },
  {
    id: 5,
    name: "डायबिटीज़ प्रोटीन बार",
    description: "शुगर फ्री, हाई प्रोटीन एनर्जी बार",
    price: 180,
    image: "https://assets.lovable.dev/templates/ecommerce/supplement1.jpg",
    category: "सप्लीमेंट्स",
  },
  {
    id: 6,
    name: "मल्टीविटामिन टैबलेट्स",
    description: "डेली हेल्थ सप्लीमेंट",
    price: 550,
    image: "https://assets.lovable.dev/templates/ecommerce/supplement2.jpg",
    category: "सप्लीमेंट्स",
  }
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("सभी");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const addToCart = (productId: number) => {
    toast.success("उत्पाद कार्ट में जोड़ा गया");
  };
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "सभी" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = ["सभी", "डायबिटीज़ फूड", "होलग्रेन", "सप्लीमेंट्स", "किराना"];
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">हमारे उत्पाद</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-2/3">
          <Input
            type="text"
            placeholder="उत्पाद खोजें..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full"
          />
        </div>
        
        <div className="w-full md:w-1/3 flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <Button 
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-500">कोई उत्पाद नहीं मिला</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">₹{product.price}</span>
                  <Button onClick={() => addToCart(product.id)}>
                    कार्ट में जोड़ें
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
