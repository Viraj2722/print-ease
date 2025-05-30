export default function Button({ children, type = 'button', onClick, disabled = false, variant = 'primary', className = '' }) {
    const baseClasses = 'w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4';
    
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300',
      outline: 'border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 bg-white focus:ring-blue-300',
    };
    
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed transform-none' : ''} ${className}`}
      >
        {children}
      </button>
    );
  }