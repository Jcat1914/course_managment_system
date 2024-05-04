import React from 'react';
import { DashboardContent } from '../../../component/DashboardContent/DashboardContent';
import { AddButton } from './components/AddButton';
import { useFaculties } from '../../../customHooks/useFaculties';
import { Table } from '../../../component/Table/Table';
import { useFacultyStore } from '../../../stores/facultyStore';

export const FacultyDashboard = () => {
  const { loading } = useFaculties();
  const { professors } = useFacultyStore()

  function openAddPage(e) {
    e.preventDefault();
    navigate('add')
  }
  function openEditPage(e) {
    navigate(`edit/${e.id}`)
  }

  return (
    <DashboardContent viewName="Manage Faculty">
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
              { key: 'personalEmail', label: 'personalEmail' },
              { key: 'institutionalEmail', label: 'institutionalEmail' },
              { key: 'phoneNumber', label: 'Phone Number' },
              { key: 'DOB', label: 'DOB' },
            ]}
              data={professors}
              title={'Professors'}
              onRowClick={openEditPage} />
          </>
        )}
      </section>
    </DashboardContent>
  );
}
