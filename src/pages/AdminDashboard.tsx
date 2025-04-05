import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Category, Service } from '../types/database';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';

export default function AdminDashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    image_url: '',
    price: '',
    category_id: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // checkAuth(); // Authentication check removed
    fetchData();
  }, []);

  // const checkAuth = async () => { // Authentication check removed
  //   const { data: { session } } = await supabase.auth.getSession();
  //   if (!session) {
  //     navigate('/admin/login');
  //   }
  // };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);

      // Fetch services with category information
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false });

      if (servicesError) throw servicesError;
      setServices(servicesData || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const { error } = await supabase
        .from('categories')
        .insert([newCategory]);

      if (error) throw error;

      setNewCategory({ name: '', description: '' });
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const { error } = await supabase
        .from('services')
        .insert([{
          ...newService,
          category_id: selectedCategory
        }]);

      if (error) throw error;

      setNewService({
        title: '',
        description: '',
        image_url: '',
        price: '',
        category_id: ''
      });
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا القسم؟')) return;

    try {
      setError(null);
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;

    try {
      setError(null);
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            تسجيل خروج
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Categories Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">إدارة الأقسام</h2>

            <form onSubmit={handleAddCategory} className="mb-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="اسم القسم"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  placeholder="وصف القسم"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  إضافة قسم جديد
                </button>
              </div>
            </form>

            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="border p-4 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">إدارة الخدمات</h2>

            <form onSubmit={handleAddService} className="mb-6">
              <div className="space-y-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">اختر القسم</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="عنوان الخدمة"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  placeholder="وصف الخدمة"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="url"
                  placeholder="رابط الصورة"
                  value={newService.image_url}
                  onChange={(e) => setNewService({ ...newService, image_url: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="السعر"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  إضافة خدمة جديدة
                </button>
              </div>
            </form>

            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="border p-4 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        {service.category?.name}
                      </div>
                      <h3 className="font-bold">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                      <p className="text-primary font-bold mt-2">{service.price}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
