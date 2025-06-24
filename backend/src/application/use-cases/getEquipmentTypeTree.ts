import { prismaEquipmentTypeRepository } from '../../infrastructure/repositories/equipmentTypeRepository';
import { buildEquipmentTypeTree } from '../../domain/repositories/equipmentTypeRepository';

export async function getEquipmentTypeTree() {
  const allTypes = await prismaEquipmentTypeRepository.findAll();
  return buildEquipmentTypeTree(allTypes);
}