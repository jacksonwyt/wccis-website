// src/state/formStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { debounce } from 'lodash-es';

interface FormData {
  [key: string]: unknown;
  __timestamp?: number;
  __submitted?: boolean;
}

interface FormStore {
  forms: { [key: string]: FormData };
  setFormData: (formId: string, data: FormData) => void;
  getFormData: (formId: string) => FormData | null;
  clearFormData: (formId: string) => void;
  clearAllForms: () => void;
  clearExpiredForms: () => void;
  markFormAsSubmitted: (formId: string) => void;
  isFormSubmitted: (formId: string) => boolean;
}

// Default expiration time: 24 hours
const FORM_EXPIRATION_MS = 24 * 60 * 60 * 1000;

// Custom storage implementation with size limits and compression
const customStorage = createJSONStorage<Partial<FormStore>>(() => ({
  getItem: (name) => {
    if (typeof window === 'undefined') {
      return null; // localStorage is not available on the server
    }
    try {
      const value = localStorage.getItem(name);
      if (!value) return null;
      
      // Simple size check to prevent excessive storage
      if (value.length > 1024 * 100) { // 100KB limit
        console.warn('Stored form data exceeds size limit, removing.');
        localStorage.removeItem(name);
        return null;
      }
      
      return JSON.parse(value);
    } catch (e) {
      console.error('Error retrieving form data from storage', e);
      return null;
    }
  },
  setItem: (name, value) => {
    if (typeof window === 'undefined') {
      return; // localStorage is not available on the server
    }
    try {
      // Only store essential form data, not the entire state
      const typedValue = value as { state?: { forms?: Record<string, FormData> } };
      if (typeof value === 'object' && value !== null && typedValue.state && typedValue.state.forms) {
        const forms = typedValue.state.forms;
      
        // Filter out any excessively large form data
        const filteredForms: Record<string, FormData> = {};
        let totalSize = 0;
        
        Object.entries(forms).forEach(([key, formData]) => {
          const serialized = JSON.stringify(formData);
          if (serialized.length < 1024 * 10) { // 10KB per form limit
            filteredForms[key] = formData;
            totalSize += serialized.length;
          } else {
             console.warn(`Form data for '${key}' exceeds 10KB limit, skipping storage.`);
          }
          
          // Cap total storage at 100KB
          if (totalSize > 1024 * 100) {
            console.warn('Total stored form data exceeds 100KB limit, stopping further additions.');
            return; // Stop adding more forms
          }
        });
        
        localStorage.setItem(name, JSON.stringify({ state: { forms: filteredForms } }));
      }
    } catch (e) {
      console.error('Error saving form data to storage', e);
    }
  },
  removeItem: (name) => {
     if (typeof window === 'undefined') {
      return; // localStorage is not available on the server
    }
    try {
      localStorage.removeItem(name);
    } catch (e) {
      console.error('Error removing form data from storage', e);
    }
  },
}));

// Create a debounced version of the storage setter
const debouncedSetStorage = debounce(
  (state: FormStore) => {
    // Check if customStorage is defined and we are on the client-side
    if (typeof window !== 'undefined' && customStorage) {
      customStorage.setItem('wccis-form-storage', { state: { forms: state.forms } });
    }
  },
  500, // 500ms debounce
  { maxWait: 2000 } // Maximum wait time of 2 seconds
);

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      forms: {},
      
      setFormData: (formId: string, data: FormData) =>
        set((state: FormStore) => {
          // Don't store excessively large data
          const stringified = JSON.stringify(data);
          if (stringified.length > 1024 * 10) { // 10KB limit per form
            console.warn('Form data too large, truncating');
            return state; // Don't update if too large
          }
          
          // Update the form with new data
          const updatedForms = {
            ...state.forms,
            [formId]: { 
              ...state.forms[formId], 
              ...data, 
              __timestamp: Date.now(),
              __submitted: false, 
            },
          };
          
          // Limit total number of forms to prevent unbounded growth
          // If we have too many forms, keep only the most recent ones
          const MAX_FORMS = 10; // Maximum number of forms to store
          const entries = Object.entries(updatedForms);
          
          if (entries.length > MAX_FORMS) {
            const sortedEntries = entries.sort((a, b) => {
              const timeA = a[1].__timestamp || 0;
              const timeB = b[1].__timestamp || 0;
              return timeB - timeA; // Sort in descending order (newest first)
            });
            
            // Only keep the MAX_FORMS most recent forms
            const limitedForms: { [key: string]: FormData } = {};
            sortedEntries.slice(0, MAX_FORMS).forEach(([key, value]) => {
              limitedForms[key] = value;
            });
            
            return { forms: limitedForms };
          }
          
          return { forms: updatedForms };
        }),
        
      getFormData: (formId: string) => {
        const formData = get().forms[formId];
        
        // Check if form data exists
        if (!formData) {
          return null;
        }
        
        // Check expiration
        const timestamp = formData.__timestamp || 0;
        const now = Date.now();
        
        if (now - timestamp > FORM_EXPIRATION_MS) {
          // Data has expired, clear it
          get().clearFormData(formId);
          return null;
        }
        
        // Check if already submitted
        if (formData.__submitted === true) {
          return null;
        }
        
        return formData;
      },
      
      clearFormData: (formId: string) =>
        set((state: FormStore) => {
          // Using object destructuring to remove the specified form
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [formId]: removed, ...rest } = state.forms;
          return { forms: rest };
        }),
        
      clearAllForms: () => set({ forms: {} }),
      
      clearExpiredForms: () => 
        set((state: FormStore) => {
          const now = Date.now();
          const updatedForms = { ...state.forms };
          let hasChanges = false;
          
          Object.keys(updatedForms).forEach(formId => {
            const formData = updatedForms[formId];
            const timestamp = formData.__timestamp || 0;
            
            if (now - timestamp > FORM_EXPIRATION_MS) {
              delete updatedForms[formId];
              hasChanges = true;
            }
          });
          
          // Only update state if we actually removed something
          return hasChanges ? { forms: updatedForms } : state;
        }),
        
      markFormAsSubmitted: (formId: string) =>
        set((state: FormStore) => {
          if (!state.forms[formId]) {
            return state;
          }
          
          return {
            forms: {
              ...state.forms,
              [formId]: {
                ...state.forms[formId],
                __submitted: true
              }
            }
          };
        }),
        
      isFormSubmitted: (formId: string) => {
        const formData = get().forms[formId];
        return formData ? !!formData.__submitted : false;
      },
    }),
    {
      name: 'wccis-form-storage',
      storage: customStorage,
      partialize: (state) => ({ forms: state.forms }),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            // Clean up on rehydration
            state.clearExpiredForms();
          }
        };
      },
    }
  )
);

// Store references to timers for cleanup
let cleanupTimeoutId: NodeJS.Timeout | null = null;
let cleanupIntervalId: NodeJS.Timeout | null = null;

// Clean up expired forms when the module loads
if (typeof window !== 'undefined') {
  // Only run in browser environment
  cleanupTimeoutId = setTimeout(() => {
    useFormStore.getState().clearExpiredForms();
    cleanupTimeoutId = null;
  }, 1000);
  
  // Set up periodic cleanup
  cleanupIntervalId = setInterval(() => {
    useFormStore.getState().clearExpiredForms();
  }, 60 * 60 * 1000); // Every hour
}

// Export a cleanup function to be called when the app unmounts
export const cleanupFormStore = () => {
  if (cleanupTimeoutId) {
    clearTimeout(cleanupTimeoutId);
    cleanupTimeoutId = null;
  }
  
  if (cleanupIntervalId) {
    clearInterval(cleanupIntervalId);
    cleanupIntervalId = null;
  }
};