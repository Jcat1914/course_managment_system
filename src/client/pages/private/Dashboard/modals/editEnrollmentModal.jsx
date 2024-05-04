
import Modal from "react-modal";
import { Form } from "../../Pages/components/Form";
import { useForm } from "react-hook-form";
import { CloseModalButton } from "../../../../component/closeModalButton";
import { usePrograms } from "../../../../customHooks/usePrograms";
import { baseUrl } from "../../../../config/api";
import { useProgramStore } from "../../../../stores/programStore";
import { useEffect } from "react";

export const EditEnrollmentModal = ({ enrollmentInfo, isModalOpen, setIsModalOpen }) => {
  const { programs } = useProgramStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: enrollmentInfo })

  useEffect(() => {
    reset(enrollmentInfo)
  }, [enrollmentInfo, reset])

  const editEnrollmentFields = [
    {
      label: 'Program',
      name: 'programId',
      type: 'select',
      defaultValue: '',
      options: programs,
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Start Date',
      name: 'startDate',
      type: 'date',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Graduation Date',
      name: 'graduationDate',
      type: 'date',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Status',
      name: 'status',
      type: 'select',
      defaultValue: '',
      options: ['active', 'graduated', 'drop'],
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Credits',
      name: 'credits',
      type: 'number',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    },
    {
      label: 'Cumulative GPA',
      name: 'cumulativeGPA',
      type: 'number',
      defaultValue: '',
      register: register, // Pass register function directly
      validators: [],
      errors: {},
    }
  ];

  async function handleEdit(formData) {
    delete formData.program
    try {
      const response = await fetch(`${baseUrl}/student/enrollment/${enrollmentInfo.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
      const data = await response.json()
      alert(data.msg)
      setIsModalOpen(false)
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
            width: '70%',
            height: '55%',
            margin: 'auto',
          },
        }}
      >
        <CloseModalButton closeModal={() => setIsModalOpen(false)} />
        <Form fields={editEnrollmentFields} title="Edit Enrollment Form" onSubmit={handleSubmit(handleEdit)} />
      </Modal>
    </>
  )
}

