import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useProgramStore } from "../../../../stores/programStore";
import { useEffect } from "react";
export const EditProgramModal = ({ initialValues, isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValues })

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  const { updateProgram } = useProgramStore()

  const editProgramFields = [
    {
      label: 'Program Name',
      name: 'name',
      type: 'text',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Required Credits',
      name: 'requiredCredits',
      type: 'number',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Degree Level',
      name: 'degreeLevel',
      type: 'select',
      defaultValue: 'Associate',
      register: register, // Pass register function directly
      validators: [],
      options: ['Associate', 'Bachelor', 'Master', 'Doctorate'],
      errors: {},
    },
    {
      label: 'Status',
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      register: register, // Pass register function directly
      validators: [],
      options: ['active', 'inactive'],
      errors: {},
    },
  ];

  async function handleEdit(formData) {
    const payload = {
      name: formData.name,
      description: formData.description,
      requiredCredits: formData.requiredCredits,
      degreeLevel: formData.degreeLevel,
      status: formData.status
    }
    console.log(payload)
    try {
      const response = await fetch(`${baseUrl}/program/${formData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })
      const data = await response.json()
      if (data.err) {
        throw new Error(data.err)
      }
      console.log(data.newProgram)
      setIsModalOpen(false)
      alert(data.msg)
      updateProgram(data.program)
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
            width: '60%',
            height: '70%',
            margin: 'auto',
          },
        }}
      >
        <CloseModalButton closeModal={() => setIsModalOpen(false)} />
        <Form fields={editProgramFields} title="Add Building Form" onSubmit={handleSubmit(handleEdit)} />
      </Modal>
    </>
  )
}

