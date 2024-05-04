import React from 'react';
import { Form } from './components/Form';
import { useForm } from 'react-hook-form';
import { BackButton } from './components/BackButton';
import { registerUser } from '../../../services/userService.js'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../stores/userStore.js';

export const AddUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm()
  const navigate = useNavigate()
  const { users, addUser } = useUserStore()
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
      label: 'Email',
      name: 'email',
      type: 'email',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
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
      label: 'Role',
      name: 'role',
      type: 'select',
      defaultValue: 'registrar',
      options: ['admin', 'registrar'],
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
  ];
  const handleAdd = (formData) => {
    registerUser(formData)
      .then((newUser) => {
        console.log(users)
        addUser(newUser.user)
        navigate(-1)
      })
      .catch((error) => {
        console.error('Error adding user:', error.message);
      });
  };

  return (
    <>
      <BackButton />
      <Form fields={addUserFields} title='Add User' onSubmit={handleSubmit(handleAdd)} />
    </>
  );

}
