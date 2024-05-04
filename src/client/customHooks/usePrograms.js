import { useState, useEffect } from 'react';
import { getPrograms } from '../services/programService';
import { useProgramStore } from '../stores/programStore';
export const usePrograms = () => {
  const { setPrograms, programs } = useProgramStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchPrograms() {
    try {
      const programs = await getPrograms();
      setPrograms(programs);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchPrograms();
  }, []);
  return { programs, loading, error };
}
