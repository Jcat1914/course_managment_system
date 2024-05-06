import { baseUrl } from '../config/api';
import { useState, useEffect } from 'react';
export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    fetch(`${baseUrl}/building`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data)
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      })
  }, []);

  return { rooms }
}
