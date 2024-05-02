export const Label = ({ label, name, type }) => {
  if (type === 'hidden') {
    return null; // Don't render the label for hidden inputs
  }
  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
  );
};
