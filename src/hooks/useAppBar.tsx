import { ReactElement } from 'react';
import { create } from 'zustand';
import { setDocumentTitle } from '../utils';

export type Tab = {
  name: string;
  title: string;
  count?: number;
  icon?: ReactElement;
};

type AppBarStore = {
  title: string;
  tabs?: Tab[];
  setTitle: (string: string) => void;
  setTabs: (tabs: Tab[]) => void;
};

const useAppBar = create<AppBarStore>((set) => {
  return {
    title: '',
    tabs: undefined,
    setTitle: (title: string) => {
      set({ title: title });
      setDocumentTitle(title);
    },
    setTabs: (tabs: Tab[]) => {
      set({ tabs: tabs });
    },
  };
});

export default useAppBar;
