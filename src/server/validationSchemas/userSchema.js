import Joi from 'joi';
export const userSchema = Joi.object({
  id: Joi.number().integer().optional(),
  firstName: Joi.string().max(32).required(),
  lastName: Joi.string().max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
  phoneNumber: Joi.string().pattern(/^(?:(?:\+|00)([1-9]\d{0,2})\s*)?(\d\s*){8,}$/).required(),
  role: Joi.string().valid('admin', 'registrar').required(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});


