'use client'
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpen, // For My Skills & skill cards
  Award,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Search,
  Sparkles, // For MENTOR AI logo
  Menu, // For mobile menu toggle
  X, // For mobile menu toggle
  Lightbulb, // For New Skill
  ChevronRight,
  TrendingUp, // For progress
  ListChecks, // For tasks
  Target, // For levels
  Plus
} from 'lucide-react';
import DashLayout from '@/layout/DashLayout';
import { useUserStore } from '@/store/userStore';
import { skills } from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

interface Skill {
  id: string;
  name: string;
  description: string | null;
  userId: string | null;
  userStyle: string | null;
  roadMap: {
    level: number;
    title: string;
    subTopic: string;
    isCompleted: boolean;
    tasks: {
      type: string;
      content: string;
      isCompleted: boolean;
      points: number;
    }[];
    progress: {
      skills_mastered: number;
      total_hours: number;
      total_skills: number;
      current_skill: number;
    };
  }[] | null;
  createdAt: Date | null;
}

// Skill Card Component
const SkillCard = ({ skill }: { skill: Skill }) => {
  // Calculate overall progress for the skill
  const totalLevels = skill.roadMap?.length || 0;
  const completedLevels = skill.roadMap?.filter((level) => level.isCompleted).length || 0;
  const overallProgress = totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0;
  const currentLevel = skill.roadMap?.find((level) => !level.isCompleted);
  const router = useRouter();
  return (
    <div className="bg-gray-800 shadow-xl rounded-xl p-6 hover:shadow-blue-500/30 transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-3">
          <div className="p-2 bg-blue-500/20 rounded-full mr-3">
            <BookOpen className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-100">{skill.name}</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">{skill.description || 'No description available'}</p>
        
        <div className="mb-4 space-y-2 text-sm">
          <div className="flex items-center text-gray-300">
            <Target className="h-4 w-4 mr-2 text-blue-400" />
            <span>{totalLevels} Levels Planned</span>
          </div>
          {currentLevel && (
            <div className="flex items-center text-gray-300">
                <ListChecks className="h-4 w-4 mr-2 text-green-400" />
                <span>Current Focus: Level {currentLevel.level} - {currentLevel.title}</span>
            </div>
          )}
           <div className="flex items-center text-gray-300">
            <TrendingUp className="h-4 w-4 mr-2 text-yellow-400" />
            <span>Overall Progress: {overallProgress}%</span>
          </div>
        </div>

        {totalLevels > 0 && (
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        )}
      </div>

      <button
        onClick={() => router.push(`/skill/${skill.id}`)}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        {overallProgress === 100 ? 'Review Skill' : 'Continue Learning'}
        <ChevronRight className="ml-2 h-5 w-5" />
      </button>
    </div>
  );
};

export default function MySkillsPage() {
  const [skillsData, setSkillsData] = useState<Skill[]>([]);
  const { user, setLoading, setError } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        setLoading(true);
        const skillsDataDB = await db.query.skills.findMany({
          where: eq(skills.userId, user?.id || ''),
        });
        
        // Parse the roadMap JSON strings
        const parsedSkills = skillsDataDB.map(skill => ({
          ...skill,
          roadMap: skill.roadMap ? JSON.parse(skill.roadMap as unknown as string) : null
        }));
        
        setSkillsData(parsedSkills);
      } catch (error) {
        setError('Failed to fetch skills data');
        console.error('Error fetching skills data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchSkillsData();
    }
  }, [user?.id]);

  return (
    <DashLayout>
      {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 bg-gray-900">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Learning Skills</h1>
                    <p className="mt-1 text-lg text-gray-400">Track your progress and continue your learning journey.</p>
                </div>
                <button onClick={() => router.push('/dashboard/create-game')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
                        New Skill <Plus className="h-6 w-6" aria-hidden="true" />
                    </button>
              </div>

              {skillsData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skillsData.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-800 rounded-xl shadow-lg">
                  <BookOpen className="mx-auto h-16 w-16 text-gray-500" />
                  <h3 className="mt-4 text-xl font-semibold text-gray-300">No Skills Added Yet</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Start your learning journey by adding a new skill.
                  </p>
                  <Link href="/dashboard/new-skill" passHref>
                    <p className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500">
                      Add Your First Skill
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </main>
    </DashLayout>
  );
}
