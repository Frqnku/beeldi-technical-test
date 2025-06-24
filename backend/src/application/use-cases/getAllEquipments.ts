import { EquipmentRepository } from '../../domain/repositories/equipmentRepository';

type Filters = {
  search?: string;
  typeId ?: string;
  limit?: string;
  page?: string;
};

export async function getAllEquipments(
  equipmentRepo: EquipmentRepository,
  filters: Filters
) {
  return equipmentRepo.findAllWithFilters(filters);
}
