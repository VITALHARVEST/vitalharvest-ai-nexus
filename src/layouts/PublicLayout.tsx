
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';

const PublicLayout = () => {
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">VitalHarvest</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/products" className="px-3 py-2 text-sm font-medium text-gray-900">Products</Link>
                <Link to="/about" className="px-3 py-2 text-sm font-medium text-gray-900">About Us</Link>
                <Link to="/contact" className="px-3 py-2 text-sm font-medium text-gray-900">Contact</Link>
                <Link to="/feedback" className="px-3 py-2 text-sm font-medium text-gray-900">Feedback</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <Button variant="outline" asChild>
                  <Link to="/admin">Admin Panel</Link>
                </Button>
              </div>
              
              <div className="sm:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <div className="flex flex-col py-4 space-y-4">
                      <Link to="/" className="text-lg font-semibold px-4">VitalHarvest</Link>
                      <Link to="/products" className="px-4 py-2 hover:bg-gray-100 rounded-md">Products</Link>
                      <Link to="/about" className="px-4 py-2 hover:bg-gray-100 rounded-md">About Us</Link>
                      <Link to="/contact" className="px-4 py-2 hover:bg-gray-100 rounded-md">Contact</Link>
                      <Link to="/feedback" className="px-4 py-2 hover:bg-gray-100 rounded-md">Feedback</Link>
                      <Link to="/admin" className="px-4 py-2 mt-4 text-primary">Admin Panel</Link>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
