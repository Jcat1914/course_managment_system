import Joi from 'joi';
export const enrollmentSchema = Joi.object({
  id: Joi.number().integer().min(1).optional(),
  studentId: Joi.number().integer().min(1).optional(),
  programId: Joi.number().integer().min(1).required(),
  credits: Joi.number().integer().min(0),
  startDate: Joi.date(),
  graduationDate: Joi.date(),
  cumulativeGPA: Joi.number().min(0).max(4),
  status: Joi.string().valid('drop', 'active', 'graduated').optional(),
  createdAt: Joi.date().iso().optional(),
  updatedAt: Joi.date().iso().optional()
});
