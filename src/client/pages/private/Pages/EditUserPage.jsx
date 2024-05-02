
import React from 'react';
import { Form } from './components/Form';
import { useForm } from 'react-hook-form';
import { BackButton } from './components/BackButton';
import { modifyUser } from '../../../services/userService.js'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../stores/userStore.js';
import { useParams } from 'react-router-dom';

export const EditUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm()

  const { users } = useUserStore()

  const { id } = useParams()
  console.log(users.users)

  const getUserById = (id) => {
    return users.users.find((user) => user.id == id)
  }

  const user = getUserById(id)
  console.log(user)
  const { updateUser } = useUserStore()


  const navigate = useNavigate()
  const editUserFields = [
    {
      name: 'id',
      type: 'hidden',
      defaultvalue: '',
      register: register, // pass register function directly
      value: user.id,
      validators: [],
      errors: {},
    },
    {
      label: 'first name',
      name: 'firstName',
      type: 'text',
      defaultvalue: '',
      value: user.firstName,
      register: register, // pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Last Name',
      name: 'lastName',
      type: 'text',
      defaultValue: '',
      value: user.lastName,
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      defaultValue: '',
      value: user.email,
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Phone Number',
      name: 'phoneNumber',
      type: 'text',
      defaultValue: '',
      value: user.phoneNumber,
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Role',
      name: 'role',
      type: 'select',
      defaultValue: 'registrar',
      value: user.role,
      options: ['admin', 'registrar'],
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
  ];
  const handleEdit = (formData) => {
    modifyUser(formData)
      .then((updateUser) => {
        updateUser(updateUser)
        navigate(-2)
      })
      .catch((error) => {
        console.error('Error adding user:', error.message);
      });
  };

  return (
    <>
      <BackButton />
      <Form fields={editUserFields} onSubmit={handleSubmit(handleEdit)} />
    </>
  );

}
