
import React from 'react';
import AutoBackupSystem from '@/components/AutoBackupSystem';

const Backup = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">सिस्टम बैकअप</h1>
      <AutoBackupSystem />
    </div>
  );
};

export default Backup;
