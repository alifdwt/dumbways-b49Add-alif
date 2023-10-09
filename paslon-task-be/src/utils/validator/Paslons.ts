import * as Joi from "joi";

export const createPaslonSchema = Joi.object({
  name: Joi.string().required().min(10),
  vision: Joi.string().required().min(10),
  image: Joi.any(),
});
