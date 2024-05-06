import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useBuildingsStore } from "../../../../stores/buildingStore";
import { useEffect } from "react";

export const EditRoomModal = ({ initialValues, isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues: initialValues })

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  const { updateBuildingRooms } = useBuildingsStore()

  const editRoomFields = [
    {
      label: 'Room Code',
      name: 'roomCode',
      type: 'text',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Room Capacity',
      name: 'capacity',
      type: 'number',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Status',
      name: 'status',
      type: 'select',
      options: ['active', 'inactive'],
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
  ];
  async function handleEdit(formData) {
    console.log(formData)
    const payload = {
      roomCode: formData.roomCode,
      capacity: formData.capacity,
      status: formData.status
    }
    try {
      const response = await fetch(`${baseUrl}/room/${formData.id}`,
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
      updateBuildingRooms(formData.buildingId, data.room)
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
        <Form fields={editRoomFields} title="Edit Room Form" onSubmit={handleSubmit(handleEdit)} />
      </Modal>
    </>
  )
}

