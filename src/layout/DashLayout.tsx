'use client'
import { useUserStore } from '@/store/userStore'
import { SignOutButton, useUser } from '@clerk/nextjs'
import { Award, Bell, BookOpen, ChevronDown, Diamond, LayoutDashboard, LogOut, Menu, Plus, Search, Settings, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import React, { useState } from 'react'

type Props = {
    children: React.ReactNode
}

// Sidebar Navigation Links
const sidebarNavLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Skills', href: '/dashboard/skills', icon: BookOpen },
    // { name: 'Achievements', href: '/dashboard/achievements', icon: Award },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

// UserAvatar Component (reused from dashboard)
const UserAvatar = ({ name, avatarUrl }: { name: string, avatarUrl: string }) => {
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

const DashLayout = ({ children }: Props) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();

  console.log("user", user);

  const userData = {
    name: user?.name || 'User',
    email: user?.email || 'User Email',
    username: user?.username || 'User Username',
    avatarUrl: '',
    coins: user?.coins || 0,
    currentSkill: 'Python Programming',
    currentLevel: 5,
    progress: 65, // Percentage
  };

  return (
    <div className="font-inter bg-gray-900 text-white min-h-screen flex antialiased h-screen">
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
            {sidebarNavLinks.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link key={item.name} href={item.href} passHref>
                  <p
                    className={`flex items-center px-3 py-3 rounded-lg transition-colors duration-200
                      ${isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
                    {item.name}
                  </p>
                </Link>
              );
            })}
          </nav>
          <div className="px-4 py-6 border-t border-gray-700">
            <SignOutButton redirectUrl="/login">
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
          {/* Top Bar (Reused from dashboard structure) */}
          <header className="bg-gray-800/80 backdrop-blur-md shadow-md md:shadow-none sticky top-0 z-30">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                <button onClick={() => setMobileSidebarOpen(true)} className="md:hidden text-gray-300 hover:text-white p-2 -ml-2" aria-label="Open sidebar">
                  <Menu className="h-6 w-6" />
                </button>
                <div className="hidden md:flex flex-1 max-w-xs"> {/* Search can be kept or removed */}
                  <div className="relative w-full text-gray-400 focus-within:text-gray-200">
                    {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5" aria-hidden="true" />
                    </div> */}
                    {/* <input
                      id="search-field"
                      className="block w-full h-full pl-10 pr-3 py-2 border-transparent bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:placeholder-gray-300 sm:text-sm rounded-md"
                      placeholder="Search..."
                      type="search"
                      name="search"
                    /> */}
                  </div>
                </div>
                <div className="md:hidden flex-1"></div> {/* Spacer for mobile */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 font-semibold text-xl text-yellow-500">
                    {userData?.coins}
                    <img src="/gold-coin.svg" alt="Diamond" width={24} height={24} />
                  </div>
                  <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <Bell className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="relative">
                    <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <UserAvatar name={userData?.name || 'User'} avatarUrl={userData?.avatarUrl || ''} />
                      <span className="hidden ml-2 text-sm font-medium text-gray-300 lg:block">{userData?.name || 'User'}</span>
                      <ChevronDown className="hidden ml-1 h-4 w-4 text-gray-400 lg:block" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* Page Content */}
        {children}
        </div>
      </div>
  )
}

export default DashLayout