import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/nextauth/route";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  // Verificar la sesión del usuario (opcional, si usas autenticación)
  /* const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  } */

  // Obtener datos dinámicos de Supabase
  const fetchDashboardData = async () => {
    // 1. Total de productos
    const { count: totalProducts } = await supabase
      .from("products")
      .select("*", { count: "exact" });

    // 2. Total de categorías únicas
    const { data: categories } = await supabase
      .from("products")
      .select("category");
    const uniqueCategories = new Set(categories?.map((item) => item.category));
    const totalCategories = uniqueCategories.size;

    // 3. Productos con bajo stock (por ejemplo, stock menor a 10)
    const { count: lowStockProducts } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .lt("stock", 10); // lt = less than (menor que)

    // 4. Valor total del inventario
    const { data: products } = await supabase.from("products").select("*");
    const totalInventoryValue = products?.reduce((total, product) => {
      return total + product.price * product.stock;
    }, 0);

    return {
      totalProducts,
      totalCategories,
      lowStockProducts,
      totalInventoryValue,
    };
  };

  // Obtener los datos
  const { totalProducts, totalCategories, lowStockProducts, totalInventoryValue } =
    await fetchDashboardData();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Resumen del Inventario</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Tarjeta 1: Total de Productos */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">Total de Productos</h2>
          </div>
          <div className="text-2xl font-bold">{totalProducts}</div>
        </div>

        {/* Tarjeta 2: Categorías */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">Categorías</h2>
          </div>
          <div className="text-2xl font-bold">{totalCategories}</div>
        </div>

        {/* Tarjeta 3: Productos de Bajo Stock */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">Productos de Bajo Stock</h2>
          </div>
          <div className="text-2xl font-bold">{lowStockProducts}</div>
        </div>

        {/* Tarjeta 4: Valor Total del Inventario */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">Valor Total del Inventario</h2>
          </div>
          <div className="text-2xl font-bold">
            ${totalInventoryValue?.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}