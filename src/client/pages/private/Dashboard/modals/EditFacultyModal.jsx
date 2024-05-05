import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useEffect } from "react";
import { useFacultyStore } from "../../../../stores/facultyStore";

export const EditFacultyModal = ({ initialValues, isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ initialValues })

  const { updateProfessor } = useFacultyStore()

  useEffect(() => {
    reset(initialValues)
  }, [initialValues])

  const editFacultyFields = [
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
      label: 'Personal Email',
      name: 'personalEmail',
      type: 'email',
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
      label: 'Phone Number',
      name: 'phoneNumber',
      type: 'text',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'DOB',
      name: 'DOB',
      type: 'date',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Status',
      name: 'status',
      type: 'select',
      defaultValue: '',
      options: ['active', 'inactive'],
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
  ];

  async function handleEdit(formData) {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      personalEmail: formData.personalEmail,
      institutionalEmail: formData.institutionalEmail,
      phoneNumber: formData.phoneNumber,
      DOB: formData.DOB,
      status: formData.status
    }

    try {
      const response = await fetch(`${baseUrl}/faculty/${initialValues.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })
      const data = await response.json()
      updateProfessor(data.faculty)
      setIsModalOpen(false)
      alert(data.msg)
    } catch (error) {
      console.log(error)
      alert(error.mesaage)
    }
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        style={{
          content: {
            width: '50%',
            height: ' 60%',
            margin: 'auto',
          },
        }}
      >
        <CloseModalButton closeModal={() => setIsModalOpen(false)} />
        <Form fields={editFacultyFields} title="Add Faculty Form" onSubmit={handleSubmit(handleEdit)} />
      </Modal>
    </>
  )
}

