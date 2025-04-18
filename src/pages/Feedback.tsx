
import React from 'react';
import CustomerFeedback from '@/components/CustomerFeedback';

const Feedback = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">ग्राहक फीडबैक</h1>
      <CustomerFeedback />
    </div>
  );
};

export default Feedback;
