'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, Github } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '../ui/button';

export const SignInWithGithub = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="relative mb-8"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        onClick={() => signIn('github')}
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
  );
};
