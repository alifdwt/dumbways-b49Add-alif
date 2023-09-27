import * as Joi from "joi";

export const createPemiluSchema = Joi.object({
  name: Joi.string().required().min(10),
  vision: Joi.string().required().min(10),
  image: Joi.string().required().min(10),
});
