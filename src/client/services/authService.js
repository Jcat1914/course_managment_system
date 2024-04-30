import { baseUrl } from '../config/api.js';
import { persistLocalStorage, clearLocalStorage } from '../helpers/localStorage.js'
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

export const logout = async () => {
  try {
    clearLocalStorage('user')
    const response = await fetch(`${baseUrl}/auth/logout`);
    const data = await response.json();
    if (data.err) {
      throw new Error(data.err)
    }
    return data
  } catch (error) {
    throw new Error(error.message);
  }
}
