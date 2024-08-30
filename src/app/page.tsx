import { AuthenticationButton } from '@/components/onboarding/authentication-button';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { checkRootPageAccess } from '@/lib/actions';
import { CodeIcon, DollarSignIcon } from 'lucide-react';

export default async function Page() {
  // Check if the user is already authenticated and complete the onboarding process
  await checkRootPageAccess();

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <Logo />
              <AuthenticationButton />
              <p className="text-xs text-gray-500 text-center mt-8">
                By continuing, you agree to our{' '}
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
        <div className="hidden lg:flex flex-1 bg-gray-900 text-white p-12 flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">Empower Open Source</h2>
          <p className="text-xl mb-8">
            Connect, contribute, and earn with Payobv.io
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <CodeIcon className="h-8 w-8 mr-4" />
              <span className="text-lg">Solve exciting coding challenges</span>
            </div>
            <div className="flex items-center">
              <DollarSignIcon className="h-8 w-8 mr-4" />
              <span className="text-lg">
                Earn rewards for your contributions
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
