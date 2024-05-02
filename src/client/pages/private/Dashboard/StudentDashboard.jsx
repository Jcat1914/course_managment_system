import React from 'react';
import { useStudents } from '../../../customHooks/useStudents';
import { useNavigate } from 'react-router-dom';

export const StudentDashboard = () => {
  const { loading } = useStudents();
  const { students } = useUserStore()
  const navigate = useNavigate();

  const openAddPage = (e) => {
    e.preventDefault();
    navigate('add')
  }
  const openEditPage = (e) => {
    navigate(`edit/${e.id}`)
  }
  return (
    <DashboardContent viewName="Manage Users">
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
              { key: 'phoneNumber', label: 'Phone Number' },
              { key: 'role', label: 'Role' },
            ]}
              data={students.students}
              title={'Users'}
              onRowClick={openEditPage} />

          </>

        )}
      </section>
    </DashboardContent>
  );
}