import { prisma } from "@globals/prisma";
import { ProjectData, Project } from "@controllers/project/project.types";

export const useProjectService = () => {
  const create = async (data: ProjectData) => {
    try {
      const createdProject = await prisma.project.create({
        data,
      });

      await prisma.$disconnect();
      return createdProject;
    } catch (e) {
      await prisma.$disconnect();
      throw new Error(e as string);
    }
  };

  const list = async (): Promise<Project[]> => {
    try {
      const list = await prisma.project.findMany();

      await prisma.$disconnect();
      return list;
    } catch (e) {
      await prisma.$disconnect();
      throw new Error(e as string);
    }
  };

  const edit = async (data: Project): Promise<Project> => {
    const { id, description, name } = data;

    try {
      const edited = await prisma.project.update({
        where: { id },
        data: {
          description,
          name,
        },
      });

      await prisma.$disconnect();
      return edited;
    } catch (e) {
      await prisma.$disconnect();
      throw new Error(e as string);
    }
  };

  const deleteRecord = async (
    id: number
  ): Promise<Pick<Required<Project>, "id">> => {
    try {
      const deleted = await prisma.project.delete({
        where: {
          id,
        },
        select: {
          id: true,
        },
      });

      await prisma.$disconnect();
      return deleted;
    } catch (e) {
      await prisma.$disconnect();
      throw new Error(e as string);
    }
  };

  return {
    create,
    list,
    edit,
    deleteRecord,
  };
};
