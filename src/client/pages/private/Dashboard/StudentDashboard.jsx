import React from 'react';
import { useStudents } from '../../../customHooks/useStudents';
import { useNavigate } from 'react-router-dom';
import { DashboardContent } from '../../../component/DashboardContent/DashboardContent';
import { AddButton } from './components/AddButton';
import { Table } from '../../../component/Table/Table';
import { useStudentStore } from '../../../stores/studentStore';
import { useState, useEffect } from 'react';
import { StudentEnrollmentInfo } from '../Pages/components/StudentEnrollmentInfo';
import { usePrograms } from '../../../customHooks/usePrograms';
import { AddEnrollmentModal } from './modals/addEnrollmentModal';
import { StudentEditForm } from './modals/editStudentModal';
import { Toaster, toast } from 'sonner'
import { baseUrl } from '../../../config/api';

export const StudentDashboard = () => {
  const { loading } = useStudents();
  const { students, setStudents } = useStudentStore()
  const { programs } = usePrograms()
  const [showStudentEnrollment, setShowStudentEnrollment] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState({})
  const [showActions, setShowActions] = useState(false)
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)
  const navigate = useNavigate();

  const openAddPage = (e) => {
    e.preventDefault();
    navigate('add')
  }
  const displayStudentEnrollment = (e) => {
    setSelectedStudent(e)
    console.log(e)
    setShowActions(true)
    setShowStudentEnrollment(true)
  }

  useEffect(() => {
    setShowStudentEnrollment(false)
    setShowActions(false)

  }, [students])
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
      const response = await fetch(`${baseUrl}/student/add-from-excel`, {
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
          setStudents([...students, ...data.createdStudent])
          setIsModalOpen(false)
          return 'Students added successfully'
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

  return (
    <DashboardContent viewName="Manage Students">
      <AddButton onClick={openAddPage} />
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
      <section className="">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Table columns={[
              { key: 'id', label: 'ID' },
              { key: 'firstName', label: 'First Name' },
              { key: 'lastName', label: 'Last Name' },
              { key: 'institutionalEmail', label: 'Institutional Email' },
              { key: 'personalEmail', label: 'Personal Email' },
              { key: 'phoneNumber', label: 'Phone Number' },
              { key: 'gender', label: 'Gender' },
              { key: 'country', label: 'Country' },
              { key: 'DOB', label: 'DOB' },
            ]}
              data={students && students}
              title={'Students Info'}
              onRowClick={displayStudentEnrollment} />
            <AddEnrollmentModal studentId={selectedStudent.id} isModalOpen={showEnrollmentModal} setIsModalOpen={setShowEnrollmentModal} />
            <StudentEditForm initialValues={selectedStudent} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          </>
        )}
        {showActions &&
          <article className='flex gap-2 justify-center items-center'>
            <h1 className='font-bold'>{`${selectedStudent.firstName} ${selectedStudent.lastName}`} </h1>
            <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={() => setIsModalOpen(true)}>Edit</button>
            <button onClick={() => setShowEnrollmentModal(true)} className='bg-green-500 -500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'>Create new Enrollment</button>
          </article>
        }
      </section>
      <article>
        {showStudentEnrollment && <StudentEnrollmentInfo
          selectedStudent={selectedStudent} state={setShowStudentEnrollment} />}
      </article>
    </DashboardContent>
  );
}
