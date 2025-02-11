// frontend/src/components/ui/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'white';
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
    const baseStyles = `
      relative
      px-4 py-2
      rounded-lg
      font-medium
      transition-all
      duration-300
      flex items-center 
      justify-center
      overflow-hidden
      group
      disabled:cursor-not-allowed
      disabled:opacity-50
    `;
    
    const variantStyles = {
      primary: `
        bg-blue-600 
        text-white
        hover:bg-blue-700
        hover:shadow-lg
        hover:scale-[1.02]
        before:absolute
        before:content-['']
        before:bg-blue-400
        before:top-1/2
        before:left-1/2
        before:-translate-x-1/2
        before:-translate-y-1/2
        before:w-0
        before:h-0
        before:rounded-full
        before:opacity-0
        before:transition-all
        before:duration-500
        hover:before:w-[300px]
        hover:before:h-[300px]
        hover:before:opacity-20
      `,
      secondary: `
        bg-gray-600 
        text-white
        hover:bg-gray-700
        hover:shadow-lg
        hover:scale-[1.02]
        before:absolute
        before:content-['']
        before:bg-gray-400
        before:top-1/2
        before:left-1/2
        before:-translate-x-1/2
        before:-translate-y-1/2
        before:w-0
        before:h-0
        before:rounded-full
        before:opacity-0
        before:transition-all
        before:duration-500
        hover:before:w-[300px]
        hover:before:h-[300px]
        hover:before:opacity-20
      `,
      outline: `
        border-2
        border-blue-600
        text-blue-600
        hover:bg-blue-50
        hover:shadow-lg
        hover:scale-[1.02]
        before:absolute
        before:content-['']
        before:bg-blue-100
        before:top-1/2
        before:left-1/2
        before:-translate-x-1/2
        before:-translate-y-1/2
        before:w-0
        before:h-0
        before:rounded-full
        before:opacity-0
        before:transition-all
        before:duration-500
        hover:before:w-[300px]
        hover:before:h-[300px]
        hover:before:opacity-50
      `,
      white: `
        bg-white
        text-blue-900
        hover:bg-blue-50
        hover:shadow-lg
        hover:scale-[1.02]
        before:absolute
        before:content-['']
        before:bg-blue-100
        before:top-1/2
        before:left-1/2
        before:-translate-x-1/2
        before:-translate-y-1/2
        before:w-0
        before:h-0
        before:rounded-full
        before:opacity-0
        before:transition-all
        before:duration-500
        hover:before:w-[300px]
        hover:before:h-[300px]
        hover:before:opacity-50
      `,
    };
  
    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        <span className="relative z-10">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-t-2 border-b-2 border-current rounded-full animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            children
          )}
        </span>
      </button>
    );
  };