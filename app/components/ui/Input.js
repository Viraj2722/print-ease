// export default function Input({ label, type = 'text', placeholder, value, onChange, required = false, className = '' }) {
//     return (
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2 handwriting text-lg">
//           {label}
//         </label>
//         <input
//           type={type}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           required={required}
//           className={`w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${className}`}
//         />
//       </div>
//     );
//   }

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = ''
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-800 mb-2 handwriting">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border-2 border-[#C1C8E4] rounded-xl shadow-sm 
          bg-white/90 placeholder-gray-400 text-gray-900 focus:outline-none 
          focus:ring-2 focus:ring-[#5680E9] focus:border-[#5680E9] transition 
          duration-200 ease-in-out ${className}`}
      />
    </div>
  );
}
