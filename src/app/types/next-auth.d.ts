// src/types/next-auth.d.ts
import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';

interface UserStats {
  posts: number;
  comments: number;
  likes: number;
  activityPoints: number;
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user: {
      id: string;
      role: string;
      favorites: any[];
      stats: UserStats;
    } & DefaultSession['user']
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role: string;
    favorites: any[];
    stats: UserStats;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    userId: string
  }
}