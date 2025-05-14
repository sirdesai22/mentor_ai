'use client'
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Settings,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight as ChevronRightIcon, // For next/prev lesson
  Bell,
  Search,
  Sparkles,
  Menu,
  X,
  Lightbulb,
  MessageSquare, // For AI Chat
  Send, // For chat input
  CheckCircle,
  Circle,
  Loader2,
  FileText, // For lesson content
  HelpCircle // For suggested questions
} from 'lucide-react';

// Placeholder User Data
const userData = {
  name: 'Alex Johnson',
  avatarUrl: '',
};

// Sidebar Navigation Links
const sidebarNavLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: false },
  { name: 'My Skills', href: '/dashboard/skills', icon: BookOpen, current: true }, // Parent page is active
  { name: 'New Skill', href: '/dashboard/new-skill', icon: Lightbulb, current: false },
  { name: 'Achievements', href: '/dashboard/achievements', icon: Award, current: false },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, current: false },
];

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

interface Task {
  type: 'video' | 'quiz' | 'code' | 'article' | 'practice';
  title: string;
  url?: string;
  content?: string;
  isCompleted?: boolean;
  points?: number;
  estimatedTime?: string;
  suggestedQuestions?: string[];
}

interface Subtopic {
  name: string;
  tasks: Task[];
}

interface Level {
  level: number;
  isCompleted: boolean;
  title: string;
  description: string;
  subtopics: Subtopic[];
}

interface Skill {
  id: string;
  name: string;
  description: string;
  userStyle: string;
  roadMap: {
    topic: string;
    description: string;
    levels: Level[];
    completion_rewards: {
      badge: string;
      level_up_message: string;
      final_certificate: boolean;
    };
  };
}

const dummyUserSkills: Skill[] = [
  {
    id: 'skill_uuid_1',
    name: 'Python Programming',
    description: 'Master the fundamentals of Python...',
    userStyle: 'Visual Learner, Prefers Practical Examples',
    roadMap: {
      topic: 'Python Basics',
      description: 'Learn the basics of Python programming',
      levels: [
        {
          level: 1,
          isCompleted: true,
          title: 'Python Basics: Variables & Data Types',
          description: 'Learn about Python variables and data types',
          subtopics: [
            {
              name: 'Understanding core data types',
              tasks: [
                {
                  type: 'video',
                  title: 'Understanding Variables in Python',
                  url: 'https://example.com/video1',
                  content: `
                    <p class="mb-4">In Python, a variable is a named location used to store data in the memory. It is helpful to think of variables as a container that holds data which can be changed later throughout programming.</p>
                    <p class="mb-2"><strong>Key Concepts:</strong></p>
                    <ul class="list-disc list-inside mb-4 pl-4 text-gray-300">
                      <li>Variables are created when you first assign a value to them.</li>
                      <li>Python is dynamically typed, so you don't need to declare the type of a variable.</li>
                      <li>Variable names can be short (like x and y) or more descriptive (age, carname, total_volume).</li>
                    </ul>
                    <p class="mb-2"><strong>Example:</strong></p>
                    <pre class="bg-gray-900 p-3 rounded-md text-sm overflow-x-auto"><code class="language-python">
# Assigning values to variables
x = 5             # x is of type int
name = "John"     # name is of type str
pi = 3.14         # pi is of type float
is_learning = True # is_learning is of type bool

print(x)
print(name)
print(pi)
print(is_learning)
                    </code></pre>
                    <p className="mt-4">Try running this code in your Python environment to see the output!</p>
                  `,
                  isCompleted: true,
                  estimatedTime: '15 mins',
                  suggestedQuestions: [
                    "What are naming conventions for Python variables?",
                    "How is Python's dynamic typing different from static typing?",
                    "Can I change the type of a variable in Python?"
                  ]
                },
                {
                  type: 'quiz',
                  title: 'Data Types Quiz',
                  content: 'Identify data types',
                  isCompleted: true,
                  points: 90,
                  estimatedTime: '10 mins'
                }
              ]
            }
          ]
        },
        {
          level: 2,
          isCompleted: false,
          title: 'Control Flow: Loops & Conditionals',
          description: 'Learn to control program execution with loops and conditionals',
          subtopics: [
            {
              name: 'Conditional Statements',
              tasks: [
                {
                  type: 'video',
                  title: 'Mastering Conditional Statements (if/else)',
                  url: 'https://example.com/video2',
                  content: `
                    <p class="mb-4">Conditional statements allow your program to make decisions and execute different blocks of code based on whether a condition is true or false.</p>
                    <p class="mb-2"><strong>The <code>if</code> statement:</strong></p>
                    <p class="mb-4">Used to execute a block of code only if a specified condition is true.</p>
                    <pre class="bg-gray-900 p-3 rounded-md text-sm"><code class="language-python">
a = 33
b = 200
if b > a:
  print("b is greater than a") # This will be printed
                    </code></pre>
                    <p class="mt-4 mb-2"><strong>The <code>elif</code> keyword:</strong></p>
                    <p class="mb-4">Python's way of saying "if the previous conditions were not true, then try this condition".</p>
                    <p class="mt-4 mb-2"><strong>The <code>else</code> keyword:</strong></p>
                    <p class="mb-4">Catches anything which isn't caught by the preceding conditions.</p>
                    <pre class="bg-gray-900 p-3 rounded-md text-sm"><code class="language-python">
a = 200
b = 33
if b > a:
  print("b is greater than a")
elif a == b:
  print("a and b are equal")
else:
  print("a is greater than b") # This will be printed
                    </code></pre>
                  `,
                  isCompleted: false,
                  estimatedTime: '20 mins',
                  suggestedQuestions: [
                    "What is the difference between 'if' and 'elif'?",
                    "Can I have multiple 'elif' statements?",
                    "What are nested conditional statements?"
                  ]
                },
                {
                  type: 'practice',
                  title: 'Logic Gate Simulator',
                  content: 'Logic Gate Simulator',
                  isCompleted: true,
                  points: 80,
                  estimatedTime: '25 mins'
                },
                {
                  type: 'code',
                  title: 'Simple Calculator Challenge',
                  content: 'Write a simple calculator...',
                  isCompleted: false,
                  points: 0,
                  estimatedTime: '30 mins'
                }
              ]
            }
          ]
        }
      ],
      completion_rewards: {
        badge: 'Python Programming Master',
        level_up_message: 'Congratulations on mastering Python Programming!',
        final_certificate: true
      }
    }
  }
];

// UserAvatar Component
const UserAvatar = ({ name, avatarUrl }: { name: string, avatarUrl: string }) => {
  if (avatarUrl) { return <img className="h-8 w-8 rounded-full" src={avatarUrl} alt={name} />; }
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  return (
    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-600">
      <span className="text-xs font-medium leading-none text-white">{initials}</span>
    </span>
  );
};

export default function LessonStudyPage() {
  const router = useRouter();
  const params = useParams();
  const skillid = params.skillid as string;
  const level = params.level as string;
  const topic = params.topic as string;

  const [skill, setSkill] = useState<Skill | null>(null);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skillid && level && topic) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        // const foundSkill = dummyUserSkills.find(s => s.id === skillid);
        const foundSkill = dummyUserSkills[0];
        if (foundSkill) {
          setSkill(foundSkill);
          const foundLevel = foundSkill.roadMap.levels.find(l => l.level === parseInt(level));
          if (foundLevel) {
            setCurrentLevel(foundLevel);
            const foundTask = foundLevel.subtopics
              .flatMap(st => st.tasks)
              .find(t => t.title === topic);
            if (foundTask) {
              setCurrentTask(foundTask);
              setChatMessages([
                { sender: 'ai' as const, text: `Hello! I'm your AI Instructor for "${foundTask.title}". How can I help you today?` }
              ]);
            } else {
              setCurrentTask(null);
            }
          } else {
            setCurrentLevel(null);
          }
        } else {
          setSkill(null);
        }
        setIsLoading(false);
      }, 700);
    }
  }, [skillid, level, topic]);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleLogout = () => { /* ... */ };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMessages: ChatMessage[] = [...chatMessages, { sender: 'user' as const, text: chatInput }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsAiTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsAiTyping(false);
      setChatMessages(prev => [...prev, { 
        sender: 'ai' as const, 
        text: `I've received your question about "${chatInput.substring(0,20)}...". Let me explain that... (AI response placeholder)` 
      }]);
    }, 1500 + Math.random() * 1000);
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setChatInput(question);
  };

  if (isLoading) {
    return (
      <div className="font-inter bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="ml-4 text-xl">Loading Lesson...</p>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="font-inter bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
        <FileText className="h-24 w-24 text-red-500 mb-4" />
        <h1 className="text-2xl font-semibold mb-2 text-center">Lesson Not Found</h1>
        <p className="text-gray-400 mb-6 text-center">The requested lesson material could not be located.</p>
        <Link href={`/skill/${skillid}`} passHref>
          <p className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back to Skill Details
          </p>
        </Link>
      </div>
    );
  }

  // Find current task index for Next/Prev navigation
  const allTasks = skill.roadMap.levels[0].subtopics.flatMap(st => st.tasks);
  const currentTaskIndex = allTasks.findIndex(t => t.title === topic);
  const prevTask = currentTaskIndex > 0 ? allTasks[currentTaskIndex - 1] : null;
  const nextTask = currentTaskIndex < allTasks.length - 1 ? allTasks[currentTaskIndex + 1] : null;

  return (
    <>
      <div className="font-inter bg-gray-900 text-white min-h-screen flex antialiased">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 border-r border-gray-700 transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:static md:flex md:flex-col`}>
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-700">
            <Link href="/" passHref><p className="text-2xl font-bold flex items-center"><Sparkles className="h-7 w-7 mr-2 text-blue-500" />MENTOR <span className="text-blue-500">AI</span></p></Link>
            <button onClick={() => setMobileSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white" aria-label="Close sidebar"><X className="h-6 w-6" /></button>
          </div>
          <nav className="flex-grow px-4 py-6 space-y-2">
            {sidebarNavLinks.map((item) => (
              <Link key={item.name} href={item.href} passHref>
                <p className={`flex items-center px-3 py-3 rounded-lg transition-colors duration-200 ${item.current ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} onClick={() => setMobileSidebarOpen(false)}>
                  <item.icon className="h-5 w-5 mr-3" />{item.name}
                </p>
              </Link>
            ))}
            {/* TODO: Add current skill's level/lesson outline here */}
          </nav>
          <div className="px-4 py-6 border-t border-gray-700">
            <button onClick={handleLogout} className="w-full flex items-center px-3 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"><LogOut className="h-5 w-5 mr-3" />Logout</button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col max-h-screen overflow-hidden"> {/* Ensure main content area doesn't overflow viewport height */}
          {/* Top Bar */}
          <header className="bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-30 flex-shrink-0">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                <button onClick={() => setMobileSidebarOpen(true)} className="md:hidden text-gray-300 hover:text-white p-2 -ml-2" aria-label="Open sidebar"><Menu className="h-6 w-6" /></button>
                <div className="flex-1 md:flex-none">
                  <Link href={`/dashboard/skills/${skillid}`} passHref>
                    <p className="inline-flex items-center text-gray-300 hover:text-white group text-sm">
                      <ChevronLeft className="h-5 w-5 mr-1 text-blue-500 group-hover:text-blue-400" />
                      Back to <span className="hidden sm:inline ml-1">'{skill.name}' Outline</span>
                    </p>
                  </Link>
                </div>
                <div className="hidden md:flex flex-1 mx-4 max-w-xs"> {/* Search can be kept or removed */}</div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-gray-800 focus:ring-white"><Bell className="h-5 w-5 sm:h-6 sm:w-6" /></button>
                  <div className="relative">
                    <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-gray-800 focus:ring-white">
                      <UserAvatar name={userData.name} avatarUrl={userData.avatarUrl} />
                      <span className="hidden ml-2 text-sm font-medium text-gray-300 lg:block">{userData.name}</span>
                      <ChevronDown className="hidden ml-1 h-4 w-4 text-gray-400 lg:block" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content (Lesson + Chat) */}
          <div className="flex-1 flex overflow-hidden"> {/* This flex container allows two scrolling children */}
            {/* Lesson Content Area (Left) */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 bg-gray-800/50">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                  <p className="text-sm text-blue-400 font-medium">Level {skill.roadMap.levels[0].level}: {skill.roadMap.levels[0].title}</p>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-100 mt-1">{skill.roadMap.levels[0].title}</h1>
                </div>

                <article className="prose prose-sm sm:prose-base prose-invert max-w-none text-gray-300 prose-headings:text-gray-100 prose-strong:text-gray-200 prose-p:text-blue-400 hover:prose-p:text-blue-300 prose-code:bg-gray-900 prose-code:p-0.5 prose-code:rounded prose-code:font-mono prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-lg prose-pre:text-sm"
                         dangerouslySetInnerHTML={{ __html: skill.roadMap.levels[0].description || '' }} />

                <div>
                  <h2 className="text-lg font-semibold">Subtopics</h2>
                  <ul>
                    {skill.roadMap.levels[0].subtopics.map((subtopic) => (
                      <div key={subtopic.name}>
                        {subtopic.name}
                        <div>
                          {subtopic.tasks.map((task) => (
                            <div key={task.title}>
                              <h1>{task.title}</h1>
                              <a href={task.url}>
                                {task.url}
                              </a>
                              <div dangerouslySetInnerHTML={
                                {__html: task.content!}
                              }>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                    {prevTask && (
                         <Link href={`/skill/${skillid}/${skill.roadMap.levels[0].level}/${prevTask.title}`} passHref>
                            <p className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                                <ChevronLeft className="mr-2 h-4 w-4" /> Previous Lesson
                            </p>
                        </Link>
                    )}
                    
                    <button className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors ${skill.roadMap.levels[0].isCompleted ? 'bg-gray-600 hover:bg-gray-500' : 'bg-green-600 hover:bg-green-700'}`}>
                        {skill.roadMap.levels[0].isCompleted ? <CheckCircle className="mr-2 h-5 w-5" /> : null}
                        {skill.roadMap.levels[0].isCompleted ? 'Marked as Done' : 'Mark as Done'}
                    </button>

                    {nextTask && (
                        <Link href={`/skill/${skillid}/${skill.roadMap.levels[0].level}/${nextTask.title}`} passHref>
                            <p className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                                Next Lesson <ChevronRightIcon className="ml-2 h-4 w-4" />
                            </p>
                        </Link>
                    )}
                </div>
              </div>
            </main>

            {/* AI Chat Area (Right) */}
            <aside className="w-full md:w-96 lg:w-[420px] bg-gray-800 border-l border-gray-700 flex flex-col flex-shrink-0 max-h-full"> {/* Fixed width, flex column */}
              <div className="p-4 border-b border-gray-700 flex items-center flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-blue-400 mr-3" />
                <h2 className="text-lg font-semibold">AI Instructor</h2>
              </div>
              {/* Chat Messages */}
              <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isAiTyping && (
                    <div className="flex justify-start">
                        <div className="max-w-[80%] p-3 rounded-xl bg-gray-700 text-gray-200 rounded-bl-none">
                            <p className="text-sm flex items-center">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" /> AI is typing...
                            </p>
                        </div>
                    </div>
                )}
              </div>
              {/* Suggested Questions */}
              {skill.roadMap.levels[0].subtopics[0].tasks[0].suggestedQuestions && skill.roadMap.levels[0].subtopics[0].tasks[0].suggestedQuestions.length > 0 && chatMessages.filter(m => m.sender === 'user').length < 2 && ( // Show initially or if user hasn't asked much
                <div className="p-4 border-t border-gray-700 flex-shrink-0">
                    <h4 className="text-xs text-gray-400 mb-2 font-medium">Some questions you might have:</h4>
                    <div className="space-y-1.5">
                        {skill.roadMap.levels[0].subtopics[0].tasks[0].suggestedQuestions.map((q, i) => (
                            <button 
                                key={i} 
                                onClick={() => handleSuggestedQuestion(q)}
                                className="w-full text-left text-xs p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-blue-300 transition-colors flex items-center"
                            >
                                <HelpCircle className="h-3.5 w-3.5 mr-2 flex-shrink-0 text-gray-500"/> {q}
                            </button>
                        ))}
                    </div>
                </div>
              )}
              {/* Chat Input */}
              <div className="p-4 border-t border-gray-700 bg-gray-800 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask AI anything about the lesson..."
                    className="flex-1 p-2.5 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                    disabled={!chatInput.trim() || isAiTyping}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
