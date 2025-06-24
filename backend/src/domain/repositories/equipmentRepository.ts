import { Equipment, EquipmentFilters, PaginatedEquipments } from '../entities/equipment';

export interface EquipmentRepository {
  create: (equipment: Omit<Equipment, 'id'>) => Promise<Equipment>;
  findById: (id: string) => Promise<Equipment | null>;
  update: (equipment: Omit<Equipment, 'createdAt' | 'updatedAt'>) => Promise<Equipment>;
  delete: (id: string) => Promise<void>;
  findAllWithFilters: (filters: EquipmentFilters) => Promise<PaginatedEquipments>;
}