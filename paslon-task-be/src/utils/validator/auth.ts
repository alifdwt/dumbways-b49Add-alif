import * as Joi from "joi";

export const createUserSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
