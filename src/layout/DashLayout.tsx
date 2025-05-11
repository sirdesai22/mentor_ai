import { SignOutButton } from '@clerk/nextjs'
import { Award, BookOpen, LayoutDashboard, LogOut, Settings, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type Props = {
    children: React.ReactNode
}

// Sidebar Navigation Links
const sidebarNavLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: true },
    { name: 'My Skills', href: '/dashboard/skills', icon: BookOpen, current: false },
    { name: 'Achievements', href: '/dashboard/achievements', icon: Award, current: false },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, current: false },
  ];

const DashLayout = ({ children }: Props) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const router = useRouter();

  return (
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
        {children}
      </div>
  )
}

export default DashLayout