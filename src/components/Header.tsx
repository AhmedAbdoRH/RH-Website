import React from 'react';
import logo from './scr/logo.png'; // Import the logo from the scr folder

export default function Header() {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <img
          src={logo} // Use the imported logo variable
          alt="Logo"
          className="h-12 w-12"
        />
        <nav>
          <ul className="flex gap-6">
            <li><a href="#services" className="hover:text-primary">الخدمات التسويقية</a></li>
            <li><a href="#import" className="hover:text-primary">خدمات الاستيراد</a></li>
            <li><a href="#training" className="hover:text-primary">خدمات التدريب</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
