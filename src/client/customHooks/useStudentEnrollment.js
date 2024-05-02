import { useState, useEffect } from 'react';
import { getStudentEnrollments } from '../services/studentService';
export const useStudentEnrollment = (id) => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getStudentEnrollments(id)
      .then((enrollments) => {
        setLoading(false);
        setEnrollments(enrollments);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);
  return { enrollments, loading, error };
}
