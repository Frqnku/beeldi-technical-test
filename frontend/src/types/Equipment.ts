import { EquipmentType } from "./EquipmentType";

export type Equipment = {
  id: string;
  name: string;
  domain: EquipmentType;
  type: EquipmentType;
  category: EquipmentType;
  subcategory: EquipmentType;
  brand: string;
  model: string;
};

export type EquipmentFilters = {
  search?: string;
  domain?: string;
  type?: string;
  category?: string;
  subcategory?: string;
  typeId?: string;
};

export type EquipmentResponse = {
  equipments: Equipment[];
  hasMore: boolean;
  nextPage?: number;
};