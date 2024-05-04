import { baseUrl } from '../config/api';
import { useState, useEffect } from 'react';
export const useCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/country`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data)
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      })
  }, []);

  return { countries };
}
