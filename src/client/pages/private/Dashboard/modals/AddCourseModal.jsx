import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useTermsStore } from "../../../../stores/termsStore";
import { useCourseStore } from "../../../../stores/courseStore";

export const AddCourseModal = ({ isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { addCourse } = useCourseStore()

  const addCourseFields = [
    {
      label: 'Course Name',
      name: 'name',
      type: 'text',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Course Level',
      name: 'courseLevel',
      type: 'select',
      options: ['1', '2', '3', '4'],
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Credits',
      name: 'credits',
      type: 'number',
      defaultValue: '',
      register: register,
      validators: [],
      errors: {}
    }
  ];

  async function handleAdd(formData) {
    console.log(formData)
    try {
      const response = await fetch(`${baseUrl}/course/add`,
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
      addCourse(data.course)
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
        <Form fields={addCourseFields} title="Add Courses Form" onSubmit={handleSubmit(handleAdd)} />
      </Modal>
    </>
  )
}

