'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail } from 'lucide-react';
import { useSignUp } from '@clerk/nextjs';

export default function VerifyEmailPage() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/next-steps');
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during verification');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="font-inter bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="font-inter bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center text-4xl font-bold mb-2">
            <Sparkles className="h-10 w-10 mr-2 text-blue-500" />
            MENTOR <span className="text-blue-500">AI</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-300">Verify Your Email</h1>
          <p className="text-gray-400">We sent you a verification code.</p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-2xl rounded-xl p-8 sm:p-10 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="relative">
            <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-1">
              Verification Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="code"
                name="code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                placeholder="Enter verification code"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 