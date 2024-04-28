import Joi from 'joi';

export const studentSchema = Joi.object({
  id: Joi.number().integer().min(1),
  firstName: Joi.string().max(32).required(),
  lastName: Joi.string().max(32).required(),
  phoneNumber: Joi.string().pattern(/^(?:(?:\+|00)([1-9]\d{0,2})\s*)?(\d\s*){8,}$/),
  DOB: Joi.date().iso(),
  institutionalEmail: Joi.string().email().max(32), // Fixed this line
  personalEmail: Joi.string().email().max(32),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  cityId: Joi.number().integer().min(1).required(),
  createdAt: Joi.date().iso().optional(),
  updatedAt: Joi.date().iso().optional()
});
