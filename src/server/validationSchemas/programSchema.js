import Joi from 'joi'
export const programSchema = Joi.object({
  id: Joi.number().integer().positive(),
  name: Joi.string().max(32).required(),
  description: Joi.string().allow(null, '').max(255), // Adjust max length as per your requirement
  requiredCredits: Joi.number().integer().positive().required(),
  degreeLevel: Joi.string().valid('Associate', 'Bachelor', 'Master', 'Doctorate').required(),
  status: Joi.string().valid('active', 'inactive').required(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional()
});
