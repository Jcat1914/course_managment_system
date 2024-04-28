import {ValidationError} from '../helpers/errors.js';
export const validationService = {
  validateData: (data, schema) => {
    const { error, value } = schema.validate(data);
    if (error) {
      console.log(error)
      throw new ValidationError(error.details[0].message)
    }
    return value;
  }
};
