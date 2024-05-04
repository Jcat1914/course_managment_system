import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useCountries } from "../../../../customHooks/useCountries";
import { useStudentStore } from "../../../../stores/studentStore";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { modifyStudent } from "../../../../services/studentService";

export const StudentEditForm = ({ initialValues, isModalOpen, setIsModalOpen }) => {
  const { countries } = useCountries()

  delete initialValues.country

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({ defaultValues: initialValues })

  const { updateStudent } = useStudentStore()

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  const addStudentsFields = [
    {
      label: 'Id',
      name: 'id',
      type: 'text',
      defaultValue: '',
      readOnly: true,
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
      name: 'countryId',
      type: 'select',
      options: countries,
      defaultValue: initialValues.countryId,
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
      defaultValue: '',
      options: ['Male', 'Female', 'Other'],
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
  ];

  const handleEditSubmit = async (formData) => {
    modifyStudent(formData)
      .then((newStudent) => {
        if (!newStudent.student) {
          throw new Error('Error modifying student ' + newStudent.err);
        }
        console.log(newStudent.student)
        updateStudent(newStudent.student)
        console.log('Student modify successfully:', newStudent);
        setIsModalOpen(false)
        navigate(-1)
      })
      .catch((error) => {
        console.error(error.message)
      });
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        style={{
          content: {
            width: '70%',
            height: '55%',
            margin: 'auto',
          },
        }}
      >
        <CloseModalButton closeModal={() => setIsModalOpen(false)} />
        <Form fields={addStudentsFields} title="Edit Student Form" onSubmit={handleSubmit(handleEditSubmit)} />
      </Modal>
    </>
  )
}

