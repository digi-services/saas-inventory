import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Aquí debes validar las credenciales con tu base de datos
        const user = { id: "1", email: "user@example.com", password: "password" };

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/", // Ruta de la página de inicio de sesión
  },
  secret: process.env.NEXTAUTH_SECRET, // Asegúrate de definir esta variable en .env
};

export default NextAuth(authOptions);