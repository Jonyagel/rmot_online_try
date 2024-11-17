// src/app/api/auth/[...nextauth]/option.ts
import NextAuth, { Session } from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectDb } from '../../../db/connectDb';
import { UserModel } from '../../../models/userModel';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  secret: process.env.NEXTAUTH_SECRET,
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await connectDb();
          
          const existingUser = await UserModel.findOne({ email: user.email });
          
          if (!existingUser) {
            // יצירת משתמש חדש
            const newUser = await UserModel.create({
              email: user.email,
              name: user.name,
              image: user.image,
              provider: account.provider,
              role: 'user',
              favorites: [],
              stats: {
                posts: 0,
                comments: 0,
                likes: 0,
                activityPoints: 0
              },
              lastLogin: new Date(),
            });
            return true;
          }
          
          // עדכון פרטי התחברות אחרונה
          await UserModel.findByIdAndUpdate(existingUser._id, {
            lastLogin: new Date(),
            image: user.image, // עדכון תמונת פרופיל במקרה של שינוי
          });
          
          return true;
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },

    async session({ session, token }): Promise<Session> {
      try {
        await connectDb();
        const user = await UserModel.findOne({ email: session?.user?.email });
        
        if (user && session.user) {
          session.user = {
            ...session.user,
            id: user._id.toString(),
            role: user.role as string,
            favorites: user.favorites,
            stats: {
              posts: user.stats.posts,
              comments: user.stats.comments,
              likes: user.stats.likes,
              activityPoints: user.stats.activityPoints,
            },
          };
        }
        
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
  },
  
  events: {
    async signOut(message) {
      try {
        await connectDb();
        if (message?.token?.email) {
          await UserModel.findOneAndUpdate(
            { email: message.token.email },
            { lastLogout: new Date() }
          );
        }
      } catch (error) {
        console.error('Error in signOut event:', error);
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
