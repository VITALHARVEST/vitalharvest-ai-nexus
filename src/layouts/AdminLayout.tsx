
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/admin" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">VitalHarvest Admin</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/admin/dashboard" className="px-3 py-2 text-sm font-medium text-gray-900">डैशबोर्ड</Link>
                <Link to="/admin/content" className="px-3 py-2 text-sm font-medium text-gray-900">कंटेंट</Link>
                <Link to="/admin/customers" className="px-3 py-2 text-sm font-medium text-gray-900">ग्राहक</Link>
                <Link to="/admin/settings" className="px-3 py-2 text-sm font-medium text-gray-900">सेटिंग्स</Link>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="outline" onClick={() => navigate('/')}>
                पब्लिक साइट देखें
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
