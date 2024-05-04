import React from 'react';
import { Form } from './components/Form';
import { useForm } from 'react-hook-form';
import { BackButton } from './components/BackButton';
import { useNavigate } from 'react-router-dom';
import { useCountries } from '../../../customHooks/useCountries.js';
import { usePrograms } from '../../../customHooks/usePrograms.js';
import { addStudent } from '../../../services/studentService.js';

export const AddStudentPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const navigate = useNavigate()
  const { programs } = usePrograms()

  const { countries } = useCountries()


  const addStudentsFields = [
    {
      label: 'Id',
      name: 'id',
      type: 'text',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
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

  const addEnrollmentFields = [
    {
      label: 'Program',
      name: 'programId',
      type: 'select',
      defaultValue: '',
      options: programs,
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Start Date',
      name: 'startDate',
      type: 'date',
      defaultValue: '2023-09-01',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Graduation Date',
      name: 'graduationDate',
      type: 'date',
      defaultValue: '2027-05-30',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
  ]

  const handleAdd = (formData) => {

    const enrollmentData = {
      programId: parseInt(formData.programId),
      startDate: formData.startDate,
      graduationDate: formData.graduationDate,
    }
    console.log('enrollmentData', enrollmentData)
    const studentData = {
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      institutionalEmail: formData.institutionalEmail,
      personalEmail: formData.personalEmail,
      phoneNumber: formData.phoneNumber,
      countryId: parseInt(formData.country),
      DOB: formData.DOB,
      gender: formData.gender
    }

    addStudent({ student: studentData, enrollment: enrollmentData })
      .then((newStudent) => {
        if (newStudent.error) {
          console.error('Error adding student:', newStudent.error);
          return
        }
        console.log('Student added successfully:', newStudent);
        navigate(-1)
      })
      .catch((error) => {
        console.error('Error adding student:', error.message);
      });
  };

  return (
    <>
      <BackButton />
      <Form fields={addStudentsFields} title="Add Student Form" onSubmit={handleAdd} />
      <Form fields={addEnrollmentFields} title="Add Enrollment Form" onSubmit={handleSubmit(handleAdd)} />
    </>
  );

}
