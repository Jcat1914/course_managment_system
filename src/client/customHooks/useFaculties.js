import { useFacultyStore } from "../stores/facultyStore";
import { baseUrl } from "../config/api";
import { useState, useEffect } from "react";
export const useFaculties = () => {
  const { professors, setProfessors } = useFacultyStore()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  async function fetchFaculties() {
    try {
      const response = await fetch(`${baseUrl}/faculty`);
      const faculties = await response.json();
      setProfessors(faculties);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFaculties();
  }, []);
  return { professors, loading, error };
}
