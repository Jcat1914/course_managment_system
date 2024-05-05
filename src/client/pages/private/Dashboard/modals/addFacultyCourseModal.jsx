import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useFacultyStore } from "../../../../stores/facultyStore"
import { useCourses } from "../../../../customHooks/useCourses";
import Select from 'react-select'

export const AddFacultyCourseModal = ({ facultyId, isModalOpen, setIsModalOpen }) => {
  const {
    handleSubmit,
    getValues,
    formState: { errors },
    setValue
  } = useForm()
  const { courses } = useCourses()
  const { professors, addProfessorCourses } = useFacultyStore()
  const professorCourses = professors.find(professor => professor.id === facultyId).courses.map(course => course.id)
  const courseOptions = courses.filter(course => !professorCourses.includes(course.id)).map(course => ({ value: course.id, label: course.name }))

  function handleCourseSelect(selectedCourses) {
    const selections = selectedCourses.map(course => course.value)
    setValue('courses', selections)
  }

  async function handleAdd(formData) {
    console.log(formData)
    try {
      const response = await fetch(`${baseUrl}/faculty/${facultyId}/courses`,
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
      addProfessorCourses({
        facultyId: facultyId,
        courses: data.courses
      })
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

