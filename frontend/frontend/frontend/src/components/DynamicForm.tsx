// frontend/src/components/DynamicForm.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useFormStore } from "@/state/formStore";

interface FormField {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface DynamicFormProps {
  id: string;
  fields: FormField[];
  schema: any;
  onSubmit: (data: any) => void;
  submitLabel?: string;
  persistData?: boolean;
  submitted?: boolean;
  successMessage?: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  id,
  fields,
  schema,
  onSubmit,
  submitLabel = "Submit",
  persistData = false,
  submitted = false,
  successMessage = "Thank you for your submission."
}) => {
  // Initial state with empty values for all fields
  const initialState = Object.fromEntries(
    fields.map(field => [field.name, ""])
  );
  
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getSavedFormData, saveFormData, isFormSubmitted } = useFormStore();
  
  // Check if form was previously submitted
  const wasSubmitted = isFormSubmitted(id) || submitted;
  
  // Load saved data on mount if enabled
  useEffect(() => {
    if (persistData && \!wasSubmitted) {
      const savedData = getSavedFormData(id);
      if (savedData) {
        setFormData(prevData => ({
          ...prevData,
          ...savedData
        }));
      }
    }
  }, [getSavedFormData, id, persistData, wasSubmitted]);
  
  // Save form data on change if persistence is enabled
  useEffect(() => {
    if (persistData && \!wasSubmitted) {
      saveFormData(id, formData);
    }
  }, [formData, id, persistData, saveFormData, wasSubmitted]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  const validateForm = () => {
    try {
      schema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      const fieldErrors = {};
      error.errors.forEach(err => {
        const fieldName = err.path[0];
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        
        // If we get here, submission was successful, reset the form
        if (\!persistData) {
          setFormData(initialState);
        }
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // If the form was previously submitted, show success message
  if (wasSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4 inline-flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Submission Complete</h3>
        <p className="text-gray-600 dark:text-gray-300">{successMessage}</p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => {
        const isRequired = field.required \!== false; // Default to true unless explicitly set to false
        
        return (
          <div key={field.name} className="space-y-2">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {field.label} {isRequired && <span className="text-red-500">*</span>}
            </label>
            
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={isRequired}
                className={`w-full px-3 py-2 border ${
                  errors[field.name]
                    ? "border-red-300 dark:border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                } rounded-md shadow-sm dark:bg-gray-700 dark:text-white`}
                rows={5}
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={isRequired}
                className={`w-full px-3 py-2 border ${
                  errors[field.name]
                    ? "border-red-300 dark:border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                } rounded-md shadow-sm dark:bg-gray-700 dark:text-white`}
              >
                <option value="">{field.placeholder || "Select an option"}</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={isRequired}
                className={`w-full px-3 py-2 border ${
                  errors[field.name]
                    ? "border-red-300 dark:border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                } rounded-md shadow-sm dark:bg-gray-700 dark:text-white`}
              />
            )}
            
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors[field.name]}
              </p>
            )}
          </div>
        );
      })}
      
      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;

