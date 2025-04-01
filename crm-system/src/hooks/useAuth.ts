import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth(requireAdmin = false) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (requireAdmin && session.user.role !== 'ADMIN') {
      router.push('/');
    }
  }, [session, status, requireAdmin, router]);

  return {
    user: session?.user,
    isAdmin: session?.user?.role === 'ADMIN',
    isLoading: status === 'loading',
  };
} 