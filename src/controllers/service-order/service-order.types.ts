import { ServiceOrder as ServiceOrderPrisma } from "@prisma/client";

export interface ServiceOrderData
  extends Pick<
    ServiceOrderPrisma,
    "category" | "description" | "name" | "project_id"
  > {}

export interface EditServiceOrderData extends Partial<ServiceOrderData> {
  id: number;
}

export interface ListServiceOrder
  extends Pick<
    ServiceOrderPrisma,
    "category" | "description" | "id" | "is_approved" | "name" | "project_id"
  > {
  project_name: string;
}

export interface DeleteServiceOrder extends Pick<ServiceOrderPrisma, "id"> {}
