export default function Dropdown({ label, options, value, handleSort }) {
  return (
    <div className="flex items-center gap-2">
      <label>{label}</label>

      <select value={value} onChange={(e) => handleSort(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
