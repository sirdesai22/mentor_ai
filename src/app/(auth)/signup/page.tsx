'use client';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';

export default function SignupPage() {
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
          <h1 className="text-2xl font-semibold text-gray-300">Create Your Account</h1>
          <p className="text-gray-400">Start your learning journey today.</p>
        </div>

        {/* Clerk SignUp Component */}
        <SignUp 
          path="/signup" 
          routing="path" 
          signInUrl="/login"
          fallbackRedirectUrl="/next-steps" // Optional: redirect after successful sign-up
        />

        {/* Login Link */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" passHref>
            <p className="font-medium text-blue-500 hover:text-blue-400 hover:underline">
              Sign In
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}