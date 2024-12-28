import { create } from 'zustand';
import { AuthError, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export type TSignInSchema = z.infer<typeof signInSchema>;

export const defaultSignIn: TSignInSchema = {
  email: '',
  password: '',
};

type AuthStore = {
  authLoading: boolean;
  authLoadingError: null | AuthError;
  authUser: null | User;

  signUpLoading: boolean;
  signUpError: null | AuthError | unknown;
  signUpWithEmailAndPassword: (email: string, password: string) => Promise<boolean>;
  signUpWithGoogle: () => Promise<boolean>;

  signInLoading: boolean;
  signInError: null | AuthError | unknown;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;

  signOutLoading: boolean;
  signOutError: null | AuthError | unknown;
  signOut: () => void;
};

export const useAuth = create<AuthStore>((set, get) => {
  return {
    authLoading: true,
    authLoadingError: null,
    authUser: null,

    signInLoading: false,
    signInError: null,
    signInWithEmailAndPassword: async (email: string, password: string): Promise<boolean> => {
      if (get().signInLoading) return false;
      set({ signInLoading: true, signInError: null });
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        set({ authUser: user, signInLoading: false });
        return true;
      } catch (err) {
        set({ signInLoading: false, signInError: err });
        return false;
      }
    },
    signInWithGoogle: async (): Promise<boolean> => {
      if (get().signInLoading) return false;
      set({ signInLoading: true, signInError: null });
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google', options: {
            redirectTo: 'http://localhost:5173',
          },
        });
        if (error) throw error;
        set({ signInLoading: false });
        return true;
      } catch (err) {
        set({ signInLoading: false, signInError: err });
        return false;
      }
    },

    signUpLoading: false,
    signUpError: null,
    signUpWithEmailAndPassword: async (email: string, password: string): Promise<boolean> => {
      if (get().signUpLoading) return false;
      set({ signUpLoading: true, signUpError: null });
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        set({ authUser: user, signUpLoading: false });
        return true;
      } catch (err) {
        set({ signUpLoading: false, signUpError: err });
        return false;
      }
    },
    signUpWithGoogle: async (): Promise<boolean> => {
      if (get().signUpLoading) return false;
      set({ signUpLoading: true, signUpError: null });
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google', options: {
            redirectTo: 'http://localhost:5173',
          }
        });
        if (error) throw error;
        set({ signUpLoading: false });
        return true;
      } catch (err) {
        set({ signUpLoading: false, signUpError: err });
        return false;
      }
    },

    signOutLoading: false,
    signOutError: null,
    signOut: async () => {
      set({ signOutLoading: true, signOutError: null });
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        set({ authUser: null, signOutLoading: false, signOutError: null });
      } catch (err) {
        set({ signOutLoading: false, signOutError: err });
      }
    },
  };
});

// Supabase auth state listener
supabase.auth.onAuthStateChange((_, session) => {
  // console.log('authstate change', _);
  if (session) {
    const { user } = session;
    useAuth.setState({ authUser: user, authLoading: false, authLoadingError: null });
  } else {
    useAuth.setState({ authUser: null, authLoading: false, authLoadingError: null });
  }
});
