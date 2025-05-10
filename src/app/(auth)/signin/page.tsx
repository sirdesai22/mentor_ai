'use client';
import { LogIn, Mail, Lock, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link'; // Import Link for client-side navigation

// Main Login Page Component
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For loading state on submit

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    console.log('Login attempt with:', { email, password });
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    // Replace with actual login logic (e.g., API call)
    // Example:
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   if (response.ok) {
    //     // Handle successful login (e.g., redirect to dashboard)
    //     console.log('Login successful');
    //     // router.push('/dashboard');
    //   } else {
    //     // Handle login error
    //     const errorData = await response.json();
    //     console.error('Login failed:', errorData.message);
    //     // Display error to user
    //   }
    // } catch (error) {
    //   console.error('An error occurred:', error);
    //   // Display generic error
    // }
    setIsLoading(false);
    // For now, just log and reset
    alert('Login functionality is for demonstration. Check console for data.');
  };

  return (
    <>
      <div className="font-inter bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 antialiased overflow-x-hidden">
        <div className="w-full max-w-md">
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="bg-gray-800 shadow-2xl rounded-xl p-8 sm:p-10 space-y-6">
            {/* Email Input */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password"className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <Link href="/forgot-password" passHref>
                  <p className="text-sm text-blue-500 hover:text-blue-400 hover:underline">
                    Forgot password?
                  </p>
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            {/* Submit Button */}
            <div>
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
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In <LogIn className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/signup" passHref> {/* Assuming you'll have a /signup page */}
              <p className="font-medium text-blue-500 hover:text-blue-400 hover:underline">
                Sign Up Now
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
