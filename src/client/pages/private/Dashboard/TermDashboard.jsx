import React from 'react';
import { AddButton } from './components/AddButton';
import { useTerms } from '../../../customHooks/useTerms';
import { useEffect, useState } from 'react';
import { Table } from '../../../component/Table/Table';
import { DashboardContent } from '../../../component/DashboardContent/DashboardContent';
import { AddTermModal } from './modals/AddTermModal';
import { EditTermModal } from './modals/EditTermModal';
export const TermDashboard = () => {
  const { terms, loading } = useTerms()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState({});

  const openAddModal = (e) => {
    e.preventDefault();
    setIsAddModalOpen(true);
  }

  function openEditModal(e) {
    setIsEditModalOpen(true)
    setSelectedTerm(e)
  }

  useEffect(() => {
    setSelectedTerm({})
  }, [terms])
  return (
    <DashboardContent viewName="Manage Terms">
      <AddButton onClick={openAddModal} />
      <section className="">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Table columns={[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Term Name' },
              { key: 'startDate', label: 'Start Date' },
              { key: 'endDate', label: 'End Date' },
            ]}
              data={terms}
              title={'Term Info'}
              onRowClick={openEditModal} />
          </>
        )}
        <AddTermModal isModalOpen={isAddModalOpen} setIsModalOpen={setIsAddModalOpen} />
        <EditTermModal initialValues={selectedTerm} isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} />
      </section>
    </DashboardContent>
  );
}
