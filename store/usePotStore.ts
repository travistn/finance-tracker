import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { PotType } from '@/types';

interface PotStore {
  pots: PotType[];
  createPot: (newPot: PotType) => Promise<void>;
}

export const usePotStore = create<PotStore>()(
  persist(
    (set) => ({
      pots: [],

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
