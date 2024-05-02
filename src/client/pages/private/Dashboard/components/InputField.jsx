import React from 'react'
const InputField = ({
  label,
  name,
  type,
  defaultValue,
  register,
  validators,
  errors,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        name={name}
        defaultValue={defaultValue}
        {...register(
          name,
          validators.reduce((acc, validator) => {
            const key = Object.keys(validator)[0]
            return { ...acc, [key]: validator[key] }
          }, {})
        )}
      />
      {errors[name] && (
        <span className="text-xs text-red-500">
          {errors[name].message}
        </span>
      )}
    </div>
  )
}

export default InputField
