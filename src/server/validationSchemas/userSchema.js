import Joi from 'joi';
export const userSchema = Joi.object({
  id: Joi.number().integer().optional(),
  first_name: Joi.string().max(32).required(),
  last_name: Joi.string().max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
  phone_number: Joi.string().pattern(/^(?:(?:\+|00)([1-9]\d{0,2})\s*)?(\d\s*){8,}$/).required(),
  role: Joi.string().valid('admin', 'registrar').required(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});


