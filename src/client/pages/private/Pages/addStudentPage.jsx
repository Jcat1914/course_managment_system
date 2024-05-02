import React from 'react';
import { Form } from './components/Form';
import { useForm } from 'react-hook-form';
import { BackButton } from './components/BackButton';
import { addUser } from '../../../services/userService.js'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { baseUrl } from '../../../config/api.js'

export const AddStudentPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm()
  const navigate = useNavigate()
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch(`${baseUrl}/country`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data)
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      })
  }, []);

  const addUserFields = [
    {
      label: 'First Name',
      name: 'firstName',
      type: 'text',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Last Name',
      name: 'lastName',
      type: 'text',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Institutional Email',
      name: 'institutionalEmail',
      type: 'email',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Personal Email',
      name: 'personalEmail',
      type: 'email',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Phone Number',
      name: 'phoneNumber',
      type: 'text',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Country',
      name: 'country',
      type: 'select',
      defaultValue: '',
      options: countries,
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Date of Birth',
      name: 'DOB',
      type: 'date',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Gender',
      name: 'gender',
      type: 'select',
      defaultValue: 'Female',
      options: ['Male', 'Female', 'Other'],
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
  ];

  const handleAdd = (formData) => {
    addUser(formData)
      .then((newUser) => {
        console.log('User added successfully:', newUser);
        navigate(-1)
      })
      .catch((error) => {
        console.error('Error adding user:', error.message);
      });
  };

  return (
    <>
      <BackButton />
      <Form fields={addUserFields} onSubmit={handleSubmit(handleAdd)} />
    </>
  );

}
