import React from 'react'
import { useStudentEnrollment } from '../../../../customHooks/useStudentEnrollment.js'
export const StudentEnrollmentInfo = ({ selectedStudent }) => {
  const { enrollments } = useStudentEnrollment(selectedStudent.id)
  return (
    <div className='flex rounded-lg bg-gray-100 p-3 flex-col gap-3 '>
      <h1 className='font-bold'>{`${selectedStudent.firstName} ${selectedStudent.lastName}`} Enrollment Info</h1>
      {enrollments.enrollments.map((enrollment) => (
        <div className='grid grid-cols-2'>
          <div>
            <h3>Program: {enrollment.program} </h3>
            <h3>status: {enrollment.status} </h3>
            <h3>Start Date: {enrollment.startDate} </h3>
            <h3>Graduation Date: {enrollment.graduationDate} </h3>
            <h3>Credits: {enrollment.credits} </h3>
            <h3>Cumulative GPA: {enrollment.cumulativeGPA} </h3>
            <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>Edit</button>
          </div>
        </div>
      ))}
    </div>)
}
