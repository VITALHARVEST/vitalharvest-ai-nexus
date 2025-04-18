
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
                <Link to="/products" className="px-3 py-2 text-sm font-medium text-gray-900">उत्पाद</Link>
                <Link to="/about" className="px-3 py-2 text-sm font-medium text-gray-900">हमारे बारे में</Link>
                <Link to="/contact" className="px-3 py-2 text-sm font-medium text-gray-900">संपर्क करें</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/admin">Admin पैनल</Link>
              </Button>
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
