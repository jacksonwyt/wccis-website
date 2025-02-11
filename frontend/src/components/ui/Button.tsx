// frontend/src/components/ui/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    isLoading?: boolean;
  }
  
  export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    className = '',
    disabled,
    ...props
  }) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center';
    
    const variantStyles = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-300',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50'
    };
  
    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="animate-spin mr-2">⌛</span>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  };