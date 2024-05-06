import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useTermsStore } from "../../../../stores/termsStore";
import { useEffect } from "react";

export const EditTermModal = ({ initialValues, isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues: initialValues })
  const { updateTerm } = useTermsStore()

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  const editTermFields = [
    {
      label: 'Term Name',
      name: 'name',
      type: 'select',
      defaultValue: '',
      options: ['Spring', 'Fall'],
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
      label: 'End Date',
      name: 'endDate',
      type: 'date',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
  ];

  async function handleEdit(formData) {
    const payload = {
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
    }
    try {
      const response = await fetch(`${baseUrl}/term/${formData.id}`,
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
      setIsModalOpen(false)
      alert(data.msg)
      updateTerm(data.term)
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
            height: '45%',
            margin: 'auto',
          },
        }}
      >
        <CloseModalButton closeModal={() => setIsModalOpen(false)} />
        <Form fields={editTermFields} title="Edit Term Form" onSubmit={handleSubmit(handleEdit)} />
      </Modal>
    </>
  )
}

