import * as Joi from "joi";

export const createTodoSchema = Joi.object({
  name: Joi.string().required().min(10),
});
