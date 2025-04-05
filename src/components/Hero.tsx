import React from 'react';

export default function Hero() {
  return (
    <div className="bg-beige py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">حلول متكاملة لمتجرك الإلكتروني</h1>
        <p className="text-xl mb-8">نقدم خدمات احترافية في التسويق، الاستيراد، والتدريب</p>
        <div className="flex gap-4 justify-center">
          <a href="#services" className="bg-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90">
            اكتشف خدماتنا
          </a>
          <a href="#contact" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90">
            تواصل معنا
          </a>
        </div>
      </div>
    </div>
  );
}