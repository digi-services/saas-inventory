"use client";

import "../../globals.css";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Asegúrate de tener configurado Supabase

type Category = {
  id: number;
  name: string;
  product_count: number; // Cambiamos productCount a product_count para coincidir con Supabase
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Función para cargar las categorías desde Supabase
  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
      console.error("Error fetching categories:", error);
    } else {
      setCategories(data || []);
    }
  };

  // Cargar categorías al montar el componente
  useEffect(() => {
    fetchCategories();
  }, []);

  // Función para agregar una nueva categoría
  const handleAddCategory = async () => {
    if (newCategoryName.trim() !== "") {
      const { data, error } = await supabase
        .from("categories")
        .insert([{ name: newCategoryName.trim() }])
        .select();

      if (error) {
        console.error("Error adding category:", error);
      } else {
        setCategories([...categories, data[0]]); // Agregar la nueva categoría al estado
        setNewCategoryName(""); // Limpiar el input
      }
    }
  };

  // Función para eliminar una categoría
  const handleDeleteCategory = async (id: number) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      console.error("Error deleting category:", error);
    } else {
      setCategories(categories.filter((category) => category.id !== id)); // Eliminar la categoría del estado
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Título de la página */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Categorías</h1>
      </div>

      {/* Card para añadir una nueva categoría */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Añadir Nueva Categoría</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Añadir
          </button>
        </div>
      </div>

      {/* Tabla de categorías */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad de Productos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.product_count}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => console.log("Editar:", category.id)} // Aquí puedes agregar la lógica para editar
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}