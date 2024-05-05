import React from 'react'

import { useStudentEnrollment } from '../../../../customHooks/useStudentEnrollment.js'
import { baseUrl } from '../../../../config/api.js'
import { useState } from 'react'
import { EditEnrollmentModal } from '../../Dashboard/modals/editEnrollmentModal.jsx'

export const StudentEnrollmentInfo = ({ selectedStudent, state }) => {
  const { enrollments } = useStudentEnrollment(selectedStudent.id)

  const [isEditOpen, setEditOpen] = useState(false)

  async function dropStudent(enrollmentId) {
    try {
      const response = await fetch(`${baseUrl}/student/enrollment/${enrollmentId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'drop' })
        })
      const data = await response.json()
      alert(data.msg)
      state(false)
    } catch (error) {
      alert('An error occurred, please try again')
    }
  }
  async function markGraduated(enrollmentId) {

    try {
      const response = await fetch(`${baseUrl}/student/enrollment/${enrollmentId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'graduated' })
        })
      const data = await response.json()
      alert(data.msg)
      state(false)
    } catch (error) {
      alert('An error occurred, please try again')
    }

  }
  async function activateStudent(enrollmentId) {
    try {
      const response = await fetch(`${baseUrl}/student/enrollment/${enrollmentId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'active' })
        })
      const data = await response.json()
      alert(data.msg)
      state(false)
    } catch (error) {
      alert('An error occurred, please try again')
    }
  }
  return (
    <div className='grid grid-cols-2 rounded-lg bg-gray-100 p-4 gap-2'>
      {enrollments?.enrollments?.map((enrollment) => (
        <div className=''>
          <div className='flex gap-3 flex-col bg-gray-300 justify-center items-center p-4'>
            <h2 className='font-bold font-sans'>Enrollment Information</h2>
            <h3>Program: {enrollment.program} </h3>
            <h3>status: {enrollment.status} </h3>
            <h3>Start Date: {enrollment.startDate} </h3>
            <h3>Graduation Date: {enrollment.graduationDate} </h3>
            <h3>Credits: {enrollment.credits} </h3>
            <h3>Cumulative GPA: {enrollment.cumulativeGPA} </h3>
            <div className='flex gap-3'>
              {enrollment.status === 'active' ? (
                <>
                  <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded' onClick={() => dropStudent(enrollment.id)}>Drop</button>
                  <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded' onClick={() => markGraduated(enrollment.id)}>Mark Graduated</button>
                </>
              ) : enrollment.status === 'graduated' ? (
                <button className='bg-gray-500 text-white font-bold py-2 px-4 rounded' disabled>Graduated</button>
              ) : (
                <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded' onClick={() => activateStudent(enrollment.id)}>Activate</button>
              )}
              <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={() => setEditOpen(true)}>Edit Info</button>
            </div>
          </div>
          {isEditOpen && <EditEnrollmentModal enrollmentInfo={enrollment} isModalOpen={isEditOpen} setIsModalOpen={setEditOpen} />}
        </div>
      ))}
    </div>)
}
