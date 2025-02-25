// src/state/formStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FormData {
  [key: string]: unknown;
}

interface FormStore {
  forms: { [key: string]: FormData };
  setFormData: (formId: string, data: FormData) => void;
  getFormData: (formId: string) => FormData | null;
  clearFormData: (formId: string) => void;
  clearAllForms: () => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      forms: {},
      setFormData: (formId: string, data: FormData) =>
        set((state: FormStore) => ({
          forms: {
            ...state.forms,
            [formId]: { ...state.forms[formId], ...data },
          },
        })),
      getFormData: (formId: string) => get().forms[formId] || null,
      clearFormData: (formId: string) =>
        set((state: FormStore) => {
          // Using object destructuring to remove the specified form
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [formId]: removed, ...rest } = state.forms;
          return { forms: rest };
        }),
      clearAllForms: () => set({ forms: {} }),
    }),
    {
      name: 'wccis-form-storage',
    }
  )
);