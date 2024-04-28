import Joi from 'joi';
export const enrollmentSchema = Joi.object({
  id: Joi.number().integer().min(1).optional(),
  studentId: Joi.number().integer().min(1).required(),
  programId: Joi.number().integer().min(1).required(),
  credits: Joi.number().integer().min(0).required(),
  startDate: Joi.date().iso().required(),
  graduationDate: Joi.date().iso().required(),
  cumulativeGPA: Joi.number().min(0).max(4).required(),
  status: Joi.string().valid('active', 'inactive').required(),
  createdAt: Joi.date().iso().optional(),
  updatedAt: Joi.date().iso().optional()
});
