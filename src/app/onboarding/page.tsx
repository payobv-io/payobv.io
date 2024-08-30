import { SignInWithGithub } from '@/components/onboarding/connect-github';
import { SelectRole } from '@/components/onboarding/select-role';
import { SelectWallet } from '@/components/onboarding/select-wallet';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';

import { findExistingUser, getServerSessionID } from '@/lib/actions';
import { RepositoryUserRole } from '@prisma/client';
import { redirect } from 'next/navigation';

export default async function Page({ searchParams }: any) {
  const validTypes = ['select-role', 'select-wallet'];
  const searchParamsValue = searchParams?.type;
  const sessionID = await getServerSessionID();
  if (sessionID) {
    const user = await findExistingUser(sessionID);

    if (user) {
      const hasWallets = user.wallets.length > 0;
      const hasRole = !!user.initialRepositoryRole;

      if (hasWallets && hasRole) {
        console.log(user.initialRepositoryRole);
        if (user.initialRepositoryRole == RepositoryUserRole.MAINTAINER) {
          return redirect('/maintainer/dashboard');
        } else {
          return redirect('/contributor/dashboard');
        }
      }
      if (validTypes.includes(searchParamsValue)) {
        if (searchParamsValue === 'select-role' && !hasWallets) {
          return redirect('/onboarding?type=select-wallet');
        }

        if (searchParamsValue === 'select-wallet' && hasWallets) {
          return redirect('/onboarding?type=select-role');
        }
      } else {
        if (!hasWallets) {
          return redirect('/onboarding?type=select-wallet');
        }

        if (!hasRole) {
          return redirect('/onboarding?type=select-role');
        }
      }

      if (!searchParamsValue) {
        return redirect(
          `/onboarding?type=${hasWallets ? 'select-role' : 'select-wallet'}`
        );
      }
    }
  } else if (searchParamsValue) {
    return redirect('/onboarding');
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <Card className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <Logo />
            <div className="flex justify-center space-x-4 mb-6">
              <div
                className={`w-8 h-8 rounded-full ${
                  searchParamsValue !== 'select-role' &&
                  searchParamsValue !== 'select-wallet'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                } flex items-center justify-center font-semibold`}
              >
                1
              </div>
              <div
                className={`w-8 h-8 rounded-full ${
                  searchParamsValue === 'select-wallet'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                } flex items-center justify-center font-semibold`}
              >
                2
              </div>
              <div
                className={`w-8 h-8 rounded-full ${
                  searchParamsValue === 'select-role'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                } flex items-center justify-center font-semibold`}
              >
                3
              </div>
            </div>
            {searchParamsValue === 'select-wallet' ? (
              <>
                <SelectWallet />
              </>
            ) : (
              <>
                {searchParamsValue === 'select-role' ? (
                  <>
                    <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
                      Choose Your Role
                    </h2>
                    <SelectRole />
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 text-center mb-8">
                      Connect your GitHub account to get started with bounties,
                      whether you're a project maintainer or a contributor.
                    </p>
                    <SignInWithGithub />
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
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
