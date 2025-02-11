"use client";

import "../../globals.css";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Datos de ejemplo para los reportes
const salesData = [
  { id: 1, product: "Laptop", quantity: 5, revenue: 5000 },
  { id: 2, product: "Smartphone", quantity: 10, revenue: 6000 },
  { id: 3, product: "Tablet", quantity: 8, revenue: 3200 },
  { id: 4, product: "Auriculares", quantity: 15, revenue: 1500 },
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("sales");

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalQuantity = salesData.reduce((sum, item) => sum + item.quantity, 0);

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Ventas", 10, 10);
    doc.autoTable({
      head: [["Producto", "Cantidad Vendida", "Ingresos"]],
      body: salesData.map((item) => [item.product, item.quantity, `$${item.revenue.toFixed(2)}`]),
    });
    doc.save("reporte_ventas.pdf");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Título de la página */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Reportes</h1>
      </div>

      {/* Selector de reportes */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Seleccionar Reporte</h2>
        <select
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="sales">Ventas</option>
          <option value="inventory">Inventario</option>
          <option value="categories">Categorías</option>
        </select>
      </div>

      {/* Reporte de ventas */}
      {selectedReport === "sales" && (
        <>
          {/* Resumen de ventas */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Resumen de Ventas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Productos Vendidos</p>
                <p className="text-2xl font-bold">{totalQuantity}</p>
              </div>
            </div>
          </div>

          {/* Tabla de ventas */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad Vendida
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ingresos
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {salesData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${item.revenue.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Reporte de inventario o categorías (en desarrollo) */}
      {selectedReport !== "sales" && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-center py-8 text-gray-600">
            El reporte de{" "}
            {selectedReport === "inventory" ? "inventario" : "categorías"} está en
            desarrollo.
          </p>
        </div>
      )}

      {/* Botón para descargar reporte */}
      <div className="flex justify-end">
        <button onClick={handleDownloadReport} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Descargar Reporte
        </button>
      </div>
    </div>
  );
}