import Joi from 'joi';

export const termSchema = Joi.object({
  id: Joi.number().integer().min(1),
  name: Joi.string().max(64).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional()
});
