import { prisma } from "@globals/prisma";
import { Project } from "@controllers/project/project.types";

export const useProjectService = () => {
  const create = async (data: Project) => {
    try {
      const createdProject = await prisma.project.create({
        data,
      });

      return createdProject;
    } catch (e) {
      throw new Error(e as string);
    }
  };

  return {
    create,
  };
};
