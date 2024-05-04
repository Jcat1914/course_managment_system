
import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { usePrograms } from "../../../../customHooks/usePrograms";
import { baseUrl } from "../../../../config/api";


export const AddEnrollmentModal = ({ studentId, isModalOpen, setIsModalOpen }) => {
  const { programs } = usePrograms()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm()

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
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Graduation Date',
      name: 'graduationDate',
      type: 'date',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
  ];

  async function handleAdd(formData) {
    try {
      const response = await fetch(`${baseUrl}/student/enrollment/add/${studentId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
      const data = await response.json()
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
            width: '70%',
            height: '55%',
            margin: 'auto',
          },
        }}
      >
        <CloseModalButton closeModal={() => setIsModalOpen(false)} />
        <Form fields={addEnrollmentFields} title="Add Enrollment Form" onSubmit={handleSubmit(handleAdd)} />
      </Modal>
    </>
  )
}

