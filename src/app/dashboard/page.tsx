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
import { games, users } from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

// Main Dashboard Component
export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [gamesData, setGamesData] = useState<any>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const userDataDB = await db.query.users.findFirst({
        where: eq(users.email, user?.emailAddresses[0].emailAddress || ''),
      });
      setUserData(userDataDB);
      console.log(userDataDB)
    };
    const fetchGamesData = async () => {
      const gamesDataDB = await db.query.games.findMany({
        where: eq(games.userId, userData?.id || ''),
      });
      setGamesData(gamesDataDB);
    };
    if (user) {
      fetchUserData();
      fetchGamesData();
    }
  }, [user]);

  if (!user || !userData) {
    return <div className='flex justify-center items-center h-screen'>Loading...</div>;
  }

  return (
    <DashLayout>
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 bg-gray-900">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userData?.name.split(' ')[0]}!</h1>
                <p className="mt-1 text-lg text-gray-400">Ready to continue your learning adventure?</p>
              </div>

              {/* Grid for Dashboard Cards */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Current Skill/Game Card */}
                <div className="lg:col-span-2 bg-gray-800 shadow-xl rounded-xl p-6 hover:shadow-blue-500/30 transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-blue-400 flex items-center">
                      <PlayCircle className="h-6 w-6 mr-2" />
                      Currently Learning
                    </h2>
                    <Link href="/dashboard/skills/current" passHref>
                        <p className="text-sm text-blue-500 hover:underline flex items-center">
                            View Details <ChevronRight className="h-4 w-4 ml-1" />
                        </p>
                    </Link>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{userData.currentSkill}</h3>
                  <p className="text-gray-400 mb-3">Level {userData.currentLevel}</p>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-1">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${userData.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-sm text-gray-500">{userData.progress}% complete</p>
                  <button className="mt-6 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Resume Learning
                  </button>
                </div>

                {/* Progress Overview Card */}
                <div className="bg-gray-800 shadow-xl rounded-xl p-6 hover:shadow-purple-500/30 transition-shadow duration-300">
                  <h2 className="text-xl font-semibold text-purple-400 flex items-center mb-4">
                    <BarChart3 className="h-6 w-6 mr-2" />
                    Progress Snapshot
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-300">Skills Mastered:</p>
                      <p className="font-bold text-lg">3</p> {/* Placeholder */}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-300">Achievements Unlocked:</p>
                      <p className="font-bold text-lg">12</p> {/* Placeholder */}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-300">Total Hours Learned:</p>
                      <p className="font-bold text-lg">47</p> {/* Placeholder */}
                    </div>
                  </div>
                   <Link href="/dashboard/achievements" passHref>
                    <p className="mt-6 block text-center w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        View All Achievements
                    </p>
                  </Link>
                </div>
              </div>

              {/* Recommended Skills Section */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-5 flex items-center">
                  <Target className="h-7 w-7 mr-3 text-green-400" />
                  Explore New Skills
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Placeholder Skill Cards */}
                  {['JavaScript Fundamentals', 'Data Structures & Algorithms', 'AI Ethics & Society'].map((skill, idx) => (
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
    </DashLayout>
  );
}
