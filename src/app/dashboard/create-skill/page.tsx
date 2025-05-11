'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Search,
  Sparkles, // For MENTOR AI logo
  Menu, // For mobile menu toggle
  X, // For mobile menu toggle
  Lightbulb, // For skill input
  HelpCircle, // For MCQs
  Gamepad2, // For Game generation
  ArrowRight,
  CheckCircle,
  Loader2, // For loading states
  PlayCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import DashLayout from '@/layout/DashLayout';

// Placeholder User Data (can be fetched from context or props in a real app)
const userData = {
  name: 'Alex Johnson',
  avatarUrl: '', // Optional: URL to user's avatar image
};

// Sidebar Navigation Links (adjust 'current' based on actual routing)
const sidebarNavLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: false },
  { name: 'My Skills', href: '/dashboard/skills', icon: BookOpen, current: false },
  { name: 'Achievements', href: '/dashboard/achievements', icon: Award, current: false },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, current: false },
];

// Dummy MCQ data
const dummyMCQs = [
  {
    id: 1,
    question: "What is the primary advantage of using a declarative programming paradigm?",
    options: ["More control over program flow", "Easier to reason about state", "Faster execution speed", "Simpler syntax for loops"],
    answer: "Easier to reason about state",
  },
  {
    id: 2,
    question: "Which of these is a dynamically-typed language?",
    options: ["Java", "C++", "Python", "TypeScript"],
    answer: "Python",
  },
  {
    id: 3,
    question: "What does 'API' stand for in software development?",
    options: ["Advanced Program Interaction", "Application Programming Interface", "Automated Process Integration", "Applied Protocol Instance"],
    answer: "Application Programming Interface",
  }
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

export default function NewSkillPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [pageState, setPageState] = useState('input'); // 'input', 'mcq', 'game_generation', 'game_ready'
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const handleLogout = () => {
    console.log('User logged out');
    alert('Logout functionality placeholder.');
  };

  const handleSkillSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!skillInput.trim()) {
      alert("Please enter a skill you want to learn.");
      return;
    }
    setIsLoading(true);
    console.log(`User wants to learn: ${skillInput}`);
    // Simulate AI analysis
    setTimeout(() => {
      setPageState('mcq');
      setIsLoading(false);
    }, 2000);
  };

  const handleAnswerSelect = (questionId: number, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitMCQs = () => {
    setIsLoading(true);
    setShowResults(true); // Show correct/incorrect answers
    // Simulate result processing
    setTimeout(() => {
      setPageState('game_generation');
      setIsLoading(false);
    }, 2500);
  };
  
  const handleGenerateGame = () => {
    setIsLoading(true);
    // Simulate game generation
    setTimeout(() => {
        setPageState('game_ready');
        setIsLoading(false);
    }, 3000);
  };


  const renderContent = () => {
    switch (pageState) {
      case 'input':
        return (
          <div className="bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
              <Lightbulb className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-semibold">Define Your New Skill</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Tell us what you're eager to learn. Our AI will analyze your request and prepare some initial questions to tailor your learning game.
            </p>
            <form onSubmit={handleSkillSubmit}>
              <textarea
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="e.g., 'Basics of Quantum Computing', 'Learn Spanish for Beginners', 'Advanced JavaScript Promises'..."
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors min-h-[100px]"
                rows={4}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" /> Analyzing...
                  </>
                ) : (
                  <>
                    Start AI Analysis <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        );

      case 'mcq':
        return (
          <div className="bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
              <HelpCircle className="h-8 w-8 text-green-400 mr-3" />
              <h2 className="text-2xl font-semibold">Knowledge Check for: <span className="text-green-400">{skillInput}</span></h2>
            </div>
            <p className="text-gray-400 mb-6">
              Let's see what you already know! Answer these questions to help us personalize your game.
            </p>
            <div className="space-y-6">
              {dummyMCQs.map((mcq) => (
                <div key={mcq.id} className="bg-gray-700 p-4 rounded-lg">
                  <p className="font-medium text-gray-200 mb-3">{mcq.id}. {mcq.question}</p>
                  <div className="space-y-2">
                    {mcq.options.map((option) => {
                      const isSelected = selectedAnswers[mcq.id] === option;
                      let optionClass = "bg-gray-600 hover:bg-gray-500";
                      if (showResults) {
                        if (option === mcq.answer) optionClass = "bg-green-500/50 ring-2 ring-green-400";
                        else if (isSelected && option !== mcq.answer) optionClass = "bg-red-500/50 ring-2 ring-red-400";
                      } else if (isSelected) {
                        optionClass = "bg-blue-500";
                      }
                      return (
                        <button
                          key={option}
                          onClick={() => !showResults && handleAnswerSelect(mcq.id, option)}
                          disabled={showResults || isLoading}
                          className={`w-full text-left p-2.5 rounded-md transition-all text-sm ${optionClass} disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                          {option}
                          {showResults && option === mcq.answer && <CheckCircle className="inline-block ml-2 h-4 w-4 text-green-300" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmitMCQs}
              disabled={Object.keys(selectedAnswers).length < dummyMCQs.length || isLoading || showResults}
              className="mt-8 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition-colors duration-300 disabled:opacity-60"
            >
              {isLoading && !showResults ? (
                 <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" /> Submitting...
                  </>
              ) : showResults && isLoading ? (
                 <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" /> Processing...
                  </>
              ) : showResults ? (
                <>
                    Proceed to Game Generation <ArrowRight className="ml-2 h-5 w-5" />
                </>
              ) : (
                "Submit Answers"
              )}
            </button>
          </div>
        );
      
      case 'game_generation':
        return (
          <div className="bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 max-w-2xl mx-auto text-center">
            <Gamepad2 className="h-16 w-16 text-purple-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-2xl font-semibold mb-3">Preparing Your Learning Game!</h2>
            <p className="text-gray-400 mb-6">
              Our AI is crafting a unique game for <strong className="text-purple-300">{skillInput}</strong> based on your responses. This might take a moment.
            </p>
            <button
                onClick={handleGenerateGame}
                disabled={isLoading}
                className="mt-6 w-full sm:w-auto flex justify-center items-center mx-auto py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-colors duration-300 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" /> Generating Game...
                  </>
                ) : (
                  <>
                    Click to Finalize Game <Sparkles className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
          </div>
        );

    case 'game_ready':
        return (
          <div className="bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 max-w-2xl mx-auto text-center">
            <Sparkles className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-3">Your Game is Ready!</h2>
            <p className="text-gray-400 mb-6">
              Your personalized learning game for <strong className="text-yellow-300">{skillInput}</strong> has been successfully generated.
            </p>
            <button
                onClick={() => alert(`Starting game for ${skillInput}!`)} // Placeholder action
                className="mt-6 w-full sm:w-auto flex justify-center items-center mx-auto py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400 transition-colors duration-300"
              >
                Start Learning Game <PlayCircle className="ml-2 h-5 w-5" />
            </button>
             <button
                onClick={() => { setPageState('input'); setSkillInput(''); setSelectedAnswers({}); setShowResults(false); }}
                className="mt-4 w-full sm:w-auto flex justify-center items-center mx-auto py-2 px-6 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                Learn Another Skill
            </button>
          </div>
        );

      default:
        return <p>Something went wrong.</p>;
    }
  };

  return (
    <DashLayout>
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 bg-gray-900">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
    </DashLayout>
  );
}
