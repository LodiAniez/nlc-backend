import Joi from "joi";
import {
  ServiceOrderData,
  EditServiceOrderData,
  DeleteServiceOrder,
} from "@controllers/service-order/service-order.types";
import { idValidation } from "@globals/validations";

const createServiceOrderSchema = Joi.object<ServiceOrderData>({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  category: Joi.string().required(),
  project_id: Joi.number().integer().positive().required(),
}).unknown(true);

const editServiceOrderSchema = Joi.object<EditServiceOrderData>({
  id: idValidation,
  name: Joi.string().optional().allow(null, ""),
  description: Joi.string().optional(),
  category: Joi.string().optional().allow(null, ""),
  project_id: Joi.number().integer().positive().optional().allow(null, ""),
}).unknown(true);

const deleteServiceOrderSchema = Joi.object<DeleteServiceOrder>({
  id: idValidation,
});

export {
  createServiceOrderSchema,
  editServiceOrderSchema,
  deleteServiceOrderSchema,
};
