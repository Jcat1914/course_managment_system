import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useFacultyStore } from "../../../../stores/facultyStore"
import { convertDayToNum } from "../../../../helpers/dayConversion";

export const EditAvailabilityModal = ({ availability, isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ initialValues: availability })
  const { updateProfessorAvailability, deleteProfessorAvailability, professors } = useFacultyStore()
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const editAvailabiltyFields = [
    {
      label: 'Day',
      name: 'day',
      type: 'select',
      defaultValue: availability.day,
      register: register, // Pass register function directly
      options: days,
      validators: [],
      errors: {},
    },
    {
      label: 'Start time',
      name: 'startTime',
      type: 'time',
      defaultValue: availability.startTime,
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'End Time',
      name: 'endTime',
      type: 'time',
      defaultValue: availability.endTime,
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
  ];

  async function handleAdd(formData) {
    const payload = {
      availability: {
        day: convertDayToNum(formData.day),
        startTime: formData.startTime,
        endTime: formData.endTime,
      }
    }

    try {
      const response = await fetch(`${baseUrl}/faculty/availability/${availability.id}`,
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
      updateProfessorAvailability(availability.facultyId, availability.id, payload.availability)
    } catch (error) {
      console.log(error)
      alert(error.mesaage)
    }
  }
  async function handleDelete() {
    try {
      const response = await fetch(`${baseUrl}/faculty/availability/${availability.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      const data = await response.json()
      deleteProfessorAvailability(availability.facultyId, availability.id,)
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
        <div className="text-center flex flex-col gap-3 items-center ">
          <button onClick={handleDelete} className="bg-red-500 p-1 rounded text-white min-w-28">Delete</button>
          <Form fields={editAvailabiltyFields} title="Edit Availability Form" onSubmit={handleSubmit(handleAdd)} />
        </div>
      </Modal>
    </>
  )
}

