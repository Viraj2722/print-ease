export default function Input({ label, type = 'text', placeholder, value, onChange, required = false, className = '' }) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 handwriting text-lg">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${className}`}
        />
      </div>
    );
  }