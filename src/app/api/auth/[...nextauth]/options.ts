import type { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

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

export const options: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: githubConfig.clientId,
      clientSecret: githubConfig.clientSecret,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/api/install-github-app`;
      }
      return baseUrl;
    },
  },
  secret: githubConfig.nextAuthSecret,
};
