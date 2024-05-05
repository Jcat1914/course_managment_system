import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useFacultyStore } from "../../../../stores/facultyStore"

export const AddFacultyModal = ({ isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { addProfessor, professors } = useFacultyStore()

  const addFacultyFields = [
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
      label: 'Institional Email',
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
  ];

  async function handleAdd(formData) {
    const payload = {
      faculty: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        personalEmail: formData.personalEmail,
        institutionalEmail: formData.institutionalEmail,
        phoneNumber: formData.phoneNumber,
        DOB: formData.DOB
      }
    }
    try {
      const response = await fetch(`${baseUrl}/faculty/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })
      const data = await response.json()
      if (data.err) {
        throw new Error(data.err)
      }
      setIsModalOpen(false)
      alert(data.msg)
      addProfessor(data.faculty)
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
        <Form fields={addFacultyFields} title="Add Faculty Form" onSubmit={handleSubmit(handleAdd)} />
      </Modal>
    </>
  )
}

