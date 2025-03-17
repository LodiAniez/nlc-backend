import Joi from "joi";
import { Project } from "@controllers/project/project.types";

const idValidation: Joi.SchemaLike = Joi.number()
  .integer()
  .positive()
  .required()
  .messages({
    "number.base": "ID must be a number.",
    "number.integer": "ID must be an integer.",
    "number.positive": "ID must be a positive number.",
    "any.required": "ID is required.",
  });

const createProjectSchema = Joi.object<Project>({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

const editProjectSchema = Joi.object<Project>({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  id: idValidation,
}).unknown(true);

const deleteProjectSchema = Joi.object<Pick<Required<Project>, "id">>({
  id: idValidation,
});

export { createProjectSchema, editProjectSchema, deleteProjectSchema };
