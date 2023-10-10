import * as Joi from "joi";

export const createVoteSchema = Joi.object({
  voter_name: Joi.string().required(),
  paslonId: Joi.string().required(),
  userId: Joi.string().required(),
});
