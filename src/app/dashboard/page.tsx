'use client'
import Link from 'next/link';
import { useState } from 'react';
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
// Sidebar Navigation Links
const sidebarNavLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: true },
  { name: 'My Skills', href: '/dashboard/skills', icon: BookOpen, current: false },
  { name: 'Achievements', href: '/dashboard/achievements', icon: Award, current: false },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, current: false },
];

// Main Dashboard Component
export default function DashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const userData = {
    name: user?.fullName || 'User',
    email: user?.emailAddresses[0].emailAddress || 'User Email',
    username: user?.username || 'User Username',
    avatarUrl: user?.imageUrl || '',
    currentSkill: 'Python Programming',
    currentLevel: 5,
    progress: 65, // Percentage
  };

  const UserAvatar = ({ name, avatarUrl }: { name: string, avatarUrl: string }) => {
    if (avatarUrl) {
      return <img className="h-8 w-8 rounded-full" src={avatarUrl} alt={name} />;
    }
    // Fallback to initials or a generic icon if no avatar URL
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return (
      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-600">
        <span className="text-xs font-medium leading-none text-white">{initials}</span>
      </span>
    );
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(user);


  return (
    <>
      <div className="font-inter bg-gray-900 text-white min-h-screen flex antialiased">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 border-r border-gray-700 transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:static md:flex md:flex-col`}>
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-700">
            <Link href="/" passHref>
              <p className="text-2xl font-bold flex items-center">
                <Sparkles className="h-7 w-7 mr-2 text-blue-500" />
                MENTOR <span className="text-blue-500">AI</span>
              </p>
            </Link>
            {/* Mobile close button */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-grow px-4 py-6 space-y-2">
            {sidebarNavLinks.map((item) => (
              <Link key={item.name} href={item.href} passHref>
                <p
                  className={`flex items-center px-3 py-3 rounded-lg transition-colors duration-200
                    ${item.current
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                  <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
                  {item.name}
                </p>
              </Link>
            ))}
          </nav>
          <div className="px-4 py-6 border-t border-gray-700">
            <SignOutButton redirectUrl="/signin">
            <button
              className="w-full flex items-center px-3 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" aria-hidden="true" />
              Logout
            </button>
            </SignOutButton>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-gray-800/80 backdrop-blur-md shadow-md md:shadow-none sticky top-0 z-30">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="md:hidden text-gray-300 hover:text-white p-2 -ml-2"
                  aria-label="Open sidebar"
                >
                  <Menu className="h-6 w-6" />
                </button>

                {/* Search (optional) - hidden on small screens initially */}
                <div className="hidden md:flex flex-1 max-w-xs">
                  <div className="relative w-full text-gray-400 focus-within:text-gray-200">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block w-full h-full pl-10 pr-3 py-2 border-transparent bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:placeholder-gray-300 sm:text-sm rounded-md"
                      placeholder="Search skills or games..."
                      type="search"
                      name="search"
                    />
                  </div>
                </div>
                <div className="md:hidden flex-1"></div> {/* Spacer for mobile */}


                {/* Profile & Notifications */}
                <div className="flex items-center space-x-4">
                  <button onClick={() => router.push('/dashboard/create-skill')} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    New Skill <Plus className="h-4 w-4 ml-2" />
                  </button>
                  <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="relative">
                    <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <UserAvatar name={user?.username || 'User'} avatarUrl={user?.imageUrl || ''} />
                      <span className="hidden ml-2 text-sm font-medium text-gray-300 lg:block">{user?.username || 'User Username'}</span>
                      <ChevronDown className="hidden ml-1 h-4 w-4 text-gray-400 lg:block" />
                    </button>
                    {/* Dropdown (implement if needed) */}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 bg-gray-900">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userData.name.split(' ')[0]}!</h1>
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
        </div>
      </div>
    </>
  );
}
