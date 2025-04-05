import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { supabase } from '../lib/supabase';
import type { Service } from '../types/database';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-beige">
        <div className="container mx-auto px-4 text-center">
          جاري التحميل...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-beige">
        <div className="container mx-auto px-4 text-center text-red-600">
          حدث خطأ أثناء تحميل الخدمات
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-beige">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">خدماتنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description || ''}
              imageUrl={service.image_url || ''}
              price={service.price || ''}
            />
          ))}
        </div>
      </div>
    </section>
  );
}