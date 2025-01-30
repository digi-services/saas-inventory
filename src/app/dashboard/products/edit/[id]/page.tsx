// src/app/dashboard/products/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id; // Obtiene el ID del producto desde la URL

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");

  // Cargar los datos del producto al iniciar la página
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setName(data.name);
        setCategory(data.category);
        setPrice(data.price.toString());
        setStock(data.stock.toString());
      }
    };

    fetchProduct();
  }, [productId]);

  // Manejar la actualización del producto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Actualizar el producto en Supabase
    const { error } = await supabase
      .from("products") // Nombre de la tabla
      .update({
        name, // Nuevo nombre
        category, // Nueva categoría
        price: parseFloat(price), // Nuevo precio (convertido a número)
        stock: parseInt(stock), // Nuevo stock (convertido a número)
      })
      .eq("id", productId); // Filtra el producto por su ID
  
    if (error) {
      console.error("Error updating product:", error);
    } else {
      // Redirigir a la lista de productos después de actualizar
      router.push("/dashboard/products");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-semibold mb-4">Editar Producto</h1>
      <p className="text-sm text-gray-500 mb-6">Modifica los detalles del producto</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
        </div>
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Selecciona una categoría</option>
            <option value="electronics">Electrónicos</option>
            <option value="clothing">Ropa</option>
            <option value="food">Alimentos</option>
            <option value="other">Otros</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
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
        </div>
        <div className="space-y-2">
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
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
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}