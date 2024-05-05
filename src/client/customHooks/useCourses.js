import { baseUrl } from '../config/api';
import { useState, useEffect } from 'react';
export const useCourses = () => {
  const [courses, setCourses] = useState([]);

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
