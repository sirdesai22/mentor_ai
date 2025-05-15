import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Topic {
  name: string;
  isCompleted: boolean;
  isGenerated: boolean;
  subTopics: string[];
}

interface Level {
  level: number;
  isCompleted: boolean;
  title: string;
  description: string;
  suggestedQuestions: string[];
  topics: Topic[];
}

interface Roadmap {
  name: string;
  description: string;
  roadMap: Level[];
  estimatedTime: string;
}

interface UseRoadmapReturn {
  roadmap: Roadmap | null;
  isLoading: boolean;
  error: string | null;
  generateRoadmap: (skill: string) => Promise<void>;
}

export const useRoadmap = (): UseRoadmapReturn => {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRoadmap = async (skill: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Initialize Gemini API
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Create a detailed learning roadmap for ${skill}. Include:
      1. A structured list of steps to master this skill
      2. Each step should have a title, description, and recommended resources
      3. Estimated time to complete the entire roadmap
      4. Overall difficulty level (Beginner/Intermediate/Advanced)
      
      Format the response as a JSON object with the following structure:
      {
        "name": string,
        "description": string,
        "roadMap": [
          {
            "level": number,
            "title": string,
            "description": string,
            "suggestedQuestions": string[],
            "topics": [
              {
                "name": string,
                "subTopics": string[]
              }
            ]
          }
        ],
        "estimatedTime": string,
      }`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the JSON response
      const roadmapData = JSON.parse(text) as Roadmap;
      setRoadmap(roadmapData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate roadmap');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    roadmap,
    isLoading,
    error,
    generateRoadmap,
  };
};
