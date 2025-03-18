import { CustomRequest } from "@globals/types";
import { Router } from "express";
import {
  DeleteServiceOrder,
  EditServiceOrderData,
  ServiceOrderData,
} from "./service-order.types";
import { CustomError, handleError, validateSchema } from "@globals/utils";
import {
  createServiceOrderSchema,
  deleteServiceOrderSchema,
  editServiceOrderSchema,
} from "@controllers/service-order/service-order.schema";
import { useServiceOrderService } from "@controllers/service-order/service-order.service";

const app = Router();

const { create, edit, list, deleteItem } = useServiceOrderService();

app.get("/", async (_, res) => {
  try {
    const items = await list();

    res.json(items);
  } catch (e) {
    const err: CustomError = e as CustomError;
    const message = handleError(err);
    res.status(err.errorCode).json({ message });
  }
});

app.post("/", async (req: CustomRequest<ServiceOrderData>, res) => {
  try {
    const payload = req.body;

    validateSchema<ServiceOrderData>({
      schema: createServiceOrderSchema,
      payload,
    });

    const createdServiceOrder = await create(payload);

    res.json(createdServiceOrder);
  } catch (e) {
    const err: CustomError = e as CustomError;
    const message = handleError(err);
    res.status(err.errorCode).json({ message });
  }
});

app.patch(
  "/:id",
  async (req: CustomRequest<Omit<EditServiceOrderData, "id">>, res) => {
    try {
      const id = req.params["id"];
      const payload = req.body;

      validateSchema<EditServiceOrderData>({
        schema: editServiceOrderSchema,
        payload: { id: Number(id), ...payload },
      });

      const editedItem = await edit({
        id: Number(id),
        data: payload,
      });

      res.json(editedItem);
    } catch (e) {
      console.log(e);
      const err: CustomError = e as CustomError;
      const message = handleError(err);
      res.status(err.errorCode).json({ message });
    }
  }
);

app.delete("/:id", async (req, res) => {
  try {
    const id = req.params["id"];

    validateSchema<DeleteServiceOrder>({
      schema: deleteServiceOrderSchema,
      payload: { id: Number(id) },
    });

    const deletedItem = await deleteItem(Number(id));

    res.json(deletedItem);
  } catch (e) {
    const err: CustomError = e as CustomError;
    const message = handleError(err);
    res.status(err.errorCode).json({ message });
  }
});

export default app;
