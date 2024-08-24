import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';

export const getOctokit = () => {
  return new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: process.env.NEXT_PUBLIC_APP_ID,
      privateKey: process.env.NEXT_PUBLIC_OCTOKIT_PRIVATE_KEY,
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    },
  });
};

export const getInstallationIDOctokit = async (installationId: number) => {
  const octokit = getOctokit();
  const {
    data: { token },
  } = await octokit.apps.createInstallationAccessToken({
    installation_id: installationId,
  });

  return new Octokit({ auth: token });
};
