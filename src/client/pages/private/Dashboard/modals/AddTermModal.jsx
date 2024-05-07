import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useTermsStore } from "../../../../stores/termsStore";

export const AddTermModal = ({ isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { terms, addTerm } = useTermsStore()
  console.log(terms)

  const addTermFields = [
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

  async function handleAdd(formData) {
    try {
      const response = await fetch(`${baseUrl}/term/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
      const data = await response.json()
      if (data.err) {
        throw new Error(data.err)
      }
      setIsModalOpen(false)
      alert(data.msg)
      console.
        addTerm(data.term)
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
        <Form fields={addTermFields} title="Add Term Form" onSubmit={handleSubmit(handleAdd)} />
      </Modal>
    </>
  )
}

