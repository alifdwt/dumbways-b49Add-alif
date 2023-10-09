import * as Joi from "joi";

export const createPartySchema = Joi.object({
  name: Joi.string().required(),
  paslonId: Joi.string().required(),
});
