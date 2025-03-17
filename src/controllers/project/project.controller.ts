import { CustomRequest } from "@globals/types";
import { Router } from "express";
import { Project } from "@controllers/project/project.types";
import { handleError } from "@globals/utils";
import { useProjectService } from "@controllers/project/project.service";

const app = Router();

const { create } = useProjectService();

app.post("/create", async (req: CustomRequest<Project>, res) => {
  try {
    const data = req.body;

    const createdProject = await create(data);

    res.json(createdProject);
  } catch (e) {
    const message = handleError(e);
    res.status(500).json({ message });
  }
});

export default app;
