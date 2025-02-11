import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,  // ✅ Mantiene la sesión en el almacenamiento local
    autoRefreshToken: true, // ✅ Renueva automáticamente los tokens
    detectSessionInUrl: true,
  },
});
