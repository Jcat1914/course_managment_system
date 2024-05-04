import { useState, useEffect } from 'react';
import { useUserStore } from '../stores/userStore.js';
import { getUsers } from '../services/userService';
export const useUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setUsers } = useUserStore();
  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      console.log(users.users)
      setUsers(users.users)
      setLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error.message)
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return { loading, error };
}
