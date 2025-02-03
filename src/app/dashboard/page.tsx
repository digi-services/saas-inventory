'use client'; // Convertir en Client Component

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// Función para obtener el conteo de categorías desde Supabase
const fetchCategoryCount = async () => {
  const { count, error } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching category count:', error);
    return 0;
  }
  return count || 0;
};

// Función para obtener los datos del dashboard
const fetchDashboardData = async () => {
  // 1. Total de productos
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact' });

  // 2. Total de categorías únicas
  const { data: categories } = await supabase
    .from('products')
    .select('category');
  const uniqueCategories = new Set(categories?.map((item) => item.category));
  const totalCategories = uniqueCategories.size;

  // 3. Productos con bajo stock (por ejemplo, stock menor a 10)
  const { count: lowStockProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .lt('stock', 10); // lt = less than (menor que)

  // 4. Valor total del inventario
  const { data: products } = await supabase.from('products').select('*');
  const totalInventoryValue = products?.reduce((total, product) => {
    return total + (product.price || 0) * (product.stock || 0);
  }, 0);

  return {
    totalProducts: totalProducts ?? 0,
    totalCategories,
    lowStockProducts: lowStockProducts ?? 0,
    totalInventoryValue: totalInventoryValue ?? 0,
  };
};

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalCategories: 0,
    lowStockProducts: 0,
    totalInventoryValue: 0,
  });
  const [categoryCount, setCategoryCount] = useState(0);

  // Cargar los datos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      const categoryCount = await fetchCategoryCount();
      const dashboardData = await fetchDashboardData();
      setCategoryCount(categoryCount);
      setDashboardData(dashboardData);
    };
    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Resumen del Inventario</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Tarjeta 1: Total de Productos */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">
              Total de Productos
            </h2>
          </div>
          <div className="text-2xl font-bold">
            {dashboardData.totalProducts}
          </div>
        </div>

        {/* Tarjeta 2: Categorías */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">
              Total de Categorías
            </h2>
          </div>
          <div className="text-2xl font-bold">{categoryCount}</div>
        </div>

        {/* Tarjeta 3: Productos de Bajo Stock */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">
              Productos de Bajo Stock
            </h2>
          </div>
          <div className="text-2xl font-bold">
            {dashboardData.lowStockProducts}
          </div>
        </div>

        {/* Tarjeta 4: Valor Total del Inventario */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">
              Valor Total del Inventario
            </h2>
          </div>
          <div className="text-2xl font-bold">
            ${dashboardData.totalInventoryValue?.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
