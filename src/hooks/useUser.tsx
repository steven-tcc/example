import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const userSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(1),
  email: z.string().email(),
  full_name: z.string().optional(),
  avatar_url: z.string().url().optional().or(z.literal('')),
  language: z.string().optional(),
  dark_mode_enabled: z.boolean().optional(),
  email_verified: z.boolean().optional(),
});

export type TUserSchema = z.infer<typeof userSchema>;

export const defaultUser: TUserSchema = {
  email: '',
  username: '',
  full_name: '',
};

const fetchUser = async (id: string | undefined): Promise<TUserSchema | null> => {
  if (!id) return null;
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

  if (error) throw new Error(error.message);
  return data as TUserSchema;
};

const saveUser = async ({ id, data }: { id?: string; data: TUserSchema }): Promise<string | null> => {
  if (!id) return null;
  const { error: updateError } = await supabase.from('users').update(data).eq('id', id);
  if (updateError) throw new Error(updateError.message);
  return id;
};

export const useUser = () => {
  const { authUser } = useAuth();
  const {
    data: user,
    error: userLoadingError,
    isLoading: userLoading,
  } = useQuery({
    enabled: !!authUser?.id,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    queryKey: ['user', authUser?.id],
    queryFn: () => fetchUser(authUser?.id),
  });

  const mutation = useMutation({
    mutationFn: saveUser,
  });

  const userSave = async ({ data }: { data: TUserSchema }): Promise<string | null> => {
    return mutation.mutateAsync({ id: authUser?.id, data });
  };

  return {
    user,
    userLoading,
    userLoadingError,
    userSave,
    userSaving: mutation.isPending,
    userSavingError: mutation.error,
  };
};

