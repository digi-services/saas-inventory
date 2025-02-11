import { supabase } from "../lib/supabase-client";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        {session ? (
          <nav className="p-4 bg-gray-800 text-white flex justify-between">
            <span>Bienvenido</span>
            <button onClick={async () => { await supabase.auth.signOut(); location.reload(); }} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </nav>
        ) : null}
        {children}
      </body>
    </html>
  );
}
