import { SignInWithGithub } from '@/components/onboarding/sign-in-with-github';

export default function Page() {
  return (
    <>
      <div className="hero-content text-center hero py-[64px]">
        <SignInWithGithub />
      </div>
    </>
  );
}
