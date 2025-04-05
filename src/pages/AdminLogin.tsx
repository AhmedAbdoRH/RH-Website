import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      
      // تسجيل الدخول باستخدام بيانات الاعتماد الثابتة
      const { error } = await supabase.auth.signInWithPassword({
        email: 'rehlathadaf@gmail.com',
        password: 'RHM@3333'
      });

      if (error) throw error;
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول للوحة التحكم</h2>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 disabled:opacity-50"
          >
            {isLoading ? 'جاري تسجيل الدخول...' : 'الدخول إلى لوحة التحكم'}
          </button>
        </form>
      </div>
    </div>
  );
}