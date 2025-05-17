import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

type LearningStyle = 'visual' | 'reading' | 'kinesthetic';
type ResourceType = 'video' | 'article' | 'code';

interface StudyMaterial {
  type: ResourceType;
  title: string;
  content: string;
  resources: string;
  estimatedTime: string;
  practiceProjects: string[];
  keyPoints: string[];
}

interface GenerateStudyMaterialParams {
  topic: string;
  subtopics: string[];
  learningStyle: LearningStyle;
}

interface UseTopicStudyReturn {
  isLoading: boolean;
  error: string | null;
  generateStudyMaterial: (params: GenerateStudyMaterialParams) => Promise<any | null>;
}

const createPrompt = (topic: string, subtopics: string[], learningStyle: LearningStyle): string => {
  return `Generate detailed study materials for the subtopics "${subtopics}".
      The user's learning style is ${learningStyle}.

      Include:
      1. A curated list of resources (videos, articles, code examples) that match the user's learning style
      2. Practice exercises to reinforce learning
      3. Key points to remember

      Format the response as a JSON object with the following structure:
      data:[
        {
            type: "video" | "article" | "code", (generate any one of them based on the user's learning style)
            title: string;
            content: article (always) in html as a string | code (when needed) in html as a string;
            resources: youtube url as a string | article url as a string;
            estimatedTime: string;
            practiceProjects: string[];
            keyPoints: string[];
        }
      ]
      Include tailwind css classes for styling the content.
      For ${learningStyle} learners:
      - visual: Focus on video content and visual explanations
      - reading: Provide comprehensive articles and documentation
      - kinesthetic: Emphasize practical exercises and code examples

      Ensure all resources are high-quality and up-to-date.`;
};

export const useTopicStudy = (): UseTopicStudyReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStudyMaterial = async ({
    topic,
    subtopics,
    learningStyle,
  }: GenerateStudyMaterialParams): Promise<any | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = createPrompt(topic, subtopics, learningStyle);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const studyData = JSON.parse(text);
      return studyData.data as any;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate study materials';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    generateStudyMaterial,
  };
};
