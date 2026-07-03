'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function Providers({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}
