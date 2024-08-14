'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';

export const SignInWithGithub = () => {
  return (
    <Button
      onClick={() => {
        signIn('github', { callbackUrl: '/profile' });
      }}
    >
      Sign in with Github
    </Button>
  );
};
