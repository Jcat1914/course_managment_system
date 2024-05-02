import { useState, useEffect } from 'react';
import { useStudentStore } from '../stores/studentStore.js';
import { getStudents } from '../services/studentService.js';

export const useStudents = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setStudents } = useStudentStore();
  useEffect(() => {
    getStudents()
      .then((students) => {
        setLoading(false);
        setStudents(students);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return { loading, error };
}
