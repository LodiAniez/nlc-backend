import Joi from "joi";
import { Project } from "@controllers/project/project.types";
import { idValidation } from "@globals/validations";

const createProjectSchema = Joi.object<Project>({
  name: Joi.string().required(),
  description: Joi.string().optional().allow(null, ""),
});

const editProjectSchema = Joi.object<Project>({
  name: Joi.string().optional(),
  description: Joi.string().optional().allow(null, ""),
  id: idValidation,
}).unknown(true);

const deleteProjectSchema = Joi.object<Pick<Required<Project>, "id">>({
  id: idValidation,
});

export { createProjectSchema, editProjectSchema, deleteProjectSchema };
