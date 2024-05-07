import React from 'react';
import { AddButton } from './components/AddButton';
import { useEffect, useState } from 'react';
import { Table } from '../../../component/Table/Table';
import { DashboardContent } from '../../../component/DashboardContent/DashboardContent';
import { useBuildings } from '../../../customHooks/useBuildings';
import { useRooms } from '../../../customHooks/useRooms';
import { AddBuildingModal } from './modals/AddBuildingModal';
import { AddRoomModal } from './modals/AddRoomModal';
import { EditBuildingModal } from './modals/EditBuildingModal';
import { useBuildingsStore } from '../../../stores/buildingStore';
import { baseUrl } from '../../../config/api';
import { EditRoomModal } from './modals/EditRoomModal';
export const BuildingDashboard = () => {
  const { buildings } = useBuildings()
  const { rooms } = useRooms()
  const { deleteBuilding } = useBuildingsStore()
  const [showRooms, setShowRooms] = useState(false)
  const [selectedBuilding, setSelectedBuilding] = useState({})
  const [selectedRoom, setSelectedRoom] = useState({})
  const [showEditBuildingModal, setShowEditBuildingModal] = useState(false)
  const [editRoomModal, setEditRoomModal] = useState(false)
  const [showAddRoomModal, setShowAddRoomModal] = useState(false)
  const [showRoomActions, setShowRoomActions] = useState(false)
  const [showAddBuildingModal, setShowAddBuildingModal] = useState(false)

  const openAddBuildingModal = (e) => {
    setShowAddBuildingModal(true)
  }

  function updateBuilding(buildingId) {
    if (!buildingId) return
    const newSelectedBuilding = buildings.find(building => building.id === buildingId)
    setSelectedBuilding(newSelectedBuilding)
  }

  useEffect(() => {
    updateBuilding(selectedBuilding.id || null)
  }, [buildings])
  function showRoomsTable(e) {
    setSelectedBuilding(e)
    setShowRooms(true)
    setShowRoomActions(false)
    console.log(e)
  }
  const openAddRoomModal = (e) => {
    e.preventDefault();
    setShowAddRoomModal(true)
  }
  function openRoomActions(e) {
    setShowRoomActions(true)
    setSelectedRoom(e)
  }
  function openEditModal(e) {
    e.preventDefault();
    setShowEditBuildingModal(true)
  }
  function openEditRoomModal(e) {
    e.preventDefault();
    console.log(e)
    setEditRoomModal(true)
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
    formDataFile.append('file', file)

    try {
      const response = await fetch(`/api/buildings/excel`, {
        method: 'POST',
        body: formDataFile,
      })
      const data = await response.json()

      toast.dismiss(loadingToastId)

      const promise = () => new Promise((resolve) => resolve(data))

      toast.promise(promise, {
        success: () => {
          setIsModalOpen1(false)
          return 'Buildings added successfully'
        },
        error: (err) => {
          console.error('Failed to upload file:', err)
          return 'Failed to upload file'
        },
      })
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error('Error uploading file')
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(`${baseUrl}/building/${selectedBuilding.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (data.err) {
        throw new Error(data.err)
      }
      deleteBuilding(selectedBuilding.id)
      alert(data.msg)
      setShowRooms(false)
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  return (
    <DashboardContent viewName="Manage Buildings And Rooms">
      <AddButton onClick={openAddBuildingModal} />
      <AddBuildingModal isModalOpen={showAddBuildingModal} setIsModalOpen={setShowAddBuildingModal} />
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
      <section >
        <Table
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Building Name' },
          ]}
          data={buildings}
          title={'Building Info'}
          onRowClick={showRoomsTable}
        />
        {showRooms ? (
          <div className='flex flex-col items-center gap-6 bg-gray-200'>
            <article className='flex flex-col items-center gap-3'>
              <h2 className='font-bold '>ACTIONS</h2>
              <div className='flex gap-2 '>
                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={openAddRoomModal}>Add Room</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={openEditModal}>Edit Building</button>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={handleDelete} >Delete Building</button>
              </div>
            </article>
            <article className='bg-white min-w-full'>
              <table className="w-full border-collapse rounded-lg">
                <caption className='bg-stone-200'>Building Rooms</caption>
                <thead>
                  <tr className="bg-gray-200 text-gray-800 text-sm">
                    <th className="py-2 px-3 border border-gray-300">Id</th>
                    <th className="py-2 px-3 border border-gray-300">Room Code</th>
                    <th className="py-2 px-3 border border-gray-300">Capacity</th>
                    <th className="py-2 px-3 border border-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBuilding.rooms.map((room) => (
                    <tr key={room.id} onClick={() => openRoomActions(room)}>
                      <td className="py-2 px-4 border border-gray-300 cursor-pointer">{room.id}</td>
                      <td className="py-2 px-4 border border-gray-300 cursor-pointer">{room.roomCode}</td>
                      <td className="py-2 px-4 border border-gray-300 cursor-pointer">{room.capacity}</td>
                      <td className="py-2 px-4 border border-gray-300 cursor-pointer">{room.status}</td>
                    </tr>
                  ))}
                </tbody>
                <EditBuildingModal initialValues={selectedBuilding} setIsModalOpen={setShowEditBuildingModal} isModalOpen={showEditBuildingModal} />
                <AddRoomModal buildingId={selectedBuilding.id} isModalOpen={showAddRoomModal} setIsModalOpen={setShowAddRoomModal} />
              </table>
              {showRoomActions ? (
                <article className='flex flex-col items-center gap-3 bg-gray-200'>
                  <h2 className='font-bold'>Actions</h2>
                  <div className='flex gap-2'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={openEditRoomModal}>
                      Edit Room
                    </button>
                  </div>
                  <EditRoomModal initialValues={selectedRoom} isModalOpen={editRoomModal} setIsModalOpen={setEditRoomModal} />
                </article>
              ) : null}
            </article>
          </div>
        ) : null}
      </section>
    </DashboardContent >
  );
}
