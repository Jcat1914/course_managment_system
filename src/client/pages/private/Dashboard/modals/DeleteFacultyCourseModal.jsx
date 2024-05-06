import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../../../config/api";

export const DeleteFacultyCourseModal = ({ values, isModalOpen, setIsModalOpen }) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()


  async function deleteCourse() {
    try {
      const response = await fetch(`${baseUrl}/faculty/${values.facultyCourses.facultyId}/course/${values.id}`,
        {
          method: 'DELETE',
        })
      const data = await response.json()
      if (data.err) {
        throw new Error(data.err)
      }
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
            height: ' 20%',
            margin: 'auto',
          },
        }}
      >
        <form className="flex flex-col items-center justify-items-center gap-8">
          <label>Do you want to Delete this course?</label>
          <div className="flex gap-6">
            <button className='bg-red-500 p-2 text-white font-bold rounded' type="submit" onClick={deleteCourse}>Delete</button>
            <button type="button" className="bg-blue-500 p-2 text-white rounded font-bold" onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

