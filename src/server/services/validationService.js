export const validationService = {
  validateData: (data, schema) => {
    const { error, value } = schema.validate(data);
    if (error) {
      throw new Error(error.message);
    }
    return value;
  }
};
