"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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
  HelpCircle, // For suggested questions
} from "lucide-react";
import DashLayout from "@/layout/DashLayout";
import dummy_skills from "@/lib/dummy_datas/db_overview";
import { useTopicStudy } from "@/hooks/generateTopicStudy";
import { createClient } from "@supabase/supabase-js";
import { db } from "@/lib/db";
import { skills } from "@/lib/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { useRefetchDB } from "@/hooks/refetchDB";
import { useUser } from "@clerk/nextjs";
import { ChatComponent } from "@/components/ChatComponent";
interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

interface SubTopic {
  id: string;
  type: "video" | "article" | "code";
  title: string;
  content: string;
  resource: string;
  estimatedTime: string;
  practiceProjects: string[];
  keyPoints: string[];
  isCompleted?: boolean;
  suggestedQuestions?: string[];
}

interface Topic {
  id: string;
  title: string;
  description: string;
  subTopics: SubTopic[];
}

interface Level {
  id: string;
  level: number;
  title: string;
  description: string;
  isCompleted: boolean;
  suggestedQuestions: string[];
  topics: Topic[];
}

interface Skill {
  id: string;
  name: string;
  description: string;
  roadMap: Level[];
}

export default function TopicsStudyPage() {
  const router = useRouter();
  const params = useParams();
  const { skillid, level, topicid } = params;

  const [skill, setSkill] = useState<Skill | null>(null);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [subTopics, setSubTopics] = useState<SubTopic[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { generateStudyMaterial } = useTopicStudy();
  const { refetchAllData } = useRefetchDB();
  const { user } = useUser();
  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        //check if the topic is already generated and is in zustand store
        // const { data: skillData } = useSkillStore.getState().getSkill(skillid as string);

        // 1. Fetch skill data from skills table
        const skillData = await db.query.skills.findFirst({
          where: eq(skills.id, skillid as string),
        });

        if (!skillData) throw new Error("Skill not found");

        setSkill(skillData as unknown as Skill);
        // console.log("skillData", skillData);

        // 2. Find the current level
        const foundLevel = skillData.roadMap?.find(
          (l: any) => l.level === parseInt(level as string)
        );
        if (!foundLevel) throw new Error("Level not found");
        setCurrentLevel(foundLevel as unknown as Level);
        // console.log("foundLevel", foundLevel);

        // console.log("topicid", topicid);

        // 3. Find the current topic
        const foundTopic = foundLevel?.topics[parseInt(topicid as string)];
        // .find(
        //   (t: any) => t.id === parseInt(topicid as string)
        // );
        if (!foundTopic) throw new Error("Topic not found");
        // console.log("foundTopic", foundTopic);
        // console.log("foundTopic.subTopics", foundTopic.subTopics);
        if (!foundTopic.isGenerated) {
          //TODO: Generate the content
          const generatedData = await generateStudyMaterial({
            topic: foundTopic.name,
            subtopics: foundTopic.subTopics,
            learningStyle: (skillData.userStyle as any) || "visual",
          });
          console.log("generatedData", generatedData);
          if (generatedData === null) {
            setIsLoading(false);
            return;
          }

          setSubTopics(generatedData as any);
          //set the isGenerated to true and data to the foundTopic in DB
          const updatedRoadMap = skillData?.roadMap?.map((lvl: any) =>
            lvl.level === parseInt(level as string)
              ? {
                  ...lvl,
                  topics: lvl.topics.map((t: any) =>
                    t.id === (topicid as string)
                      ? {
                          ...t,
                          isGenerated: true,
                          subTopics: generatedData,
                        }
                      : t
                  ),
                }
              : lvl
          );
          console.log("updatedRoadMap", updatedRoadMap);

          try {
            // const
            const updatedSkill = await db
              .update(skills)
              .set({
                roadMap: updatedRoadMap,
              })
              .where(eq(skills.id, skillid as string))
              .returning();
            console.log("updatedSkill", updatedSkill);
          } catch (error) {
            console.error("Error updating skill:", error);
          }

          refetchAllData();
          console.log("updated foundTopic", foundTopic);
          setChatMessages([
            {
              sender: "ai",
              text: `Hello! I'm your AI Instructor for "${
                (generatedData?.data as any)[0]?.title || "Demo Question!"
              }". How can I help you today?`,
            },
          ]);

          setIsLoading(false);
          return;
        } else {
          setSubTopics(foundTopic.subTopics as unknown as SubTopic[]);
          setChatMessages([
            {
              sender: "ai",
              text: `Hello! I'm your AI Instructor for "${
                (foundTopic.subTopics as any)[0]?.title || "Demo Question!"
              }". How can I help you today?`,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    };

    if (skillid && level && topicid) {
      fetchData();
    }
  }, [skillid, level, topicid]);

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
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Lesson Not Found
        </h1>
        <p className="text-gray-400 mb-6 text-center">
          The requested lesson material could not be located.
        </p>
        <Link href={`/skill/${skillid}`} passHref>
          <p className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back to Skill Details
          </p>
        </Link>
      </div>
    );
  }

  // // Find current task index for Next/Prev navigation
  // const allTasks = skill.roadMap.levels[0].subtopics.flatMap(st => st.tasks);
  // const currentTaskIndex = allTasks.findIndex(t => t.title === topic);
  // const prevTask = currentTaskIndex > 0 ? allTasks[currentTaskIndex - 1] : null;
  // const nextTask = currentTaskIndex < allTasks.length - 1 ? allTasks[currentTaskIndex + 1] : null;

  return (
    <DashLayout>
      <div className="font-inter bg-gray-900 text-white min-h-screen flex antialiased">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
          {" "}
          {/* Ensure main content area doesn't overflow viewport height */}
          {/* Page Content (Lesson + Chat) */}
          <div className="flex-1 flex overflow-hidden">
            {" "}
            {/* This flex container allows two scrolling children */}
            {/* Lesson Content Area (Left) */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 bg-gray-800/50 mb-20">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                  <p className="text-sm text-blue-400 font-medium">
                    Level {skill.roadMap[0].level}: {skill.roadMap[0].title}
                  </p>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-100 mt-1">
                    {skill.roadMap[0].title}
                  </h1>
                </div>

                <article
                  className="prose prose-sm sm:prose-base prose-invert max-w-none text-gray-300 prose-headings:text-gray-100 prose-strong:text-gray-200 prose-p:text-blue-400 hover:prose-p:text-blue-300 prose-code:bg-gray-900 prose-code:p-0.5 prose-code:rounded prose-code:font-mono prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-lg prose-pre:text-sm"
                  dangerouslySetInnerHTML={{
                    __html: skill.roadMap[0].description || "",
                  }}
                />

                <div>
                  {subTopics?.map((subtopic: any, index: any) => (
                    <div
                      key={index}
                      className="bg-gray-800 p-4 rounded-lg shadow-md mb-6"
                    >
                      <div>
                        <h1
                          className={`text-xl font-semibold mb-2 ${
                            subtopic.type === "video"
                              ? "text-red-400"
                              : subtopic.type === "article"
                              ? "text-blue-400"
                              : subtopic.type === "code"
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}
                        >
                          {subtopic.title}
                        </h1>
                        {subtopic.resources.type === "video" && (
                          <div className="mb-4">
                            <div
                              className="content-container"
                              dangerouslySetInnerHTML={{
                                __html: subtopic.content,
                              }}
                            ></div>
                            <Link
                              href={`https://www.youtube.com/results?search_query=${subtopic.title}`}
                              target="_blank"
                              className="w-full h-96 rounded-lg mt-2"
                            >
                              <img
                                src={
                                  "https://cdn.gtricks.com/2021/04/how-to-enable-youtube-dark-mode-on-pc-and-android-ios-1280x720.jpg"
                                }
                                alt="YouTube Thumbnail"
                                className="w-full h-96 rounded-lg mt-2"
                              />
                            </Link>
                          </div>
                        )}
                        {subtopic.resources.type === "article" && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-400 mb-2">
                              Article Resource:{" "}
                              <a
                                className="text-blue-400"
                                href={subtopic.resources.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {subtopic.resources.url}
                              </a>
                            </p>
                            <div
                              className="content-container"
                              dangerouslySetInnerHTML={{
                                __html: subtopic.content,
                              }}
                            ></div>
                          </div>
                        )}
                        {subtopic.resources.type === "code" && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-400 mb-2">
                              Code Resource:{" "}
                              <a
                                className="text-blue-400"
                                href={subtopic.resources.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {subtopic.resources.url}
                              </a>
                            </p>
                            <div
                              className="content-container"
                              dangerouslySetInnerHTML={{
                                __html: subtopic.content,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                      <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">
                          Key Points
                        </h2>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                          {subtopic.keyPoints.map((point: any, index: any) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold mb-2">
                          Practice Projects
                        </h2>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                          {subtopic.practiceProjects.map(
                            (project: any, index: any) => (
                              <li key={index}>{project}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors ${
                      skill.roadMap[0].isCompleted
                        ? "bg-gray-600 hover:bg-gray-500"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {skill.roadMap[0].isCompleted ? (
                      <CheckCircle className="mr-2 h-5 w-5" />
                    ) : null}
                    {skill.roadMap[0].isCompleted
                      ? "Marked as Done"
                      : "Mark as Done"}
                  </button>
                </div>
              </div>
            </main>

            <ChatComponent skill={skill} level={level} />
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
