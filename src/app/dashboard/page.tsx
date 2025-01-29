import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/nextauth/route";
import { redirect } from "next/navigation";



export default async function DashboardPage() {
 /*  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  } */

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Resumen del Inventario</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Tarjeta 1: Total de Productos */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">Total de Productos</h2>
          </div>
          <div className="text-2xl font-bold">245</div>
        </div>

        {/* Tarjeta 2: Categorías */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">Categorías</h2>
          </div>
          <div className="text-2xl font-bold">12</div>
        </div>

        {/* Tarjeta 3: Productos de Bajo Stock */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">Productos de Bajo Stock</h2>
          </div>
          <div className="text-2xl font-bold">15</div>
        </div>

        {/* Tarjeta 4: Valor Total del Inventario */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">Valor Total del Inventario</h2>
          </div>
          <div className="text-2xl font-bold">$24,580</div>
        </div>
      </div>
    </div>
  );
}