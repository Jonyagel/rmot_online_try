// src/lib/auth.ts
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { NextAuthOptions } from 'next-auth';
import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import { connectDb } from '../app/db/connectDb';
import { UserModel } from '../app/models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

interface ExtendedUser extends User {
  role?: string;
  stats?: {
    posts: number;
    comments: number;
    likes: number;
    activityPoints: number;
  };
}

interface ExtendedSession extends Session {
  user?: ExtendedUser;
}

// Create JWT token for password reset
export function createResetToken(userId: string): string {
  return jwt.sign(
    { userId, purpose: 'password-reset' },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

// Verify reset token
export function verifyResetToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      purpose: string;
    };
    
    if (decoded.purpose !== 'password-reset') {
      throw new Error('Invalid token purpose');
    }
    
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid or expired reset token');
  }
}

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

// Send password reset email
export async function sendResetEmail(email: string, token: string) {
  const resetLink = `${APP_URL}/auth/reset-password?token=${token}`;
  
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'איפוס סיסמה - רמות אונליין',
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #00a35b;">איפוס סיסמה</h2>
        <p>שלום,</p>
        <p>קיבלנו בקשה לאיפוס הסיסמה שלך.</p>
        <p>לחץ על הכפתור הבא כדי לאפס את הסיסמה:</p>
        <a 
          href="${resetLink}" 
          style="
            display: inline-block;
            padding: 10px 20px;
            background-color: #00a35b;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 15px 0;
          "
        >
          איפוס סיסמה
        </a>
        <p>או העתק את הקישור הבא:</p>
        <p style="color: #666;">${resetLink}</p>
        <p>הקישור תקף לשעה אחת בלבד.</p>
        <p>אם לא ביקשת לאפס את הסיסמה, אנא התעלם ממייל זה.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          הודעה זו נשלחה באופן אוטומטי, נא לא להשיב למייל זה.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send reset email:', error);
    throw new Error('שגיאה בשליחת המייל');
  }
}

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
    signIn: '/auth/login',
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

    async session({ session, token }): Promise<ExtendedSession> {
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
