'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Category } from '@/interfaces';

interface Props {
  categories: Category[];
}

export default function AddProductComponent({ categories }: Props) {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre del producto es obligatorio.';
    }
    if (!category.trim()) {
      newErrors.category = 'Debes seleccionar una categoría.';
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'El precio debe ser un número mayor que 0.';
    }
    if (!stock || isNaN(Number(stock)) || Number(stock) < 0) {
      newErrors.stock = 'El stock debe ser un número igual o mayor que 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { error } = await supabase.from('products').insert([
      {
        name,
        category,
        price: Number.parseFloat(price),
        stock: Number.parseInt(stock),
      },
    ]);

    if (error) {
      console.error('Error adding product:', error);
      setErrors({ form: 'Hubo un error al agregar el producto.' });
    } else {
      router.push('/dashboard/products');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-semibold mb-4">Añadir Producto</h1>
      <p className="text-sm text-gray-500 mb-6">
        Ingresa los detalles del nuevo producto
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del producto"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Categoría */}
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Categoría
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="text-xs text-red-500">{errors.category}</p>
          )}
        </div>

        {/* Precio */}
        <div className="space-y-2">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Precio
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            step="0.01"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.price && (
            <p className="text-xs text-red-500">{errors.price}</p>
          )}
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock
          </label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.stock && (
            <p className="text-xs text-red-500">{errors.stock}</p>
          )}
        </div>

        {/* Error general */}
        {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}

        {/* Botón */}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Añadir Producto
        </button>
      </form>
    </div>
  );
}
