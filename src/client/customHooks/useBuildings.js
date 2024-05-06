import { baseUrl } from '../config/api';
import { useEffect } from 'react';
import { useBuildingsStore } from '../stores/buildingStore';
export const useBuildings = () => {
  const { buildings, setBuildings } = useBuildingsStore()
  useEffect(() => {
    fetch(`${baseUrl}/building`)
      .then((res) => res.json())
      .then((data) => {
        setBuildings(data)
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      })
  }, []);

  return { buildings }
}
