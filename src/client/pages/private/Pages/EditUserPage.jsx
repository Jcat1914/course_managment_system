
import React from 'react';
import { Form } from './components/Form.jsx'
import { useForm } from 'react-hook-form';
import { BackButton } from './components/BackButton.jsx'
import { modifyUser } from '../../../services/userService.js'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../stores/userStore.js';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../../config/api.js';

export const EditUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm()

  const { users, updateUser } = useUserStore()

  const { id } = useParams()
  console.log(users.users)

  const getUserById = (id) => {
    return users.find((user) => user.id == id)
  }

  const user = getUserById(id)
  console.log(user)

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
      .then((updatedUser) => {
        updateUser(updatedUser)
        navigate(-1)
      })
      .catch((error) => {
        console.error('Error adding user:', error.message);
      });
  };

  async function destroyUser(id) {
    try {
      const response = await fetch(`${baseUrl}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (data.err) {
        throw new Error(data.err)
      }
      navigate(-2)
      console.log(users)

    } catch (error) {
      console.log(error)
      alert('An error occurred, please try again')
    }
  }

  return (
    <>
      <BackButton />
      <article className='flex flex-col justify-center items-center'>
        <button onClick={() => destroyUser(id)}
          className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'>Delete User</button>
        <Form fields={editUserFields} onSubmit={handleSubmit(handleEdit)} />
      </article >
    </>
  );

}
