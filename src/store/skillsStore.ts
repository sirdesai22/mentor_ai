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