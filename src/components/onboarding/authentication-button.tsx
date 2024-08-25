'use client';

import { LogInIcon, UserPlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export const AuthenticationButton = () => {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <Button
        onClick={() => {
          router.push('/onboarding');
        }}
        className="w-full py-6 text-lg font-semibold bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-300"
      >
        <UserPlusIcon className="h-5 w-5 mr-2" />
        Sign Up
      </Button>
      <Button
        onClick={() => {}}
        variant="outline"
        className="w-full py-6 text-lg font-semibold text-gray-900 border-gray-900 hover:bg-gray-100 transition-colors duration-300"
      >
        <LogInIcon className="h-5 w-5 mr-2" />
        Log In
      </Button>
    </div>
  );
};
