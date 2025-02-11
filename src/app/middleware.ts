import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  await supabase.auth.getSession(); // Asegura que la sesión se cargue correctamente

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*"], // Aplica el middleware a rutas protegidas
};
