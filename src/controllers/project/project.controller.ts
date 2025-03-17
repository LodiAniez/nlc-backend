import { Router } from "express";
import { CustomRequest } from "@globals/types";
import { Project, ProjectData } from "@controllers/project/project.types";
import { CustomError, handleError, validateSchema } from "@globals/utils";
import { useProjectService } from "@controllers/project/project.service";
import {
  createProjectSchema,
  deleteProjectSchema,
  editProjectSchema,
} from "@controllers/project/project.schema";

const app = Router();

const { create, list, edit, deleteRecord } = useProjectService();

app.post("/", async (req: CustomRequest<Project>, res) => {
  try {
    const data = req.body;

    validateSchema<Project>({
      schema: createProjectSchema,
      payload: data,
    });

    const createdProject = await create(data);

    res.json(createdProject);
  } catch (e) {
    const err: CustomError = e as CustomError;
    const message = handleError(err);
    res.status(err.errorCode).json({ message });
  }
});

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

app.patch("/:id", async (req: CustomRequest<ProjectData>, res) => {
  try {
    const id = Number(req.params["id"]);
    const payload = req.body;

    validateSchema<Project>({
      schema: editProjectSchema,
      payload: {
        id,
        ...payload,
      },
    });

    const edited = await edit({ id, ...payload });

    res.json(edited);
  } catch (e) {
    const err: CustomError = e as CustomError;
    const message = handleError(err);
    res.status(err.errorCode).json({ message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const id = req.params["id"];

    validateSchema<Pick<Required<Project>, "id">>({
      schema: deleteProjectSchema,
      payload: { id: Number(id) },
    });

    const deletedRecord = await deleteRecord(Number(id));

    res.json(deletedRecord);
  } catch (e) {
    const err: CustomError = e as CustomError;
    const message = handleError(err);
    res.status(err.errorCode).json({ message });
  }
});

export default app;
