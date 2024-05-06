import React from 'react';
import { AddButton } from './components/AddButton';
import { useEffect, useState } from 'react';
import { Table } from '../../../component/Table/Table';
import { DashboardContent } from '../../../component/DashboardContent/DashboardContent';
//import { AddProgramModal } from './modals/AddProgramModal';
//``import { EditProgramModal } from './modals/EditProgramModal';
//``import { baseUrl } from '../../../config/api';
//``import { EditprogramModal } from './modals/EditRoomModal';
import { usePrograms } from '../../../customHooks/usePrograms';
import { AddProgramModal } from './modals/AddProgramModal';
import { EditProgramModal } from './modals/EditProgramModal';
import { AddProgramCoursesModal } from './modals/addProgramCoursesModal';
export const ProgramDashboard = () => {
  const [showAddProgramModal, setShowAddProgramModal] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState({})
  const [showProgramCourses, setShowProgramCourses] = useState(false)
  const [showProgramActions, setShowProgramActions] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState({})
  const [showCourseActions, setShowCourseActions] = useState(false)
  const [showEditProgramModal, setShowEditProgramModal] = useState(false)
  const [showAddCourseModal, setShowAddCourseModal] = useState(false)

  const { programs } = usePrograms()

  function showCourses(e) {
    setSelectedProgram(e)
    setShowProgramCourses(true)
    setShowCourseActions(false)
  }
  function openAddProgramModal(e) {
    setShowAddProgramModal(true)
  }

  function openEditCourseModal(e) { }
  function openProgramActions(e) {
    setShowCourseActions(true)
    setSelectedCourse(e)
    console.log(selectedCourse)
  }
  function openAddCourseModal(e) {
    e.preventDefault();
    setShowAddCourseModal(true)
  }

  function openEditModal(e) {
    e.preventDefault();
    setShowEditProgramModal(true)
  }

  async function handleDelete(courseId, programId) {
    console.log(courseId, programId)
  }

  return (
    <DashboardContent viewName="Manage Program And Courses">
      <AddButton onClick={openAddProgramModal} />
      <AddProgramModal isModalOpen={showAddProgramModal} setIsModalOpen={setShowAddProgramModal} />
      <section >
        <Table
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Program Name' },
            { key: 'description', label: 'Description' },
            { key: 'requiredCredits', label: 'Required Credits' },
            { key: 'degreeLevel', label: 'Degree' },
            { key: 'status', label: 'Status' }
          ]}
          data={programs}
          title={'Program Info'}
          onRowClick={showCourses}
        />
        {showProgramCourses && (
          <div>
            <EditProgramModal initialValues={selectedProgram} isModalOpen={showEditProgramModal} setIsModalOpen={setShowEditProgramModal} />
            <AddProgramCoursesModal programId={selectedProgram.id} isModalOpen={showAddCourseModal} setIsModalOpen={setShowAddCourseModal} />
            <article className='flex flex-col items-center gap-3'>
              <h2 className='font-bold '>ACTIONS</h2>
              <div className='flex gap-2 '>
                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={openAddCourseModal}>Add Course</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={openEditModal}>Edit Program</button>
              </div>
            </article>
            <article className='bg-white min-w-full'>
              <table className="w-full border-collapse rounded-lg">
                <caption className='bg-stone-200'>Program Courses</caption>
                <thead>
                  <tr className="bg-gray-200 text-gray-800 text-sm">
                    <th className="py-2 px-3 border border-gray-300">Id</th>
                    <th className="py-2 px-3 border border-gray-300">Name</th>
                    <th className="py-2 px-3 border border-gray-300">Description</th>
                    <th className="py-2 px-3 border border-gray-300">Course Level</th>
                    <th className="py-2 px-3 border border-gray-300">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProgram?.courses?.map((course) => (
                    <tr key={course.id} onClick={() => openProgramActions(course)}>
                      <td className="py-2 px-4 border border-gray-300 cursor-pointer">{course.id}</td>
                      <td className="py-2 px-4 border border-gray-300 cursor-pointer">{course.name}</td>
                      <td className="py-2 px-4 border border-gray-300 cursor-pointer">{course.description}</td>
                      <td className="py-2 px-4 border border-gray-300 cursor-pointer">{course.courseLevel}</td>
                      <td className="py-2 px-4 border border-gray-300 cursor-pointer">{course.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showCourseActions ? (
                <article className='flex flex-col items-center gap-3 bg-gray-200'>
                  <h2 className='font-bold'>Actions</h2>
                  <div className='flex gap-2'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                      onClick={openEditCourseModal}>
                      Edit Course
                    </button>
                    <button onClick={() => handleDelete(selectedCourse.id, selectedProgram.id)}
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete</button>
                  </div>
                </article>
              ) : null}
            </article>
          </div>
        )}
      </section>
    </DashboardContent >
  );
}
