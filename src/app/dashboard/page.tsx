'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Bell,
  UserCircle,
  Search,
  PlayCircle,
  BarChart3,
  Target,
  Sparkles, // For MENTOR AI logo
  Menu, // For mobile menu toggle
  X, // For mobile menu toggle
  Plus,
  PlusSquare
} from 'lucide-react';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import DashLayout from '@/layout/DashLayout';
import { skills, users } from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { useUserStore } from '@/store/userStore';
import { useSkillsStore } from '@/store/skillsStore';

// Main Dashboard Component
export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();

   useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  const { user: userData, setUser, setLoading, setError, isLoading } = useUserStore();
  const { skills: skillsData, setSkills, setLoading: setSkillsLoading, setError: setSkillsError } = useSkillsStore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userDataDB = await db.query.users.findFirst({
          where: eq(users.email, user?.emailAddresses[0].emailAddress || ''),
        });
        console.log("userDataDB", userDataDB);
        
        if (userDataDB) {
          setUser({
            id: userDataDB.id,
            name: userDataDB.name,
            email: userDataDB.email,
            username: userDataDB.username,
            education: userDataDB.education,
            occupation: userDataDB.occupation,
            goals: userDataDB.goals,
            interests: userDataDB.interests,
            createdAt: userDataDB.createdAt.toISOString(),
            updatedAt: userDataDB.updatedAt.toISOString(),
            coins: userDataDB.coins || 0
          });
        }
      } catch (error) {
        setError('Failed to fetch user data');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have a user and no persisted data
    if (user && !userData || user?.emailAddresses[0].emailAddress !== userData?.email) {
      console.log("Fetching user data from DB");
      fetchUserData();
    }
  }, [user]); // Only depend on user

  // Separate effect for skills data
  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const skillsDataDB = await db.query.skills.findMany({
          where: eq(skills.userId as any, userData?.id as any),
        });
        // console.log("skillsDataDB", skillsDataDB);
        setSkills(skillsDataDB as any);
      } catch (error) {
        console.error('Error fetching skills data:', error);
      }
    };
    
    // if (userData?.id && !skillsData) {
      // console.log("Fetching skills data from DB");
      fetchSkillsData();
    // }
  }, [userData?.id]);

  if (!user) {
    return (
        <div className='flex justify-center items-center h-screen'>Loading...</div>
    );
  }

  // Show loading state only when we're actually fetching data
  if (isLoading && userData === null) {
    return (
        <div className='flex justify-center items-center h-screen'>Loading...</div>
    );
  }

  return (
      <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 bg-gray-900 scrollbar-hide">
        <div className="max-w-7xl mx-auto scrollbar-hide">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userData?.name?.split(' ')[0] || 'User'}!</h1>
            <p className="mt-1 text-lg text-gray-400">Ready to continue your learning adventure?</p>
          </div>

          {/* Recent Skills Section */}
          {skillsData && skillsData?.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* map only recent 2 skills */}
              {skillsData?.slice(0, 2)?.map((skill: any, index: number) => (
                <div key={index} className="bg-gray-800 shadow-xl rounded-xl p-6 hover:shadow-blue-500/30 transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-blue-400 flex items-center">
                      <PlayCircle className="h-6 w-6 mr-2" />
                      {skill.name.length > 25 ? skill.name.slice(0, 25) + '...' : skill.name}
                    </h2>
                    <Link href={`/skill/${skill.id}`} passHref>
                      <p className="text-sm text-blue-500 hover:underline flex items-center">
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </p>
                    </Link>
                  </div>
                  <p className="text-gray-400 mb-4">{skill.description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-300">Current Level:</p>
                      <p className="font-bold text-lg">{skill.roadMap?.filter((level: any) => level.isCompleted).length+1 || 0}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-300">Skills Mastered:</p>
                      <p className="font-bold text-lg">{skill.roadMap?.filter((level: any) => level.isCompleted).length+1 || 0}%</p>
                    </div>
                    {/* <div className="flex justify-between items-center">
                      <p className="text-gray-300">Total Hours:</p>
                      <p className="font-bold text-lg">{skill.roadMap?.filter((level: any) => level.isCompleted).length+1 || 0}</p>
                    </div> */}
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-1">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${skill.roadMap?.[0]?.progress?.skills_mastered || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-sm text-gray-500 mb-6">{skill.roadMap?.[0]?.progress?.skills_mastered || 0}% complete</p>
                  <button onClick={() => router.push(`/skill/${skill.id}`)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Resume Learning
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push('/dashboard/skills')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform">
              View All Skills
            </button>
            {/* <div className="bg-gray-800 shadow-xl rounded-xl p-6 hover:shadow-purple-500/30 transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-purple-400 flex items-center mb-4">
                <BarChart3 className="h-6 w-6 mr-2" />
                Progress Snapshot
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-gray-300">Skills Mastered:</p>
                  <p className="font-bold text-lg">3</p> 
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-300">Achievements Unlocked:</p>
                  <p className="font-bold text-lg">12</p> 
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-300">Total Hours Learned:</p>
                  <p className="font-bold text-lg">47</p> 
                </div>
              </div>
              <Link href="/dashboard/achievements" passHref>
                <p className="mt-6 block text-center w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  View All Achievements 
                </p>
              </Link>
            </div> */}
          </div>  
          ) : (
            <div className="flex justify-center items-center flex-col gap-4">
              {/* <p className="text-gray-400">No skills found</p> */}
              <button onClick={() => router.push('/dashboard/skills')} className=" bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform">Create New Skill </button>
            </div>
          )}

          {/* Recommended Skills Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-5 flex items-center">
              <Target className="h-7 w-7 mr-3 text-green-400" />
              Explore New Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder Skill Cards */}
              {['JavaScript Fundamentals', 'Build your Youtube Channel', 'AI Ethics & Society'].map((skill, idx) => (
                <div key={idx} className="bg-gray-800 p-6 rounded-xl shadow-lg hover:ring-2 hover:ring-green-500 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    {/* Generic Icon, could be dynamic based on skill category */}
                    <div className="p-2 bg-green-500/20 rounded-full mr-3">
                        <BookOpen className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-100">{skill}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">Master the essentials and build a strong foundation in {skill.toLowerCase()}.</p>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Start Learning
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
  );
}
