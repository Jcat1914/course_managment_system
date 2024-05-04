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

export const getStudentEnrollments = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/student/enrollment/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch student enrollments');
        }
        return response.json();
      })
      .then(enrollments => {
        resolve(enrollments);
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
export const modifyStudent = (student) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/student/${student.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      if (!response.ok) {
        throw new Error('Failed to update student');
      }
      const updatedUser = await response.json();
      resolve(updatedUser);
    } catch (error) {
      reject(new Error('Error updating student: ' + error.message));
    }
  });
};

export const addStudent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const response = await fetch(`${baseUrl}/student/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const newStudent = await response.json();
      resolve(newStudent);
    } catch (error) {
      reject(new Error(error.message));
    }
  });
};
