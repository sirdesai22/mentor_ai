import { useCallback, useState } from 'react';
import { useSkillsStore } from '@/store/skillsStore';
import { useUserStore } from '@/store/userStore';
import { db } from '@/lib/db';
import { skills, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface UseRefetchDBReturn {
  refetchUserData: () => Promise<void>;
  refetchSkillsData: () => Promise<void>;
  refetchAllData: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useRefetchDB = (): UseRefetchDBReturn => {
  const { setSkills } = useSkillsStore();
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserStore();
  const refetchUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await db.query.users.findFirst({
        where: eq(users.id, user?.id || ''),
      });
      if (!userData) throw new Error('User data not found');

      setUser(userData as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setIsLoading(false);
    }
  }, [setUser, user]);

  const refetchSkillsData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const skillsData = await db.query.skills.findMany({
        where: eq(skills.userId, user?.id || ''),
      });

      if (!skillsData) throw new Error('Skills data not found');

      setSkills(skillsData as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch skills data');
    } finally {
      setIsLoading(false);
    }
  }, [setSkills, user]);

  const refetchAllData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await Promise.all([refetchUserData(), refetchSkillsData()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  }, [refetchUserData, refetchSkillsData]);

  return {
    refetchUserData,
    refetchSkillsData,
    refetchAllData,
    isLoading,
    error,
  };
};
