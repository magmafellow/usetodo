import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: function ({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnTodo = nextUrl.pathname.startsWith('/todo');
      if(isOnTodo){
        if(isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/todo', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;