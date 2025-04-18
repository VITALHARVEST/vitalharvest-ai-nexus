
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock data for products
const initialProducts = [
  {
    id: 1,
    name: "ऑर्गेनिक खाद",
    description: "फसलों के लिए 100% ऑर्गेनिक खाद",
    price: 500,
    image: "https://assets.lovable.dev/templates/ecommerce/product1.jpg",
    category: "कृषि",
  },
  {
    id: 2,
    name: "बीज संग्रह",
    description: "विभिन्न प्रकार के उच्च गुणवत्ता वाले बीज",
    price: 350,
    image: "https://assets.lovable.dev/templates/ecommerce/product2.jpg",
    category: "कृषि",
  },
  {
    id: 3,
    name: "कीट नियंत्रक",
    description: "जैविक कीट नियंत्रण समाधान",
    price: 450,
    image: "https://assets.lovable.dev/templates/ecommerce/product3.jpg",
    category: "कृषि",
  },
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
  
  const categories = ["सभी", "कृषि", "उपकरण", "प्रशिक्षण"];
  
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
