import { Project as ProjectPrisma } from "@prisma/client";

export interface ProjectData
  extends Pick<ProjectPrisma, "name" | "description"> {}

export interface Project extends ProjectPrisma {}
