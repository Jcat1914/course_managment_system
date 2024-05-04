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

export const StudentDashboard = () => {
  const { loading } = useStudents();
  const { students } = useStudentStore()
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
    setShowActions(true)
    setShowStudentEnrollment(true)
  }

  useEffect(() => {
    setShowStudentEnrollment(false)
    setShowActions(false)
  }, [])

  return (
    <DashboardContent viewName="Manage Students">
      <AddButton onClick={openAddPage} />
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
              data={students && students.students}
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
