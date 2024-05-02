import React from 'react';
import { Label } from './Label';

const InputField = ({
  label,
  name,
  type,
  defaultValue,
  register,
  value, // Added value prop
  options,
  validators,
  errors,
}) => {
  if (type === 'select') {
    return (
      <div>
        <Label label={label} name={name} type={type} />
        <select
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          name={name}
          defaultValue={defaultValue}
          {...register(
            name,
            validators.reduce((acc, validator) => {
              const key = Object.keys(validator)[0];
              return { ...acc, [key]: validator[key] };
            }, {})
          )}
        >
          {options && options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors[name] && (
          <span className="text-xs text-red-500">{errors[name].message}</span>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Label label={label} name={name} type={type} />
        <input
          type={type}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          name={name}
          defaultValue={value || defaultValue} // Use value prop if provided, otherwise use defaultValue
          {...register(
            name,
            validators.reduce((acc, validator) => {
              const key = Object.keys(validator)[0];
              return { ...acc, [key]: validator[key] };
            }, {})
          )}
        />
        {errors[name] && (
          <span className="text-xs text-red-500">{errors[name].message}</span>
        )}
      </div>
    );
  }
};

export default InputField;
