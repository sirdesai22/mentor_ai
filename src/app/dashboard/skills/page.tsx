'use client'
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
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
  Target // For levels
} from 'lucide-react';
import DashLayout from '@/layout/DashLayout';
// Placeholder User Data
const userData = {
  name: 'Alex Johnson',
  avatarUrl: '',
};

// Sidebar Navigation Links
const sidebarNavLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: false },
  { name: 'My Skills', href: '/dashboard/skills', icon: BookOpen, current: true }, // Current page
  { name: 'New Skill', href: '/dashboard/new-skill', icon: Lightbulb, current: false },
  { name: 'Achievements', href: '/dashboard/achievements', icon: Award, current: false },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, current: false },
];

// Dummy Skills Data based on the provided schema
const dummyUserSkills = [
  {
    id: 'skill_uuid_1',
    userId: 'user_uuid_alex',
    name: 'Python Programming for Beginners',
    description: 'Master the fundamentals of Python, from syntax to basic data structures and control flow.',
    userStyle: 'Visual Learner, Prefers Practical Examples', // Example userStyle
    roadMap: [
      {
        level: 1,
        title: 'Python Basics: Variables & Data Types',
        subTopic: 'Understanding core data types like integers, strings, and booleans.',
        isCompleted: true,
        tasks: [
          { type: 'Quiz', content: 'Identify data types', isCompleted: true, points: 90 },
          { type: 'CodingChallenge', content: 'Declare and print variables', isCompleted: true, points: 95 },
        ],
        progress: { skills_mastered: 2, total_hours: 2, total_skills: 2, current_skill: 2 }
      },
      {
        level: 2,
        title: 'Control Flow: Loops & Conditionals',
        subTopic: 'Learn to control program execution with if/else statements and for/while loops.',
        isCompleted: false,
        tasks: [
          { type: 'Game', content: 'Logic Gate Simulator', isCompleted: true, points: 80 },
          { type: 'CodingChallenge', content: 'Write a simple calculator', isCompleted: false, points: 0 },
          { type: 'Quiz', content: 'Conditional statements', isCompleted: false, points: 0 },
        ],
        progress: { skills_mastered: 1, total_hours: 1, total_skills: 3, current_skill: 1 }
      },
      {
        level: 3,
        title: 'Functions & Modules',
        subTopic: 'Organize code into reusable blocks and import external libraries.',
        isCompleted: false,
        tasks: [],
        progress: { skills_mastered: 0, total_hours: 0, total_skills: 4, current_skill: 0 }
      }
    ],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    id: 'skill_uuid_2',
    userId: 'user_uuid_alex',
    name: 'Introduction to SQL Databases',
    description: 'Learn how to query and manage relational databases using SQL.',
    userStyle: 'Hands-on Learner',
    roadMap: [
      {
        level: 1,
        title: 'Basic SELECT Queries',
        subTopic: 'Retrieving data from tables.',
        isCompleted: true,
        tasks: [{ type: 'Quiz', content: 'SELECT syntax', isCompleted: true, points: 100 }],
        progress: { skills_mastered: 1, total_hours: 1, total_skills: 1, current_skill: 1 }
      },
      {
        level: 2,
        title: 'Filtering with WHERE',
        subTopic: 'Applying conditions to queries.',
        isCompleted: false,
        tasks: [{ type: 'CodingChallenge', content: 'Filter product list', isCompleted: false, points: 0 }],
        progress: { skills_mastered: 0, total_hours: 0, total_skills: 1, current_skill: 0 }
      }
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: 'skill_uuid_3',
    userId: 'user_uuid_alex',
    name: 'Web Development with React',
    description: 'Build interactive user interfaces for web applications using the React library.',
    userStyle: 'Project-based Learner',
    roadMap: [], // No progress yet
    createdAt: new Date().toISOString(), // Today
  }
];

// UserAvatar Component
const UserAvatar = ({ name, avatarUrl }) => {
  if (avatarUrl) {
    return <img className="h-8 w-8 rounded-full" src={avatarUrl} alt={name} />;
  }
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  return (
    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-600">
      <span className="text-xs font-medium leading-none text-white">{initials}</span>
    </span>
  );
};

// Skill Card Component
const SkillCard = ({ skill }) => {
  // Calculate overall progress for the skill
  const totalLevels = skill.roadMap.length;
  const completedLevels = skill.roadMap.filter(level => level.isCompleted).length;
  const overallProgress = totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0;
  const currentLevel = skill.roadMap.find(level => !level.isCompleted);

  return (
    <div className="bg-gray-800 shadow-xl rounded-xl p-6 hover:shadow-blue-500/30 transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-3">
          <div className="p-2 bg-blue-500/20 rounded-full mr-3">
            <BookOpen className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-100">{skill.name}</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">{skill.description}</p>
        
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
        onClick={() => alert(`Continue learning: ${skill.name}`)} // Placeholder action
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        {overallProgress === 100 ? 'Review Skill' : 'Continue Learning'}
        <ChevronRight className="ml-2 h-5 w-5" />
      </button>
    </div>
  );
};


export default function MySkillsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    console.log('User logged out');
    alert('Logout functionality placeholder.');
  };

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
                <Link href="/dashboard/new-skill" passHref>
                    <p className="mt-4 sm:mt-0 inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition-colors">
                        <Lightbulb className="mr-2 h-5 w-5" />
                        Add New Skill
                    </p>
                </Link>
              </div>

              {dummyUserSkills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dummyUserSkills.map((skill) => (
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
