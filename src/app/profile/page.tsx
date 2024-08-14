'use client';
import { signOut } from 'next-auth/react';

export default function Page() {
  return (
    <>
      <div>
        <button
          onClick={() => {
            signOut({ callbackUrl: '/' });
          }}
        >
          Log out
        </button>
      </div>
    </>
  );
}
