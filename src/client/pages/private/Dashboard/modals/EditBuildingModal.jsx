import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useBuildingsStore } from "../../../../stores/buildingStore";
import { useEffect } from "react";

export const EditBuildingModal = ({ initialValues, isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValues })

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  const { updateBuildings } = useBuildingsStore()

  const editBuildingFields = [
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

  async function handleEdit(formData) {
    const payload = {
      name: formData.name,
    }
    try {
      const response = await fetch(`${baseUrl}/building/${formData.id}`,
        {
          method: 'PUT',
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
      updateBuildings(data.building)
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
        <Form fields={editBuildingFields} title="Edit Building Form" onSubmit={handleSubmit(handleEdit)} />
      </Modal>
    </>
  )
}

