import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from '@/services/firebase/client';
import { signIn as authSignIn, signUp as authSignUp, signOut as authSignOut, sendPasswordReset as authReset } from '@/services/auth/auth';
import type { AuthUser, SignInCredentials, SignUpCredentials } from '@/services/auth/types';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function toAuthUser(user: User | null): AuthUser | null {
  if (!user) return null;
  return { uid: user.uid, email: user.email, displayName: user.displayName };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(toAuthUser(firebaseUser));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    signIn: async (credentials) => {
      const result = await authSignIn(credentials);
      setUser(result);
    },
    signUp: async (credentials) => {
      const result = await authSignUp(credentials);
      setUser(result);
    },
    signOut: async () => {
      await authSignOut();
      setUser(null);
    },
    resetPassword: async (email) => {
      await authReset(email);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
