
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";

// Types for our product data
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ProductManagement = () => {
  // Initial products data (same as in Products.tsx)
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

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "Diabetic Food"
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Categories available
  const categories = ["Diabetic Food", "Whole Grains", "Supplements", "Grocery"];

  // Load products on initial render
  useEffect(() => {
    // In a real app, you'd fetch this from an API or database
    // Here we're just using the hardcoded data
    setProducts(initialProducts);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddProduct = () => {
    const newId = Math.max(0, ...products.map(p => p.id)) + 1;
    const productToAdd = { ...newProduct, id: newId };
    
    setProducts([...products, productToAdd]);
    toast.success("Product added successfully");
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "Diabetic Food"
    });
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;
    
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === editingProduct.id ? editingProduct : product
      )
    );
    
    toast.success("Product updated successfully");
    setIsEditDialogOpen(false);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    toast.success("Product deleted successfully");
  };

  const startEditingProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  // Function to handle new product form changes
  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
  };

  // Function to handle edit product form changes
  const handleEditProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingProduct) return;
    
    const { name, value } = e.target;
    setEditingProduct(prev => prev ? { ...prev, [name]: name === 'price' ? parseFloat(value) : value } : null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:w-2/3">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full"
          />
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={newProduct.name} 
                  onChange={handleNewProductChange} 
                  placeholder="Enter product name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={newProduct.description} 
                  onChange={handleNewProductChange} 
                  placeholder="Enter product description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  value={newProduct.price.toString()} 
                  onChange={handleNewProductChange} 
                  placeholder="Enter price"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  name="image" 
                  value={newProduct.image} 
                  onChange={handleNewProductChange} 
                  placeholder="Enter image URL"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newProduct.category} 
                  onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddProduct}>Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            {editingProduct && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Product Name</Label>
                  <Input 
                    id="edit-name" 
                    name="name" 
                    value={editingProduct.name} 
                    onChange={handleEditProductChange} 
                    placeholder="Enter product name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea 
                    id="edit-description" 
                    name="description" 
                    value={editingProduct.description} 
                    onChange={handleEditProductChange} 
                    placeholder="Enter product description"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Price (₹)</Label>
                  <Input 
                    id="edit-price" 
                    name="price" 
                    type="number" 
                    value={editingProduct.price.toString()} 
                    onChange={handleEditProductChange} 
                    placeholder="Enter price"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-image">Image URL</Label>
                  <Input 
                    id="edit-image" 
                    name="image" 
                    value={editingProduct.image} 
                    onChange={handleEditProductChange} 
                    placeholder="Enter image URL"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select 
                    value={editingProduct.category} 
                    onValueChange={(value) => setEditingProduct(prev => prev ? { ...prev, category: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleEditProduct}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 rounded overflow-hidden">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500 line-clamp-2">{product.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => startEditingProduct(product)}>
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
