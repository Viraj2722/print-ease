export default function Select({ label, options, value, onChange, required = false }) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 handwriting text-lg">
          {label}
        </label>
        <select
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }