import { Project as ProjectPrisma } from "@prisma/client";

export interface Project extends Pick<ProjectPrisma, "name" | "description"> {}
