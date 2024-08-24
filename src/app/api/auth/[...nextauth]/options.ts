import db from '@/db/db';
import type { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

interface GithubUser {
  id: number;
  login: string;
  email: string;
}

interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  nextAuthSecret: string;
}

const githubConfig: OAuthConfig = {
  clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '',
  clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET || '',
  nextAuthSecret: process.env.NEXTAUTH_SECRET || '',
};

const addUserData = async (profile: GithubUser) => {
  const userProfile = profile as GithubUser;
  const existingUser = await db.user.findUnique({
    where: { id: userProfile.id },
  });

  if (!existingUser) {
    try {
      await db.user.create({
        data: {
          id: userProfile.id,
          githubId: userProfile.login,
          email: userProfile.email,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export const options: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: githubConfig.clientId,
      clientSecret: githubConfig.clientSecret,
      authorization: {
        // params: {
        //   prompt: 'consent',
        //   access_type: 'offline',
        //   response_type: 'code',
        // },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        addUserData(profile as GithubUser);
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}?type=select-wallet`;
      }
      return baseUrl;
    },
  },
  secret: githubConfig.nextAuthSecret,
};
