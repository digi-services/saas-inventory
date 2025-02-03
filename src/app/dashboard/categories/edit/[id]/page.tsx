'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';

export default function EditCategoryPage() {
  const [name, setName] = useState('');
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id;

  useEffect(() => {
    fetchCategory();
  }, [categoryId]);

  const fetchCategory = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', categoryId)
      .single();
    if (error) {
      console.error('Error fetching category:', error);
    } else {
      setName(data.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('categories')
      .update({ name })
      .eq('id', categoryId);
    if (error) {
      console.error('Error updating category:', error);
    } else {
      router.push('/categories'); // Redirigir a la lista de categorías
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Editar Categoría</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
