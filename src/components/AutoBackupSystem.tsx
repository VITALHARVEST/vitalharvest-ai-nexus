
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar, Clock, Download, Upload, Database, CloudUpload } from "lucide-react";

const AutoBackupSystem = () => {
  const [lastBackupDate, setLastBackupDate] = useState<Date | null>(null);
  const [nextBackupDate, setNextBackupDate] = useState<Date | null>(null);
  const [backupStatus, setBackupStatus] = useState<'idle' | 'in-progress'>('idle');
  const [backupHistory, setBackupHistory] = useState<{date: Date, status: string, size: string}[]>([]);
  
  useEffect(() => {
    // Simulate fetching initial backup info
    const now = new Date();
    const lastBackup = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
    setLastBackupDate(lastBackup);
    
    const nextBackup = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day from now
    setNextBackupDate(nextBackup);
    
    // Mock backup history
    setBackupHistory([
      { date: new Date(now.getTime() - 24 * 60 * 60 * 1000), status: 'सफल', size: '2.3MB' },
      { date: new Date(now.getTime() - 48 * 60 * 60 * 1000), status: 'सफल', size: '2.1MB' },
      { date: new Date(now.getTime() - 72 * 60 * 60 * 1000), status: 'सफल', size: '2.0MB' },
    ]);
  }, []);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('hi-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const initiateManualBackup = () => {
    if (backupStatus === 'in-progress') {
      toast.error("बैकअप पहले से प्रगति पर है");
      return;
    }
    
    setBackupStatus('in-progress');
    toast.info("बैकअप प्रारंभ हुआ...");
    
    // Simulate backup process
    setTimeout(() => {
      const now = new Date();
      setLastBackupDate(now);
      setNextBackupDate(new Date(now.getTime() + 24 * 60 * 60 * 1000));
      setBackupStatus('idle');
      
      // Add to history
      setBackupHistory(prev => [
        { date: now, status: 'सफल', size: '2.5MB' },
        ...prev
      ]);
      
      toast.success("बैकअप सफलतापूर्वक पूरा हुआ");
    }, 3000);
  };
  
  const restoreFromBackup = (date: Date) => {
    toast.info(`${formatDate(date)} के बैकअप से रिस्टोर हो रहा है...`);
    
    // Simulate restore process
    setTimeout(() => {
      toast.success("सिस्टम सफलतापूर्वक रिस्टोर किया गया");
    }, 2000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">ऑटो-बैकअप सिस्टम</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-gray-600" />
            <h3 className="font-semibold">अंतिम बैकअप</h3>
          </div>
          {lastBackupDate ? (
            <>
              <p className="text-xl font-medium">{formatDate(lastBackupDate)}</p>
              <p className="text-gray-600">{formatTime(lastBackupDate)}</p>
            </>
          ) : (
            <p className="text-gray-600">कोई बैकअप नहीं लिया गया</p>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-gray-600" />
            <h3 className="font-semibold">अगला निर्धारित बैकअप</h3>
          </div>
          {nextBackupDate ? (
            <>
              <p className="text-xl font-medium">{formatDate(nextBackupDate)}</p>
              <p className="text-gray-600">{formatTime(nextBackupDate)}</p>
            </>
          ) : (
            <p className="text-gray-600">कोई बैकअप निर्धारित नहीं है</p>
          )}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button 
          onClick={initiateManualBackup} 
          disabled={backupStatus === 'in-progress'}
          className="flex items-center gap-2"
        >
          <CloudUpload size={18} />
          {backupStatus === 'in-progress' ? "बैकअप हो रहा है..." : "मैनुअल बैकअप करें"}
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Database size={18} />
          बैकअप सेटिंग्स
        </Button>
      </div>
      
      <div>
        <h3 className="font-semibold mb-3">बैकअप इतिहास</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">दिनांक</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">समय</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">आकार</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">स्थिति</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">कार्य</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {backupHistory.map((backup, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap">{formatDate(backup.date)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{formatTime(backup.date)}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{backup.size}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {backup.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => restoreFromBackup(backup.date)}
                      className="h-8 text-xs"
                    >
                      <Download size={14} className="mr-1" />
                      रिस्टोर
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AutoBackupSystem;
