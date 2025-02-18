'use client';

import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log('Sesión actual:', data.session);
      if (!data.session) {
        router.push('/login'); // Redirigir si no hay sesión
      } else {
        setSession(data.session);
      }
    };

    checkSession();
  }, []);

  if (!session) {
    return <p>Cargando...</p>; // Evita redirecciones prematuras
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Inventario App</h1>
        </div>
        <nav className="mt-6">
          <a
            href="/dashboard"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
          >
            Dashboard
          </a>
          <a
            href="/dashboard/products"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
          >
            Productos
          </a>
          <a
            href="/dashboard/categories"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
          >
            Categorías
          </a>
          <a
            href="/dashboard/reports"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
          >
            Reportes
          </a>
        </nav>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800">Dashboard</h2>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/login');
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
