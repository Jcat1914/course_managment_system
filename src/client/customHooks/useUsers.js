import { useState, useEffect } from 'react';
import { useUserStore } from '../stores/userStore.js';
import { getUsers } from '../services/userService';
export const useUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setUsers } = useUserStore();
  useEffect(() => {
    getUsers()
      .then((users) => {
        setLoading(false);
        setUsers(users);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return { loading, error };
}
