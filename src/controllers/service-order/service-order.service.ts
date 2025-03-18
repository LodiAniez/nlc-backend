import { prisma } from "@globals/prisma";
import { ServiceOrder as ServiceOrderPrisma } from "@prisma/client";
import {
  DeleteServiceOrder,
  ListServiceOrder,
  ServiceOrderData,
} from "@controllers/service-order/service-order.types";

export const useServiceOrderService = () => {
  const create = async (
    data: ServiceOrderData
  ): Promise<Omit<ServiceOrderPrisma, "created_date" | "updated_date">> => {
    try {
      const { category, description, name, project_id } = data;
      const createdData = await prisma.serviceOrder.create({
        data: {
          category,
          name,
          description,
          project_id,
        },
        select: {
          category: true,
          description: true,
          id: true,
          is_approved: true,
          name: true,
          project_id: true,
        },
      });

      await prisma.$disconnect();
      return createdData;
    } catch (e) {
      await prisma.$disconnect();
      throw new Error(e as string);
    }
  };

  const edit = async ({
    data,
    id,
  }: {
    id: number;
    data: Partial<ServiceOrderData>;
  }): Promise<Omit<ServiceOrderPrisma, "created_date" | "updated_date">> => {
    try {
      const updatedData = await prisma.serviceOrder.update({
        where: { id },
        data,
        select: {
          category: true,
          description: true,
          id: true,
          is_approved: true,
          name: true,
          project_id: true,
        },
      });

      await prisma.$disconnect();
      return updatedData;
    } catch (e) {
      await prisma.$disconnect();
      throw new Error(e as string);
    }
  };

  const list = async (): Promise<ListServiceOrder[]> => {
    try {
      const items = await prisma.serviceOrder.findMany({
        select: {
          id: true,
          category: true,
          description: true,
          is_approved: true,
          name: true,
          project_id: true,
          project: {
            select: {
              name: true,
            },
          },
        },
      });

      await prisma.$disconnect();
      return items.map((item) => {
        const {
          project: { name },
          ...rest
        } = item;

        return {
          project_name: name,
          ...rest,
        };
      });
    } catch (e) {
      await prisma.$disconnect();
      throw new Error(e as string);
    }
  };

  const deleteItem = async (id: number): Promise<DeleteServiceOrder> => {
    try {
      const deletedItem = await prisma.serviceOrder.delete({
        where: {
          id,
        },
        select: {
          id: true,
        },
      });

      await prisma.$disconnect();
      return deletedItem;
    } catch (e) {
      await prisma.$disconnect();
      throw new Error(e as string);
    }
  };

  return { create, edit, list, deleteItem };
};
