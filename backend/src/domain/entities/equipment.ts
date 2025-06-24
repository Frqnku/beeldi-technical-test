export type Equipment = {
  id: string;
  name: string;
  brand: string;
  model: string;
  typeId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NewEquipment = {
  name: string;
  brand: string;
  model: string;
  typeId: string;
};

export type EquipmentFilters = {
  search?: string;
  typeId?: string;
  limit?: string;
  page?: string;
};

export type PaginatedEquipments = {
  equipments: Equipment[];
  hasMore: boolean;
  nextPage?: number;
}