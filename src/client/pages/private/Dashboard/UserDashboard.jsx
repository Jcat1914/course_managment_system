import React from "react";
import { DashboardContent } from "../../../component/DashboardContent/DashboardContent";
import { Table } from "../../../component/Table/Table";
import { useUsers } from "../../../customHooks/useUsers";
import { useUserStore } from "../../../stores/userStore";
import { AddButton } from "./components/AddButton";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../../../config/api";
import { Toaster, toast } from 'sonner'
import { useState } from 'react'
export const UserDashboard = () => {
  const { loading } = useUsers();
  const { users, setUsers } = useUserStore();
  const navigate = useNavigate();

  const openAddPage = (e) => {
    e.preventDefault();
    navigate('add')
  }
  const openEditPage = (e) => {
    navigate(`edit/${e.id}`)
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

    // Show loading toast
    const loadingToastId = toast.loading('Uploading file...')

    // create a FormData object to send the file to the server
    const formDataFile = new FormData()
    formDataFile.append('file', file) // 'file' is the name of the field that the server expects

    try {
      const response = await fetch(`${baseUrl}/users/add-from-excel`, {
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
          setUsers([...users, ...data.createdUsers])
          setFilteredUsers([...users, ...data.createdUsers])
          setIsModalOpen(false)
          return 'Users added successfully'
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
    <DashboardContent viewName="Manage Users">
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
              { key: 'email', label: 'Email' },
              { key: 'phoneNumber', label: 'Phone Number' },
              { key: 'role', label: 'Role' },
            ]}
              data={users}
              title={'Users'}
              onRowClick={openEditPage} />
          </>
        )}
      </section>
    </DashboardContent>
  );
}
