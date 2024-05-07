
import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { baseUrl } from "../../../../config/api";
import { useEffect } from "react";
import { useCourseStore } from "../../../../stores/courseStore";

export const CourseEditModal = ({ initialValues, isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues: initialValues })

  console.log(initialValues)

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  const { updateCourse } = useCourseStore()

  const editCourseFields = [
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
  async function handleEdit(formData) {
    const payload = {
      name: formData.name,
      description: formData.description,
      courseLevel: formData.courseLevel,
      credits: formData.credits
    }
    try {
      const response = await fetch(`${baseUrl}/course/${formData.id}`,
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
      updateCourse(data.course)
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
        <Form fields={editCourseFields} title="Edit Course Form" onSubmit={handleSubmit(handleEdit)} />
      </Modal>
    </>
  )
}

