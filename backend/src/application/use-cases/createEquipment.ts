import { validateCreateEquipment } from '../../domain/validators/equipment';
import { validateExistingEquipmentType } from '../../domain/validators/equipmentType';
import type { EquipmentRepository } from '../../domain/repositories/equipmentRepository';
import type { NewEquipment } from '../../domain/entities/equipment';
import { EquipmentTypeRepository } from '../../domain/repositories/equipmentTypeRepository';

export async function createEquipment(
  equipmentRepo: EquipmentRepository,
  equipmentTypeRepo: EquipmentTypeRepository,
  input: NewEquipment
) {
  validateCreateEquipment(input);
  await validateExistingEquipmentType(equipmentTypeRepo, input.typeId);

  const newEquipment = await equipmentRepo.create({
    ...input,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return newEquipment;
}
