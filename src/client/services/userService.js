import { baseUrl } from '../config/api.js';
export const getUsers = () => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/users`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(users => {
        resolve(users);
      })
      .catch(error => {
        reject(new Error(error.message));
      });
  });
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/users/${id}`, {
      method: 'DELETE',
    });
    const message = await response.json();
    return message;

  } catch (error) {
    throw new Error(err.message)
  }
}


export const modifyUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const updatedUser = await response.json();
      resolve(updatedUser);
    } catch (error) {
      reject(new Error('Error updating user: ' + error.message));
    }
  });
};

export const registerUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const newUser = await response.json();
      resolve(newUser);
    } catch (error) {
      reject(new Error(error.message));
    }
  });
};
