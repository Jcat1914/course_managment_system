import { baseUrl } from '../config/api';
import { useState, useEffect } from 'react';
import { useCourseStore } from '../stores/courseStore';
export const useCourses = () => {
  const { courses, setCourses } = useCourseStore();

  useEffect(() => {
    fetch(`${baseUrl}/course`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data)
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      })
  }, []);

  return { courses };
}
