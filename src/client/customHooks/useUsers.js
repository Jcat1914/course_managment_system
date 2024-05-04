import { useState, useEffect } from 'react';
import { useUserStore } from '../stores/userStore.js';
import { getUsers } from '../services/userService';
export const useUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { users, setUsers } = useUserStore();
  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error };
}
