import Joi from "joi";

export const idValidation: Joi.SchemaLike = Joi.number()
  .integer()
  .positive()
  .required()
  .messages({
    "number.base": "ID must be a number.",
    "number.integer": "ID must be an integer.",
    "number.positive": "ID must be a positive number.",
    "any.required": "ID is required.",
  });
