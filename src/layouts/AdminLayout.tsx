
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Home, Users, FileText, Settings, Database } from 'lucide-react';

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
                <Link to="/admin/dashboard" className="px-3 py-2 text-sm font-medium text-gray-900 flex items-center">
                  <Home size={16} className="mr-1" />
                  डैशबोर्ड
                </Link>
                <Link to="/admin/content" className="px-3 py-2 text-sm font-medium text-gray-900 flex items-center">
                  <FileText size={16} className="mr-1" />
                  कंटेंट
                </Link>
                <Link to="/admin/customers" className="px-3 py-2 text-sm font-medium text-gray-900 flex items-center">
                  <Users size={16} className="mr-1" />
                  ग्राहक
                </Link>
                <Link to="/admin/backup" className="px-3 py-2 text-sm font-medium text-gray-900 flex items-center">
                  <Database size={16} className="mr-1" />
                  बैकअप
                </Link>
                <Link to="/admin/settings" className="px-3 py-2 text-sm font-medium text-gray-900 flex items-center">
                  <Settings size={16} className="mr-1" />
                  सेटिंग्स
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden sm:block">
                <Button variant="outline" onClick={() => navigate('/')}>
                  पब्लिक साइट देखें
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
                      <Link to="/admin" className="text-lg font-semibold px-4">VitalHarvest Admin</Link>
                      <Link to="/admin/dashboard" className="px-4 py-2 hover:bg-gray-100 rounded-md flex items-center">
                        <Home size={16} className="mr-2" />
                        डैशबोर्ड
                      </Link>
                      <Link to="/admin/content" className="px-4 py-2 hover:bg-gray-100 rounded-md flex items-center">
                        <FileText size={16} className="mr-2" />
                        कंटेंट
                      </Link>
                      <Link to="/admin/customers" className="px-4 py-2 hover:bg-gray-100 rounded-md flex items-center">
                        <Users size={16} className="mr-2" />
                        ग्राहक
                      </Link>
                      <Link to="/admin/backup" className="px-4 py-2 hover:bg-gray-100 rounded-md flex items-center">
                        <Database size={16} className="mr-2" />
                        बैकअप
                      </Link>
                      <Link to="/admin/settings" className="px-4 py-2 hover:bg-gray-100 rounded-md flex items-center">
                        <Settings size={16} className="mr-2" />
                        सेटिंग्स
                      </Link>
                      <Link to="/" className="px-4 py-2 mt-4 text-primary">पब्लिक साइट</Link>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
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
