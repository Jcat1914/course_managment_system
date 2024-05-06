import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useBuildingsStore } from "../../../../stores/buildingStore";

export const AddRoomModal = ({ buildingId, isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { addBuildingRooms } = useBuildingsStore()

  const addRoomFields = [
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
  ];
  async function handleAdd(formData) {
    console.log(formData)
    const payload = {
      room: {
        roomCode: formData.roomCode,
        capacity: formData.capacity,
        status: formData.status
      }
    }
    try {
      const response = await fetch(`${baseUrl}/building/${buildingId}/add-room`,
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
      addBuildingRooms(buildingId, data.newRoom)
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
        <Form fields={addRoomFields} title="Add Room Form" onSubmit={handleSubmit(handleAdd)} />
      </Modal>
    </>
  )
}

