import Joi from 'joi';

export const facultySchema = Joi.object({
  id: Joi.number().integer(),
  firstName: Joi.string().max(32).required(),
  lastName: Joi.string().max(32).required(),
  phoneNumber: Joi.string().pattern(/^(?:(?:\+|00)([1-9]\d{0,2})\s*)?(\d\s*){8,}$/), // Assuming 10-12 digits
  institutionalEmail: Joi.string().email().required().max(64),
  personalEmail: Joi.string().email().required().max(64),
  DOB: Joi.date().iso().required(),
  createdAt: Joi.date().iso().optional(),
  updatedAt: Joi.date().iso().optional(),
}) // Ignore unknown fields


export const facultyCredentialsSchema = Joi.object({
  facultyId: Joi.number().integer(),
  degree: Joi.string().max(32).required(),
  major: Joi.string().max(32).required(),
  createdAt: Joi.date().iso(),
  updatedAt: Joi.date().iso()
});

