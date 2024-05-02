import { baseUrl } from '../config/api.js';
export const getStudents = () => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/student`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        return response.json();
      })
      .then(students => {
        resolve(students);
      })
      .catch(error => {
        reject(new Error(error.message));
      });
  });
};

export const deleteStudent = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/student/${id}`, {
      method: 'DELETE',
    });
    const message = await response.json();
    return message;

  } catch (error) {
    throw new Error(err.message)
  }

}
export const modifyStudent = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/student/${user.id}`, {
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

export const addStudent = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/student/add`, {
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
