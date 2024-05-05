import React from 'react';
import { DashboardContent } from '../../../component/DashboardContent/DashboardContent';
import { AddButton } from './components/AddButton';
import { useFaculties } from '../../../customHooks/useFaculties';
import { Table } from '../../../component/Table/Table';
import { useFacultyStore } from '../../../stores/facultyStore';
import { useState } from 'react';
import { AddFacultyModal } from './modals/AddFacultyModal';
import { EditFacultyModal } from './modals/EditFacultyModal';
import { convertNumToDay } from '../../../helpers/dayConversion'
import { AddAvailabilityModal } from './modals/addAvailabilityModal';
import { AddFacultyCourseModal } from './modals/addFacultyCourseModal';
import { EditAvailabilityModal } from './modals/editAvailabilityModal';
import { DeleteFacultyCourseModal } from './modals/DeleteFacultyCourseModal';
export const FacultyDashboard = () => {

  const { loading } = useFaculties();
  const { professors } = useFacultyStore()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [openDeleteCourseModal, setOpenDeleteCourseModal] = useState(false)
  const [selectedProfessor, setSelectedProfessor] = useState(null)
  const [openEditAvailabilityModal, setOpenEditAvailabilityModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState({})
  const [availability, setAvailability] = useState({})

  function openAddModal(e) {
    e.preventDefault();
    showActions && setShowActions(false);
    setIsAddModalOpen(true);
  }
  function showAvailabilityModal(e) {
    e.preventDefault();
    setAvailabilityModalOpen(true)
  }

  function openEditModal(e) {
    e.preventDefault();
    setIsEditModalOpen(true)
  }

  function openActions(e) {
    setShowActions(true);
    setSelectedProfessor(e)
  }
  function handleAvailabilityEdit(availability) {
    setAvailability(availability)
    setOpenEditAvailabilityModal(true)
  }

  function handleCourseEdit(course) {
    console.log(course)
    setSelectedCourse(course)
    setOpenDeleteCourseModal(true)
  }

  function openAddCourseModal(e) {
    e.preventDefault();
    setIsAddCourseModalOpen(true)
  }

  return (
    <DashboardContent viewName="Manage Faculty">
      <section className="flex items-center flex-col gap-3">
        <AddButton onClick={openAddModal} />
        <AddFacultyModal isModalOpen={isAddModalOpen} setIsModalOpen={setIsAddModalOpen} />
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
              { key: 'status', label: 'Status' }
            ]}
              data={professors}
              title={'Professors'}
              onRowClick={openActions} />
          </>
        )}
        {
          showActions && (
            <article className='flex flex-col items-center'>
              <AddAvailabilityModal
                actions={setShowActions}
                professorId={selectedProfessor.id} isModalOpen={availabilityModalOpen} setIsModalOpen={setAvailabilityModalOpen} />
              <AddFacultyCourseModal facultyId={selectedProfessor.id} isModalOpen={isAddCourseModalOpen} setIsModalOpen={setIsAddCourseModalOpen} />
              <DeleteFacultyCourseModal values={selectedCourse} isModalOpen={openDeleteCourseModal} setIsModalOpen={setOpenDeleteCourseModal} />
              <EditFacultyModal initialValues={selectedProfessor} isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} />
              <h2 className='font-bold text-lg'>Actions</h2>
              <div className='flex p-2 gap-3'>
                {selectedProfessor.status === 'inactive' ? (
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={openEditModal}>Edit</button>
                ) : (
                  <>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={openEditModal}>Edit</button>
                    <button className='bg-slate-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={showAvailabilityModal}>Add Availability</button>
                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={openAddCourseModal}>Add Courses</button>
                  </>
                )}
              </div>
              <div className='grid grid-cols-2 gap-3 w-30'>
                <article className='bg-white'>
                  <table>
                    <caption>Professor Availability</caption>
                    <thead>
                      <th>Day</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                    </thead>
                    <tbody>
                      {
                        selectedProfessor.facultyAvailabilities.map(availability => (
                          <tr onClick={() => handleAvailabilityEdit(availability)}>
                            <th>{convertNumToDay(availability.day)}</th>
                            <th>{availability.startTime}</th>
                            <th>{availability.endTime}</th>
                            <th>{availability.available}</th>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                  <EditAvailabilityModal availability={availability} setIsModalOpen={setOpenEditAvailabilityModal} isModalOpen={openEditAvailabilityModal} />
                </article>
                <article className='bg-white'>
                  <table>
                    <caption>Professor Courses</caption>
                    <thead>
                      <th>Name</th>
                      <th>Course Level</th>
                      <th>Credits</th>
                    </thead>
                    <tbody>
                      {
                        selectedProfessor.courses.map(course => (
                          <tr onClick={() => handleCourseEdit(course)}>
                            <th>{course.name}</th>
                            <th>{course.courseLevel}</th>
                            <th>{course.credits}</th>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </article>
              </div>
            </article>
          )
        }
      </section>
    </DashboardContent >
  );
}
