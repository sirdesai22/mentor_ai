import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

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
  generateStudyMaterial: (params: GenerateStudyMaterialParams) => Promise<any | null>;
}

const createPrompt = (topic: string, subtopics: string[], learningStyle: LearningStyle): string => {
  return `Generate detailed study materials for the subtopics "${subtopics}" of the topic "${topic}".
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
            content: article (always) in html as a string | code (when needed) in html as a string (do not include youtube videos in this section of the code);
            resources: youtube url as a string and make sure to use embeded youtube videos for videos | article url as a string;
            estimatedTime: string;
            practiceProjects: string[];
            keyPoints: string[];
            suggestedQuestions: string[];
        }
      ]
      Include tailwind css classes for styling the content.
      For ${learningStyle} learners:
      - visual: Focus on video content and visual explanations
      - reading: Provide comprehensive articles and documentation
      - kinesthetic: Emphasize practical exercises and code examples

      Ensure all resources are high-quality and up-to-date. Return only raw JSON, no markdown or explanations.`;
};

const genAI = new GoogleGenAI({apiKey:process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''});


export const useTopicStudy = (): UseTopicStudyReturn => {
  const generateStudyMaterial = async ({
    topic,
    subtopics,
    learningStyle,
  }: GenerateStudyMaterialParams): Promise<any | null> => {
    try {
      const response = await genAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: createPrompt(topic, subtopics, learningStyle),
      });
      if (!response) {
        console.error('No response from AI model');
        return 'null';
      }
      const cleaned = response.text?.replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();
      console.log(cleaned);
      const studyData = JSON.parse(cleaned || '');
      console.log(studyData);
      return studyData.data as any;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate study materials';
      console.error('Error generating study materials:', errorMessage);
      return null;
    }
  };

  return {
    generateStudyMaterial,
  };
};
