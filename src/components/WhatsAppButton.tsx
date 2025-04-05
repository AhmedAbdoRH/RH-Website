import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/your-number-here"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}