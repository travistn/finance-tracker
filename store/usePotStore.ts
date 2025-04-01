import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { PotType } from '@/types';

interface PotStore {
  pots: PotType[];
  fetchPots: () => Promise<void>;
  createPot: (newPot: PotType) => Promise<void>;
}

export const usePotStore = create<PotStore>()(
  persist(
    (set) => ({
      pots: [],

      fetchPots: async () => {
        try {
          const response = await fetch('/api/pot', {
            method: 'GET',
          });
          const data = await response.json();
          set({ pots: data });
        } catch (error) {
          console.error(error);
        }
      },

      createPot: async (pot) => {
        try {
          await fetch('/api/pot', {
            method: 'POST',
            body: JSON.stringify({ pot }),
          });

          setTimeout(() => {
            window.location.reload();
          }, 300);
        } catch (error) {
          console.error;
        }
      },
    }),
    {
      name: 'pots-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
