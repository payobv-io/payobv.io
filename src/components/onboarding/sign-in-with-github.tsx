'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CodeIcon, Github, WrenchIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Component() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const searchParamsValue = searchParams.get('type');

  const options = [
    {
      id: 'maintainer',
      title: 'Project Maintainer',
      description: 'I manage repositories and set bounties',
      icon: WrenchIcon,
    },
    {
      id: 'contributor',
      title: 'Code Contributor',
      description: 'I solve issues and claim bounties',
      icon: CodeIcon,
    },
  ];

  const handleSignIn = () => {
    signIn('github');
  };

  const chooseRole = async (role: string) => {};

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
            <div
              className={`w-8 h-8 rounded-full ${
                searchParamsValue === 'select-role'
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-blue-500 text-white'
              } flex items-center justify-center font-semibold`}
            >
              1
            </div>
            <div
              className={`w-8 h-8 rounded-full ${
                searchParamsValue === 'select-role'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              } flex items-center justify-center font-semibold`}
            >
              2
            </div>
          </div>
          {searchParamsValue === 'select-role' ? (
            <>
              <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
                Choose Your Role
              </h2>
              <div className="space-y-4">
                {options.map((option) => (
                  <motion.div
                    key={option.id}
                    className="relative"
                    onHoverStart={() => setHoveredOption(option.id)}
                    onHoverEnd={() => setHoveredOption(null)}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 px-4"
                      onClick={() => chooseRole(option.id)}
                    >
                      <option.icon className="h-5 w-5 mr-3 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {option.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {option.description}
                        </p>
                      </div>
                    </Button>
                    <motion.div
                      className="absolute inset-0 bg-blue-50 rounded-lg z-[-1]"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredOption === option.id ? 0.5 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 text-center mb-8">
                Connect your GitHub account to get started with bounties,
                whether you're a project maintainer or a contributor.
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
