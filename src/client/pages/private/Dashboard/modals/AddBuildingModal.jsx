import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useBuildingsStore } from "../../../../stores/buildingStore";

export const AddBuildingModal = ({ isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { addBuilding } = useBuildingsStore()

  const addBuildingFields = [
    {
      label: 'Building Name',
      name: 'name',
      type: 'text',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
  ];

  async function handleAdd(formData) {
    console.log(formData)
    try {
      const response = await fetch(`${baseUrl}/building/add`,
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
      addBuilding(data.building)
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
        <Form fields={addBuildingFields} title="Add Building Form" onSubmit={handleSubmit(handleAdd)} />
      </Modal>
    </>
  )
}

