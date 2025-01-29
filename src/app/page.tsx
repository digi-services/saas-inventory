import Link from "next/link"
import "./globals.css";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[350px] rounded-lg shadow-lg bg-white">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">Iniciar Sesión</h2>
          <p className="text-sm text-gray-500 mb-4">Ingresa tus credenciales para acceder al sistema</p>
        </div>
        <div className="p-6">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <input 
                  id="email" 
                  type="email" 
                  placeholder="Email" 
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <input 
                  id="password" 
                  type="password" 
                  placeholder="Contraseña" 
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="p-6 flex justify-between">
          <button 
            type="button" 
            className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50"
          >
            Registrarse
          </button>
          <button 
            type="button" 
            className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  )
}