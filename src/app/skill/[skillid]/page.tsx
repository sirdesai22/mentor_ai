"use client";
import Head from "next/head";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Settings,
  LogOut,
  ChevronDown,
  ChevronLeft, // For back button
  Bell,
  Search,
  Sparkles, // For MENTOR AI logo
  Menu, // For mobile menu toggle
  X, // For mobile menu toggle
  Target, // For levels
  ListChecks, // For tasks within p level
  PlayCircle, // For starting p level/game
  CheckCircle, // For completed items
  Lightbulb,
  Circle, // For incomplete items
  Loader2, // For loading state
  Code,
  Wrench,
} from "lucide-react";
import { dummy_roadmap } from "@/lib/dummy_datas/roadmap";
// import dummy_skills from '@/lib/dummy_datas/db_overview';
import { useTopicStudy } from "@/hooks/generateTopicStudy";
import { useRefetchDB } from "@/hooks/refetchDB";
import { skills } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { useUser } from "@clerk/nextjs";

interface Skill {
  id: string;
  name: string;
  description: string;
  userStyle: string;
  roadMap: Array<{
    level: number;
    title: string;
    subTopic: string;
    isCompleted: boolean;
    tasks: Array<{
      id: string;
      type: string;
      content: string;
      isCompleted: boolean;
      points: number;
    }>;
    progress: {
      skills_mastered: number;
      total_hours: number;
      total_skills: number;
      current_skill: number;
    };
  }>;
  createdAt: string;
}

export default function RoadmapPage() {
  const router = useRouter();
  const params = useParams();
  const skillid = params.skillid as string;
  const [skill, setSkill] = useState<Skill | any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  if (!user) {
    router.push('/login');
  }

  const fetchSkillData = async () => {
    const data = await db.select().from(skills).where(eq(skills.id, skillid)).limit(1);
    console.log("skillData", data[0]);
    setSkill(data[0] as any);
    setIsLoading(false);
  }

  useEffect(() => {
    console.log("skillid", skillid);
    fetchSkillData();
  }, [skillid]);

  if (isLoading) {
    return (
      <div className="font-inter bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="ml-4 text-xl">Loading Skill Details...</p>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="font-inter bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
        <BookOpen className="h-24 w-24 text-red-500 mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Skill Not Found</h1>
        <p className="text-gray-400 mb-6">
          We couldn't find the skill you're looking for.
        </p>
        <Link href="/dashboard/skills" passHref>
          <p className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back to My Skills
          </p>
        </Link>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Skill Header */}
        <div className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-blue-400">
                {skill.name}
              </h1>
              <p className="mt-2 text-md text-gray-300 leading-relaxed">
                {skill.description}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-full ml-4 flex-shrink-0">
              <BookOpen className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          {skill.userStyle && (
            <p className="mt-4 text-sm text-gray-500 italic">
              Your preferred learning style for this skill: {skill.userStyle}
            </p>
          )}
        </div>

        {/* Roadmap/Levels Section */}
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <Target className="h-7 w-7 mr-3 text-green-400" />
          Roadmap
        </h2>

        {skill.roadMap ? (
          <div className="space-y-6">
            {skill.roadMap.map((level: any, index: any) => (
              <div
                key={level.level}
                className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
                  level.isCompleted
                    ? "bg-gray-700/70 border-l-4 border-green-500"
                    : "bg-gray-800 border-l-4 border-blue-500 hover:shadow-blue-500/30"
                }`}
              >
                <div className="flex items-center mb-4">
                  {level.isCompleted ? (
                    <CheckCircle className="h-7 w-7 text-green-500 mr-3 flex-shrink-0" />
                  ) : (
                    <Target className="h-7 w-7 text-blue-500 mr-3 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">
                      Level {level.level}: {level.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{level.description}</p>
                  </div>
                </div>

                {/* Subtopics */}
                {level.topics && level.topics.length > 0 && (
                  <div className="space-y-4">
                    {level.topics.map((topic: any, topicIndex: number) => (
                      <div
                        key={topic.name}
                        className="bg-gray-700/50 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-sm font-semibold text-gray-200 flex items-center">
                            <ListChecks className="h-4 w-4 mr-2 text-gray-400" />
                            {topic.name}
                          </h4>
                          <button
                            onClick={() =>
                              router.push(
                                `/skill/${skillid}/${level.level}/${topic.id}`
                              )
                            }
                            // disabled={
                            //   !level.isCompleted &&
                            //   index > 0 &&
                            //   !skill.roadMap[index - 1]?.isCompleted
                            // }
                            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors ${topic.isGenerated ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"}`}
                          >
                            {topic.isGenerated ? "Continue Learning" : "Start Learning"}
                            <PlayCircle className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                        {topic.isGenerated && (
                          <ul className="space-y-2 list-inside">
                          {topic.subTopics.map((subtopic: any, index: number) =>
                              <li
                                key={index}
                                className="text-xs flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                              >
                                {/* <Circle className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" /> */}
                                <span className="flex items-center">
                                  {subtopic.type === "video" && (
                                    <PlayCircle className="h-3 w-3 mr-1" />
                                  )}
                                  {subtopic.type === "quiz" && (
                                    <Target className="h-3 w-3 mr-1" />
                                  )}
                                  {subtopic.type === "code" && (
                                    <Code className="h-3 w-3 mr-1" />
                                  )}
                                  {subtopic.type === "article" && (
                                    <BookOpen className="h-3 w-3 mr-1" />
                                  )}
                                  {subtopic.type === "practice" && (
                                    <Wrench className="h-3 w-3 mr-1" />
                                  )}
                                  {subtopic.title}
                                </span>
                              </li> 
                          )}
                        </ul>
                        )}
                        {!topic.isGenerated && (
                          <ul className="space-y-2 list-inside">
                          {topic.subTopics.map((subtopic: any, index: number) =>
                              <li
                                key={index}
                                className="text-xs flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                              >
                                <Circle className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                                {subtopic}
                              </li> 
                          )}
                        </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-800 rounded-xl shadow-lg">
            <Target className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-4 text-lg font-semibold text-gray-300">
              Roadmap Coming Soon!
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              The AI is preparing the learning path for this skill. Check back
              shortly.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
