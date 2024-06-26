import { ValidationError } from '../helpers/errors.js';
export const validationService = {
  validateData: (data, schema) => {
    const { error, value } = schema.validate(data);
    if (error) {
      throw new ValidationError(error.details[0].message)
    }
    console.log(value)
    return value;
  }
};
