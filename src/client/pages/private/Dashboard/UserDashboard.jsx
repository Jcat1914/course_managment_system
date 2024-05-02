import React from "react";
import { DashboardContent } from "../../../component/DashboardContent/DashboardContent";
import { Table } from "../../../component/Table/Table";
import { useUsers } from "../../../customHooks/useUsers";
import { useUserStore } from "../../../stores/userStore";
import { AddButton } from "./components/AddButton";
import { useNavigate } from 'react-router-dom';
export const UserDashboard = () => {
  const { loading } = useUsers();
  const { users } = useUserStore()
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
              { key: 'email', label: 'Email' },
              { key: 'phoneNumber', label: 'Phone Number' },
              { key: 'role', label: 'Role' },
            ]}
              data={users.users}
              title={'Users'}
              onRowClick={openEditPage} />

          </>

        )}
      </section>
    </DashboardContent>
  );
}
