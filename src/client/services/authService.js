import { baseUrl } from '../config/api.js';
import { persistLocalStorage } from '../helpers/localStorage.js'
export const login = async (username, password) => {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password }),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error)
    }
    persistLocalStorage('user', data.user)
    return data
  } catch (error) {
    throw new Error(error.message);
  }
}
