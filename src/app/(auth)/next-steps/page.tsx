'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, GraduationCap, Briefcase, Target, ArrowRight } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export default function NextStepsPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    education: '',
    occupation: '',
    goals: '',
    interests: [] as string[],
  });

  const interests = [
    'Programming',
    'Data Science',
    'Machine Learning',
    'Web Development',
    'Mobile Development',
    'Cloud Computing',
    'Cybersecurity',
    'UI/UX Design',
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async () => {
    if (!isLoaded || !user) return;
    
    setIsLoading(true);
    try {
      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) {
        throw new Error('No email address found');
      }

      // First check if user exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

        console.log(existingUser)

      if (existingUser.length === 0) {
        // Create new user if doesn't exist
        await db.insert(users).values({
          email,
          education: formData.education,
          occupation: formData.occupation,
          goals: formData.goals,
          interests: formData.interests,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log('User data saved successfully');
      } else {
        // Update existing user
        const result = await db
          .update(users)
          .set({
            education: formData.education,
            occupation: formData.occupation,
            goals: formData.goals,
            interests: formData.interests,
            updatedAt: new Date(),
          })
          .where(eq(users.email, email))
          .returning();

        if (result.length === 0) {
          throw new Error('Failed to update user data');
        }
      }

      console.log('User data saved successfully');

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving user data:', error);
      // You might want to show an error message to the user here
      alert('Failed to save your information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-200">Tell us about your education</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GraduationCap className="h-5 w-5 text-gray-500" />
              </div>
              <select
                value={formData.education}
                onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your education level</option>
                <option value="high_school">High School</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-200">What's your occupation?</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-500" />
              </div>
              <select
                value={formData.occupation}
                onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
                className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your occupation</option>
                <option value="student">Student</option>
                <option value="employed">Employed</option>
                <option value="self_employed">Self-employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-200">What are your learning goals?</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Target className="h-5 w-5 text-gray-500" />
              </div>
              <textarea
                value={formData.goals}
                onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                placeholder="Tell us what you want to achieve..."
                className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-200">Select your interests</h2>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    formData.interests.includes(interest)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isLoaded) {
    return (
      <div className="font-inter bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="font-inter bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md">
        {/* Logo and Progress */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center text-4xl font-bold mb-2">
            <Sparkles className="h-10 w-10 mr-2 text-blue-500" />
            MENTOR <span className="text-blue-500">AI</span>
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === step ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-gray-800 shadow-2xl rounded-xl p-8 sm:p-10">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                onClick={() => setStep(prev => prev - 1)}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (step < 4) {
                  setStep(prev => prev + 1);
                } else {
                  handleSubmit();
                }
              }}
              disabled={isLoading}
              className="ml-auto flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  {step < 4 ? 'Next' : 'Complete'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 