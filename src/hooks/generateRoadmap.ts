import { GoogleGenAI } from "@google/genai";

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
  generateRoadmap: (skill: string, userDetails: string) => Promise<any>;
}

const genAI = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
});

export const useRoadmap = (): UseRoadmapReturn => {
  const generateRoadmap = async (skill: string, userDetails: string) => {
    try {
      const prompt = `Create a detailed learning roadmap for ${skill}. Use the following user details to create the roadmap:${userDetails}
      1. A structured list of steps to master this skill
      2. The roadmap should be in a structured format with levels and topics
      3. The roadmap should be in a JSON format
      4. The roadmap should cover all the topics that are required to master the skill
      
      Format the response as a JSON object with the following structure:
      data:{
        "name": string, //give a name to the skill - fun/creative/game-like (keep it short and concise)
        "description": string,
        "roadMap": [
          {
            "level": number,
            "isCompleted": false, //default keep it false do not change it
            "title": string,
            "description": string,
            "suggestedQuestions": string[],
            "topics": [
              {
                "id": string, // 0,1,2,3,4,5...
                "name": string,
                "isCompleted": false, //default keep it false do not change it
                "isGenerated": false, //default keep it false do not change it
                "subTopics": string[] //list of subtopics that need to be studied under this topic
              }
            ]
          }
        ],
        "estimatedTime": string,
      }
        
      Ensure all resources are high-quality and up-to-date. Return only raw JSON, no markdown or explanations. Keep the data in context of the skill ${skill} and do not halucinate any data.`;

      const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      if (!response) {
        console.error("No response from AI model");
        return "null";
      }
      const cleaned = response.text
        ?.replace(/^```json/, "")
        .replace(/^```/, "")
        .replace(/```$/, "")
        .trim();
      console.log(cleaned);
      const roadmapData = JSON.parse(cleaned || "");
      console.log(roadmapData);
      return roadmapData.data as any;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to generate study materials";
      console.error("Error generating study materials:", errorMessage);
      return null;
    }
  };

  return {
    generateRoadmap
  };
};
