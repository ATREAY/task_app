"use client";
import { SignIn } from '@clerk/nextjs';
import React, { useState } from 'react';

const Page = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {showSignIn ? (
        <SignIn />
      ) : (
        <main className="flex min-h-screen flex-col items-center justify-center p-20">
          <div className="grid text-center">
            <div
              className="mb-20 group rounded-lg px-5 py-4 transition-colors border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
            >
              <h4 className={`mb-3 text-2xl font-semibold`}>
                Welcome to Taskify👋!
              </h4>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Embark on thrilling tasks, enjoy, and glean insights.
              </p>
              <button
                onClick={handleSignInClick}
                className="mt-5 text-gray-900 bg-gray-100 hover:bg-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
              >
                Get Started 🫨
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Page;
