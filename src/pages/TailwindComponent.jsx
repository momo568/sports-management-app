/* eslint-disable no-unused-vars */
// src/components/TailwindComponent.jsx
import React from 'react';

const TailwindComponent = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-4xl">Responsive Layout with Tailwind CSS</h1>
      <p className="text-sm md:text-base">This adjusts based on screen size.</p>
    </div>
  );
};

export default TailwindComponent;
