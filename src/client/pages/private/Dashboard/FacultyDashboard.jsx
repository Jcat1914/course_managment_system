import React from 'react';
import { DashboardContent } from '../../../component/DashboardContent/DashboardContent';
import { AddButton } from './components/AddButton';
import { useFaculties } from '../../../customHooks/useFaculties';
import { Table } from '../../../component/Table/Table';
import { useFacultyStore } from '../../../stores/facultyStore';
import { useState } from 'react';
import { AddFacultyModal } from './modals/AddFacultyModal';
import { EditFacultyModal } from './modals/EditFacultyModal';
import { convertNumToDay } from '../../../helpers/dayConversion'
import { AddAvailabilityModal } from './modals/addAvailabilityModal';
import { AddFacultyCourseModal } from './modals/addFacultyCourseModal';
import { EditAvailabilityModal } from './modals/editAvailabilityModal';
import { DeleteFacultyCourseModal } from './modals/DeleteFacultyCourseModal';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner'
import { baseUrl } from '../../../config/api';
export const FacultyDashboard = () => {

  const { loading } = useFaculties();
  const { professors } = useFacultyStore()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [openDeleteCourseModal, setOpenDeleteCourseModal] = useState(false)
  const [selectedProfessor, setSelectedProfessor] = useState(null)
  const [openEditAvailabilityModal, setOpenEditAvailabilityModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState({})
  const [availability, setAvailability] = useState({})

  function updateProfessor() {
    if (!selectedProfessor?.id) return
    const newSelectedProfessor = professors.find(professor => professor.id === selectedProfessor.id)
    setSelectedProfessor(newSelectedProfessor)
  }
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }
  const handleSubmitFile = async (event) => {
    event.preventDefault()

    if (!file) {
      alert('Please select a file to upload')
      return
    }

    const loadingToastId = toast.loading('Uploading file...')

    const formDataFile = new FormData()
    formDataFile.append('file', file) // 'file' is the name of the field that the server expects

    try {
      const response = await fetch(`${baseUrl}/faculty/add-from-excel`, {
        method: 'POST',
        body: formDataFile,
      })

      const data = await response.json()

      toast.dismiss(loadingToastId)

      // Define the promise function that resolves after successful upload
      const promise = () => new Promise((resolve) => resolve(data))

      // Use toast.promise to handle the success and error states
      toast.promise(promise, {
        success: () => {
          setProfessor([...professors, ...data.createdFaculty])
          return 'Faculty added successfully'
        },
        error: (err) => {
          console.error('Error:', err)
          return 'Error adding users'
        },
      })
    } catch (error) {
      console.error('Error sending the request:', error)
      toast.error('Error sending the file. Please try again')
    }
  }

  useEffect(() => {
    updateProfessor()
  }, [professors])

  function openAddModal(e) {
    e.preventDefault();
    showActions && setShowActions(false);
    setIsAddModalOpen(true);
  }
  function showAvailabilityModal(e) {
    e.preventDefault();
    setAvailabilityModalOpen(true)
  }

  function openEditModal(e) {
    e.preventDefault();
    setIsEditModalOpen(true)
  }

  function openActions(e) {
    setShowActions(true);
    setSelectedProfessor(e)
  }
  function handleAvailabilityEdit(availability) {
    setAvailability(availability)
    setOpenEditAvailabilityModal(true)
  }

  function handleCourseEdit(course) {
    console.log(course)
    setSelectedCourse(course)
    setOpenDeleteCourseModal(true)
  }

  function openAddCourseModal(e) {
    e.preventDefault();
    setIsAddCourseModalOpen(true)
  }

  return (
    <DashboardContent viewName="Manage Faculty">
      <section className="flex items-center flex-col gap-3">
        <form onSubmit={handleSubmitFile}>
          <div className="ml-5 flex items-center ">
            <input
              type="file"
              name="file"
              accept=".xlsx"
              className="w-[23rem]  text-sm"
              onChange={handleFileChange}
            />
            <button
              type="submit"
              className="m-4 w-20 rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 "
            >
              Import
            </button>
          </div>
        </form>
        <AddButton onClick={openAddModal} />
        <AddFacultyModal isModalOpen={isAddModalOpen} setIsModalOpen={setIsAddModalOpen} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Table columns={[
              { key: 'id', label: 'ID' },
              { key: 'firstName', label: 'First Name' },
              { key: 'lastName', label: 'Last Name' },
              { key: 'personalEmail', label: 'personalEmail' },
              { key: 'institutionalEmail', label: 'institutionalEmail' },
              { key: 'phoneNumber', label: 'Phone Number' },
              { key: 'DOB', label: 'DOB' },
              { key: 'status', label: 'Status' }
            ]}
              data={professors}
              title={'Professors'}
              onRowClick={openActions} />
          </>
        )}
        {
          showActions && (
            <article className='flex flex-col items-center'>
              <AddAvailabilityModal
                actions={setShowActions}
                professorId={selectedProfessor.id} isModalOpen={availabilityModalOpen} setIsModalOpen={setAvailabilityModalOpen} />
              <AddFacultyCourseModal facultyId={selectedProfessor.id} isModalOpen={isAddCourseModalOpen} setIsModalOpen={setIsAddCourseModalOpen} />
              <DeleteFacultyCourseModal values={selectedCourse} isModalOpen={openDeleteCourseModal} setIsModalOpen={setOpenDeleteCourseModal} />
              <EditFacultyModal initialValues={selectedProfessor} isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} />
              <h2 className='font-bold text-lg'>Actions</h2>
              <div className='flex p-2 gap-3'>
                {selectedProfessor.status === 'inactive' ? (
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={openEditModal}>Edit</button>
                ) : (
                  <>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={openEditModal}>Edit</button>
                    <button className='bg-slate-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={showAvailabilityModal}>Add Availability</button>
                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={openAddCourseModal}>Add Courses</button>
                  </>
                )}
              </div>
              <div className='grid grid-cols-2 gap-3 w-30'>
                <article className='bg-white'>
                  <table>
                    <caption>Professor Availability</caption>
                    <thead>
                      <th>Day</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                    </thead>
                    <tbody>
                      {
                        selectedProfessor?.facultyAvailabilities?.map(availability => (
                          <tr onClick={() => handleAvailabilityEdit(availability)}>
                            <th>{convertNumToDay(availability.day)}</th>
                            <th>{availability.startTime}</th>
                            <th>{availability.endTime}</th>
                            <th>{availability.available}</th>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                  <EditAvailabilityModal availability={availability} setIsModalOpen={setOpenEditAvailabilityModal} isModalOpen={openEditAvailabilityModal} />
                </article>
                <article className='bg-white'>
                  <table>
                    <caption>Professor Courses</caption>
                    <thead>
                      <th>Name</th>
                      <th>Course Level</th>
                      <th>Credits</th>
                    </thead>
                    <tbody>
                      {
                        selectedProfessor.courses.map(course => (
                          <tr onClick={() => handleCourseEdit(course)}>
                            <th>{course.name}</th>
                            <th>{course.courseLevel}</th>
                            <th>{course.credits}</th>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </article>
              </div>
            </article>
          )
        }
      </section>
    </DashboardContent >
  );
}
