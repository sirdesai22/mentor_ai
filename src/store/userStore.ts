import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string | null
  email: string
  username: string | null
  education: string | null
  occupation: string | null
  goals: string | null
  interests: string[] | null
  coins: number
  createdAt: string
  updatedAt: string
}

interface UserState {
  user: User | null
  isLoading: boolean
  error: string | null
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user, error: null }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      clearUser: () => set({ user: null, error: null }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)

