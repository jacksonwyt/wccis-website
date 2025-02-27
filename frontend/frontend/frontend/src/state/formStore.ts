// frontend/src/state/formStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormStore {
  // Store form data for persistence between visits/refreshes
  formData: Record<string, Record<string, any>>;
  
  // Track which forms have been successfully submitted
  submittedForms: string[];
  
  // Save form data for a given form ID
  saveFormData: (formId: string, data: Record<string, any>) => void;
  
  // Get saved form data for a given form ID
  getSavedFormData: (formId: string) => Record<string, any> | null;
  
  // Mark a form as having been successfully submitted
  markFormAsSubmitted: (formId: string) => void;
  
  // Check if a form has been submitted
  isFormSubmitted: (formId: string) => boolean;
  
  // Clear a specific form data
  clearFormData: (formId: string) => void;
  
  // Clear all form data
  clearAllFormData: () => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      formData: {},
      submittedForms: [],
      
      saveFormData: (formId, data) => {
        set((state) => ({
          formData: {
            ...state.formData,
            [formId]: data,
          },
        }));
      },
      
      getSavedFormData: (formId) => {
        const state = get();
        return state.formData[formId] || null;
      },
      
      markFormAsSubmitted: (formId) => {
        set((state) => ({
          submittedForms: [...state.submittedForms, formId],
        }));
      },
      
      isFormSubmitted: (formId) => {
        const state = get();
        return state.submittedForms.includes(formId);
      },
      
      clearFormData: (formId) => {
        set((state) => {
          const newFormData = { ...state.formData };
          delete newFormData[formId];
          
          return {
            formData: newFormData,
          };
        });
      },
      
      clearAllFormData: () => {
        set({
          formData: {},
          submittedForms: [],
        });
      },
    }),
    {
      name: "wccis-form-storage",
    }
  )
);

