import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
}

export default function ServiceCard({ title, description, imageUrl, price }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">{price}</span>
          <button className="bg-accent text-white px-4 py-2 rounded hover:bg-opacity-90">
            اطلب الآن
          </button>
        </div>
      </div>
    </div>
  );
}