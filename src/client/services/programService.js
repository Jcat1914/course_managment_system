import { baseUrl } from "../config/api";
export const getPrograms = () => {

  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/program`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch programs');
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
