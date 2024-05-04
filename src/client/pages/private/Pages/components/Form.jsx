import React from 'react';
import InputField from './InputField';

export const Form = ({ onSubmit, fields, title }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 px-24 items-center min-w-full min-h-full">
      <h1>{title}</h1>
      <div className="grid grid-cols-2 gap-y-6 gap-x-8 ">
        {fields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            readOnly={field.readOnly}
            defaultValue={field.value || field.defaultValue}
            options={field.options}
            register={field.register}
            validators={field.validators}
            errors={field.errors}
          />
        ))}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form >
  );
};

