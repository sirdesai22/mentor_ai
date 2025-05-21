"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  PlayCircle,
} from "lucide-react";
import DashLayout from "@/layout/DashLayout";
import { useRoadmap } from "@/hooks/generateRoadmap";
import { useRouter } from "next/navigation";
import { skills, users } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { useUserStore } from "@/store/userStore";
import { eq } from "drizzle-orm";
// Dummy MCQ data
const dummyMCQs = [
  {
    id: 1,
    question: "What is your level of experience with this skill?",
    options: [
      "I'm a beginner 🐣",
      "I have some knowledge 📘",
      "I'm an expert 🧠",
      "I'm a master 🏆",
    ],
  },
  {
    id: 2,
    question: "What is your preferred learning style?",
    options: [
      "Watching videos 🎥",
      "Practicing questions ✍️",
      "Building projects 🛠️",
      "Taking notes 📝",
    ],
  },
  {
    id: 3,
    question: "How much time can you dedicate to learning this skill?",
    options: [
      "15 minutes/day ⏱️",
      "30 minutes/day ⌛",
      "1 hour/day 🕒",
      "2+ hours/day 🕓",
    ],
  },
];

export default function NewSkillPage() {
  const [skillInput, setSkillInput] = useState("");
  const [pageState, setPageState] = useState("input"); // 'input', 'mcq', 'game_generation', 'game_ready'
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const router = useRouter();
  const { generateRoadmap } = useRoadmap();
  const { user } = useUserStore();
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
      setPageState("mcq");
      setIsLoading(false);
    }, 2000);
  };

  const handleAnswerSelect = (questionId: number, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < dummyMCQs.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setPageState("game_generation");
    }
  };

  const handleGenerateSkill = async (newSkill: any) => {
    try {
      setIsLoading(true);
      // Simulate game generation
      const userPreferences =
        "User's level of experience: " +
        selectedAnswers[1] +
        " User's preferred learning style: " +
        selectedAnswers[2] +
        " User's time commitment: " +
        selectedAnswers[3];
      const roadmap = await generateRoadmap(newSkill, userPreferences.toString());
      console.log(roadmap);

      // TODO: Add skill to DB
      if (roadmap && user) {
        const skill = await db.insert(skills).values({
          name: roadmap.name,
          description: roadmap.description,
          roadMap: roadmap.roadMap,
          userStyle: userPreferences,
          userId: user.id,
        });
        const updatedUser = await db.update(users).set({
          coins: user.coins - 10,
        }).where(eq(users.id, user.id));
        console.log(skill);
        setPageState("game_ready");
        setIsLoading(false);
        router.push("/dashboard/skills");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (pageState) {
      case "input":
        return (
          <div className="bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
              <Lightbulb className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-semibold">Define Your New Skill</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Tell us what you're eager to learn. Our AI will analyze your
              request and prepare some initial questions to tailor your learning
              game.
            </p>
            <button onClick={() => handleGenerateSkill("skillInput")}>Generate</button>
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
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />{" "}
                    Analyzing...
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

      case "mcq":
        const currentMCQ = dummyMCQs[currentQuestionIndex];
        return (
          <div className="bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
              <HelpCircle className="h-8 w-8 text-green-400 mr-3" />
              <h2 className="text-2xl font-semibold">
                Tell us about your skill:{" "}
                <span className="text-green-400">{skillInput}</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-6">
              Answer this question to help us personalize your game.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {currentMCQ.options.map((option, index) => {
                const isSelected = selectedAnswers[currentMCQ.id] === option;
                let optionClass = "bg-gray-600 hover:bg-gray-500";
                optionClass = isSelected ? "bg-blue-500" : optionClass;
                return (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(currentMCQ.id, option)}
                    disabled={isLoading}
                    className={`flex items-center justify-center p-4 rounded-lg transition-all text-lg ${optionClass} disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={
                selectedAnswers[currentMCQ.id] === undefined || isLoading
              }
              className="mt-8 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition-colors duration-300 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />{" "}
                  Submitting...
                </>
              ) : (
                <>
                  Next <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        );

      case "game_generation":
        return (
          <div className="bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 max-w-2xl mx-auto text-center">
            <Gamepad2 className="h-16 w-16 text-purple-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-2xl font-semibold mb-3">
              Preparing Your Learning Game!
            </h2>
            <p className="text-gray-400 mb-6">
              Our AI is crafting a unique game for{" "}
              <strong className="text-purple-300">{skillInput}</strong> based on
              your responses. This might take a moment.
            </p>
            <button
              onClick={() => handleGenerateSkill(skillInput)}
              disabled={isLoading}
              className="mt-6 w-full sm:w-auto flex justify-center items-center mx-auto py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-colors duration-300 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" /> Generating
                  Game...
                </>
              ) : (
                <>
                  Click to Finalize Skill for 10 <img src="/gold-coin.svg" alt="Diamond" width={24} height={24} />
                </>
              )}
            </button>
          </div>
        );

      case "game_ready":
        return (
          <div className="bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 max-w-2xl mx-auto text-center">
            <Sparkles className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-3">Your Game is Ready!</h2>
            <p className="text-gray-400 mb-6">
              Your personalized learning game for{" "}
              <strong className="text-yellow-300">{skillInput}</strong> has been
              successfully generated.
            </p>
            <button
              onClick={() => router.push("/dashboard/skills")} // Placeholder action
              className="mt-6 w-full sm:w-auto flex justify-center items-center mx-auto py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400 transition-colors duration-300"
            >
              Start Learning Game <PlayCircle className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={() => {
                setPageState("input");
                setSkillInput("");
                setSelectedAnswers({});
              }}
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
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>
    </DashLayout>
  );
}
