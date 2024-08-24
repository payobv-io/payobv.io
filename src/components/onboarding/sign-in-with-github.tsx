'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { signInStore } from '@/stores/sign-in-store';
import { motion } from 'framer-motion';
import { CodeIcon, WrenchIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function SignInWithGithub() {
  const { hoveredOption, setUserRole, setHoveredOption } = signInStore();

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

  const handleSignIn = async (role: string) => {
    setUserRole(role);
    signIn('github');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">GitHub Bounty</h1>
          </div>
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
                  onClick={() => handleSignIn(option.id)}
                >
                  <option.icon className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{option.title}</p>
                    <p className="text-sm text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </Button>
                <motion.div
                  className="absolute inset-0 bg-blue-50 rounded-lg z-[-1]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredOption === option.id ? 0.5 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
