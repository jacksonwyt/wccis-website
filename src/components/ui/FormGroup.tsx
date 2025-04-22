// frontend/src/components/ui/FormGroup.tsx
interface FormGroupProps {
  children: React.ReactNode;
  error?: string;
  className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({ children, error, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {children}
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
