// export default function Button({ children, type = 'button', onClick, disabled = false, variant = 'primary', className = '' }) {
//     const baseClasses = 'w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4';
    
//     const variants = {
//       primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300',
//       outline: 'border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 bg-white focus:ring-blue-300',
//     };
    
//     return (
//       <button
//         type={type}
//         onClick={onClick}
//         disabled={disabled}
//         className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed transform-none' : ''} ${className}`}
//       >
//         {children}
//       </button>
//     );
//   }

export default function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  variant = 'primary',
  className = ''
}) {
  const baseClasses =
    'w-full py-3 px-4 rounded-2xl font-semibold text-base transition-all duration-200 transform focus:outline-none focus:ring-4';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#5680E9] to-[#84CEEB] text-white hover:from-[#5AB9EA] hover:to-[#5680E9] focus:ring-[#84CEEB]',
    outline:
      'bg-white border-2 border-[#C1C8E4] text-gray-800 hover:border-[#5680E9] hover:text-[#5680E9] focus:ring-[#C1C8E4]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed transform-none' : 'hover:scale-[1.03]'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

