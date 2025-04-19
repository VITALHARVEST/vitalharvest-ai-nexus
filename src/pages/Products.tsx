
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Updated mock data for health and wellness products
const initialProducts = [
  {
    id: 1,
    name: "Diabetes Special Flour",
    description: "Low GI flour specially prepared for diabetic patients",
    price: 250,
    image: "https://assets.lovable.dev/templates/ecommerce/health1.jpg",
    category: "Diabetic Food",
  },
  {
    id: 2,
    name: "Sugar Free Sweetener",
    description: "100% natural stevia-based sweetener",
    price: 180,
    image: "https://assets.lovable.dev/templates/ecommerce/health2.jpg",
    category: "Diabetic Food",
  },
  {
    id: 3,
    name: "Organic Quinoa",
    description: "Superfood rich in protein and fiber",
    price: 450,
    image: "https://assets.lovable.dev/templates/ecommerce/food1.jpg",
    category: "Whole Grains",
  },
  {
    id: 4,
    name: "Mixed Millets",
    description: "A mix of various nutritious millets",
    price: 299,
    image: "https://assets.lovable.dev/templates/ecommerce/food2.jpg",
    category: "Whole Grains",
  },
  {
    id: 5,
    name: "Diabetic Protein Bars",
    description: "Sugar-free, high-protein energy bars",
    price: 180,
    image: "https://assets.lovable.dev/templates/ecommerce/supplement1.jpg",
    category: "Supplements",
  },
  {
    id: 6,
    name: "Multivitamin Tablets",
    description: "Daily health supplement",
    price: 550,
    image: "https://assets.lovable.dev/templates/ecommerce/supplement2.jpg",
    category: "Supplements",
  }
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const addToCart = (productId: number) => {
    toast.success("Product added to cart");
  };
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = ["All", "Diabetic Food", "Whole Grains", "Supplements", "Grocery"];
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-2/3">
          <Input
            type="text"
            placeholder="Search products..."
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
          <p className="text-xl text-gray-500">No products found</p>
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
                    Add to Cart
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
