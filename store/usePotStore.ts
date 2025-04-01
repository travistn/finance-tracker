import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { PotType, ColorType } from '@/types';

interface PotStore {
  pots: PotType[];
  colors: ColorType[];
  fetchPots: () => Promise<void>;
  createPot: (newPot: PotType) => Promise<void>;
  editPot: (id: string, updatedPot: Partial<PotType>) => Promise<void>;
  deletePot: (id: string) => Promise<void>;
}

export const usePotStore = create<PotStore>()(
  persist(
    (set) => ({
      pots: [],

      colors: [
        { name: 'green', used: false },
        { name: 'yellow', used: false },
        { name: 'cyan', used: false },
        { name: 'navy', used: false },
        { name: 'red', used: false },
        { name: 'purple', used: false },
        { name: 'turquoise', used: false },
        { name: 'orange', used: false },
        { name: 'blue', used: false },
        { name: 'magenta', used: false },
      ],

      fetchPots: async () => {
        try {
          const response = await fetch('/api/pot', {
            method: 'GET',
          });
          const data = await response.json();
          set({ pots: data });

          set((state) => {
            const updatedColors = state.colors.map((color) => {
              const isUsed = state.pots.some((pot) => pot.theme === color.name);
              return { ...color, used: isUsed };
            });
            return { colors: updatedColors };
          });
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

      editPot: async (id, updatedPot) => {
        try {
          const response = await fetch(`/api/pot/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, ...updatedPot }),
          });

          if (response.ok) {
            const updatedPot = await response.json();

            set((state) => ({
              pots: state.pots.map((b) => (b._id === id ? { ...b, ...updatedPot } : b)),
            }));

            setTimeout(() => {
              window.location.reload();
            }, 300);
          }
        } catch (error) {
          console.error;
        }
      },

      deletePot: async (id) => {
        try {
          const response = await fetch(`/api/pot/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
          });

          if (response.ok) {
            set((state) => ({
              pots: state.pots.filter((b) => b._id !== id),
            }));

            setTimeout(() => {
              window.location.reload();
            }, 300);
          }
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
