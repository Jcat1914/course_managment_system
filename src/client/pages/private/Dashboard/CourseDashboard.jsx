import React from 'react';
import { AddButton } from './components/AddButton';
import { useEffect, useState } from 'react';
import { Table } from '../../../component/Table/Table';
import { DashboardContent } from '../../../component/DashboardContent/DashboardContent';
import { useCourses } from '../../../customHooks/useCourses';
import { AddCourseModal } from './modals/AddCourseModal';
import { baseUrl } from '../../../config/api';
import { CourseEditModal } from './modals/CourseEditModal';
import { useCourseStore } from '../../../stores/courseStore';
export const CourseDashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [showActions, setShowActions] = useState(false);
  const { courses } = useCourses()
  const { deleteCourse } = useCourseStore()

  const openAddModal = (e) => {
    e.preventDefault();
    setIsAddModalOpen(true);
  }

  function openEditModal(e) {
    setIsEditModalOpen(true)
    setSelectedCourse(e)
  }

  function handleRowClick(e) {
    setSelectedCourse(e)
    setShowActions(true)
  }

  async function handleDelete(courseId) {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/course/${courseId}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (data.err) {
        throw new Error(data.err)
      }
      setShowActions(false)
      deleteCourse(courseId)
      alert(data.msg)
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  return (
    <DashboardContent viewName="Manage Courses">
      <AddButton onClick={openAddModal} />
      <section className="">
        <Table columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Course Name' },
          { key: 'description', label: 'Description' },
          { key: 'courseLevel', label: 'Course Level' },
          { key: 'credits', label: 'Credits' },
        ]}
          data={courses}
          title={'Course Info'}
          onRowClick={handleRowClick} />

        <AddCourseModal setIsModalOpen={setIsAddModalOpen} isModalOpen={isAddModalOpen} />
        <div className='flex items-center justify-center gap-6'>
          {showActions && (
            <>
              <button className='bg-red-500 text-white rounded p-3' onClick={() => handleDelete(selectedCourse.id)}>Delete</button>
              <button onClick={() => openEditModal()} className='bg-blue-500 p-3 rounded text-white'>Edit</button>
              <CourseEditModal initialValues={selectedCourse} isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} />
            </>
          )}
        </div>
      </section>
    </DashboardContent>
  );
}

