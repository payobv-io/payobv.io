'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRightIcon, Github } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Component() {
  const [isHovered, setIsHovered] = useState(false);

  const handleSignIn = () => {
    signIn('github');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center mb-8">
            <Github className="h-16 w-16 text-gray-900 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Welcome to GitHub Bounty
            </h1>
          </div>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
              1
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-semibold">
              2
            </div>
          </div>
          <p className="text-gray-600 text-center mb-8">
            Connect your GitHub account to get started with bounties, whether
            you're a project maintainer or a contributor.
          </p>
          <motion.div
            className="relative mb-8"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Button
              onClick={handleSignIn}
              className="w-full py-6 text-lg font-semibold"
            >
              <Github className="h-5 w-5 mr-2" />
              Sign in with GitHub
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Button>
            <motion.div
              className="absolute inset-0 bg-blue-100 rounded-lg z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.5 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
          <p className="text-xs text-gray-500 text-center">
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
