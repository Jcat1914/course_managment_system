import React from 'react';
import { useStudents } from '../../../customHooks/useStudents';
import { useNavigate } from 'react-router-dom';
import { DashboardContent } from '../../../component/DashboardContent/DashboardContent';
import { AddButton } from './components/AddButton';
import { Table } from '../../../component/Table/Table';
import { useStudentStore } from '../../../stores/studentStore';
import { useState } from 'react';
import { StudentEnrollmentInfo } from '../Pages/components/StudentEnrollmentInfo';

export const StudentDashboard = () => {
  const { loading } = useStudents();
  const { students } = useStudentStore()
  const [showStudentEnrollment, setShowStudentEnrollment] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState({})
  const navigate = useNavigate();

  const openAddPage = (e) => {
    e.preventDefault();
    navigate('add')
  }
  const displayStudentEnrollment = (e) => {
    setSelectedStudent(e)
    setShowStudentEnrollment(true)
  }

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
          </>
        )}
      </section>
      {showStudentEnrollment && <StudentEnrollmentInfo
        selectedStudent={selectedStudent} />}
    </DashboardContent>
  );
}
