'use client';
import { SignIn } from "@clerk/nextjs";
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="font-inter bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 antialiased overflow-x-hidden">
      <div className="w-full max-w-md flex flex-col items-center justify-center">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link href="/" passHref>
            <p className="inline-flex items-center text-4xl font-bold mb-2">
              <Sparkles className="h-10 w-10 mr-2 text-blue-500" />
              MENTOR <span className="text-blue-500">AI</span>
            </p>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-300">Welcome Back!</h1>
          <p className="text-gray-400">Sign in to continue your learning adventure.</p>
        </div>

        {/* Clerk SignIn Component */}
        {/* <div className="bg-gray-800 shadow-2xl rounded-xl p-8 sm:p-10"> */}
          <SignIn
            routing="path"
            path="/signin"
            signUpUrl="/signup"
            redirectUrl="/dashboard"
          />
        {/* </div> */}

        {/* Sign Up Link */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/signup" passHref>
            <p className="font-medium text-blue-500 hover:text-blue-400 hover:underline">
              Sign Up Now
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}