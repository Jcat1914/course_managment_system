import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useFacultyStore } from "../../../../stores/facultyStore"
import { convertDayToNum } from "../../../../helpers/dayConversion";
import Select from 'react-select'
export const AddAvailabilityModal = ({ actions, professorId, isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const { addProfessorAvailability, professors } = useFacultyStore()
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  function handleDaySelect(selected) {
    const selections = selected.map(day => day.value)
    setValue('days', selections)
  }

  async function handleAdd(formData) {
    const payload = []
    for (let day of formData.days) {
      payload.push({
        day: day,
        startTime: formData.startTime,
        endTime: formData.endTime,
      })
    }
    try {
      const response = await fetch(`${baseUrl}/faculty/${professorId}/availability`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ availability: payload })
        })
      const data = await response.json()
      if (data.err) {
        throw new Error(data.err)
      }
      setIsModalOpen(false)
      alert(data.msg)
      actions(false)
      addProfessorAvailability(data)
      console.log(professors)
    } catch (error) {
      console.log(error)
      alert(error.mesaage)
    }
  }
  const dayOptions = days.map(day => {
    return { value: convertDayToNum(day), label: day }
  })

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        style={{
          content: {
            width: '45%',
            height: '50%',
            margin: 'auto',
          },
        }}
      >
        <CloseModalButton closeModal={() => setIsModalOpen(false)} />
        <form onSubmit={handleSubmit(handleAdd)} className="rounded flex flex-col gap-3">
          <label>Day</label>
          <Select
            options={dayOptions}
            isMulti
            onChange={handleDaySelect}
          />
          <label>Start Time</label>
          <input {...register('startTime')} type="time" className='' name="startTime" />
          <label>End Time</label>
          <input {...register('endTime')} type="time" />
          <button type="submit" className="bg-blue-400 max-w-28 p-2 place-self-center rounded">Submit</button>
        </form>
      </Modal>
    </>
  )
}

