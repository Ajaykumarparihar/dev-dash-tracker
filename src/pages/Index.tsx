
import React from 'react';
import Hero from '@/components/landing/Hero';

const Index = () => {
  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10"></div>
      
      <Hero />
    </div>
  );
};

export default Index;
