import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Skill {
  id: string
  name: string | null
  description: string | null
  createdAt: Date | null
  userStyle: string | null
  roadMap: string[] | null
}

interface SkillState {
  skills: Skill[] | null
  isLoading: boolean
  error: string | null
  setSkills: (skills: Skill[] | null) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clearSkills: () => void
}


interface SkillState {
  skills: Skill[] | null
  isLoading: boolean
  error: string | null
  setSkills: (skills: Skill[] | null) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clearSkills: () => void
}

export const useSkillsStore = create<SkillState>()(
  persist(
    (set) => ({
      skills: null,
      isLoading: false,
      error: null,

      setSkills: (skills) => set({ skills, error: null }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      clearSkills: () => set({ skills: null, error: null }),
    }),
    {
      name: 'skills-storage',
      partialize: (state) => ({ skills: state.skills }),
    }
  )
)

// skills are the individual skills that a user can have
// export const skills = pgTable("skills", {
//     id: uuid("id").primaryKey().defaultRandom(),
//     userId: uuid("user_id").references(() => users.id),
//     name: text("name").notNull(),
//     description: text("description"),
//     userStyle: text("user_style"),
//     roadMap: jsonb("road_map").$type<string[]>(),
//     // roadmap is an array of objects with the following structure:
//     // {
//     //   level: number, // level 1
//     //   title: string, // the title of the game
//     //   subTopic: string, // the subtopic of the game
//     //   isCompleted: boolean, // whether the level is completed
//     //   tasks: array of objects with the following structure:
//     //   {
//     //     type: string, // the type of the task
//     //     content: string, // the content of the task
//     //     isCompleted: boolean, // whether the task is completed
//     //     points: number, // the points of the task out of 100
//     //   },
//     //   progress: {
//     //     skills_mastered: number, // the total points of the game
//     //     total_hours: number, // the total hours of the game
//     //     total_skills: number, // the total skills of the game
//     //     current_skill: number, // the current skill of the game
//     //   }
//     // }
//     createdAt: timestamp("created_at").defaultNow(),
//   });