import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useCourses } from "../../../../customHooks/useCourses";
import Select from 'react-select'
import { useProgramStore } from "../../../../stores/programStore";

export const AddProgramCoursesModal = ({ programId, isModalOpen, setIsModalOpen }) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const { courses } = useCourses()
  const { programs, updateProgram } = useProgramStore()
  const programCourses = programs.find(program => program.id === programId)
    .courses.map(course => course.id)

  const courseOptions = courses.filter(course => !programCourses.includes(course.id)).map(course => ({ value: course.id, label: course.name }))

  function handleCourseSelect(selectedCourses) {
    const selections = selectedCourses.map(course => course.value)
    setValue('courses', selections)
  }

  async function handleAdd(formData) {
    try {
      const response = await fetch(`${baseUrl}/program/${programId}/courses`,
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
            width: '50%',
            height: ' 60%',
            margin: 'auto',
          },
        }}
      >
        <CloseModalButton closeModal={() => setIsModalOpen(false)} />
        <form onSubmit={handleSubmit(handleAdd)} className="rounded flex flex-col gap-6">
          <label className="place-self-center">Courses</label>
          <Select
            options={courseOptions}
            isMulti
            onChange={handleCourseSelect}
          />
          <button type="submit" className="bg-blue-400 max-w-28 p-2 place-self-center rounded">Submit</button>
        </form>
      </Modal>
    </>
  )
}

