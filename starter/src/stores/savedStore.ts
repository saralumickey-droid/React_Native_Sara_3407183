import { create } from 'zustand';
import { FumigationService } from '../types';

interface SavedStore {
  savedServices: FumigationService[];
  addService: (service: FumigationService) => void;
  removeService: (id: string) => void;
  clearServices: () => void;
}

export const useSavedStore = create<SavedStore>()((set, get) => ({
  savedServices: [],

  addService: (service) => {
    const alreadySaved = get().savedServices.some(
      (item) => item.id === service.id
    );

    if (alreadySaved) return;

    set((state) => ({
      savedServices: [...state.savedServices, service],
    }));
  },

  removeService: (id) => {
    set((state) => ({
      savedServices: state.savedServices.filter(
        (service) => service.id !== id
      ),
    }));
  },

  clearServices: () => {
    set({ savedServices: [] });
  },
}));