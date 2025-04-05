import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">جميع الحقوق محفوظة © 2024</p>
          <Link to="/admin/login" className="text-gray-600 hover:text-primary">
            لوحة التحكم
          </Link>
        </div>
      </div>
    </footer>
  );
}