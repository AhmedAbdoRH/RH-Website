import React from 'react';
import logo from './logo.png'; // Import the logo from the scr folder

export default function Header() {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="h-16 w-auto flex-shrink-0"> {/* حاوية أكبر للشعار */}
          <img
            src={logo} // Use the imported logo variable
            alt="Logo"
            className="h-full w-auto" // السماح بالتمدد النسبي
            style={{ maxHeight: '100%', maxWidth: '100%' }} // قيود قصوى اختيارية
          />
        </div>
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
