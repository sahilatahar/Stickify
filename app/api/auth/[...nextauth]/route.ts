import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import connectDB from '@/config/db';
import User from '@/models/User';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Ensure email and password exist
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Connect to the database
        await connectDB();

        // Find user by email
        const user = await User.findOne({ email: credentials?.email });

        if (!user) {
          throw new Error('No user found with this email');
        }

        // Compare password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        // Return user object on successful authentication
        return {
          id: user._id,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
