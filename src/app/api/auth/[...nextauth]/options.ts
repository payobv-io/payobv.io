import type { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  nextAuthSecret: string;
}

const githubConfig: OAuthConfig = {
  clientId: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
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
  secret: githubConfig.nextAuthSecret,
};