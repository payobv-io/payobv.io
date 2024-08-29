'use client';

import { addRole } from '@/lib/actions';
import { motion } from 'framer-motion';
import { CodeIcon, WrenchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';

export const SelectRole = () => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const router = useRouter();

  const chooseRole = async (role: string) => {
    await addRole({
      role,
    });
    if (role === 'maintainer') {
      const installationUrl = `https://github.com/apps/payobvio-github-app/installations/new`;
      window.location.href = installationUrl;
    } else {
      router.push('/contributor/dashboard');
    }
  };
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
  return (
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
              <p className="font-medium text-gray-900">{option.title}</p>
              <p className="text-sm text-gray-500">{option.description}</p>
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
  );
};
