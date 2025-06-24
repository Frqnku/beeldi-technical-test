
import { z } from 'zod';
import { UpdateEquipmentSchema } from '../../zod/equipmentSchema';
import { validateExistingEquipmentType } from '../../domain/validators/equipmentType';
import { EquipmentRepository } from '../../domain/repositories/equipmentRepository';
import { EquipmentTypeRepository } from '../../domain/repositories/equipmentTypeRepository';
import { validateExistingEquipment } from '../../domain/validators/equipment';

export const updateEquipment = async (
  equipmentRepo: EquipmentRepository,
  equipmentTypeRepo: EquipmentTypeRepository,
  equipment: z.infer<typeof UpdateEquipmentSchema>
) => {
	validateExistingEquipment(await equipmentRepo.findById(equipment.id));
	await validateExistingEquipmentType(equipmentTypeRepo, equipment.typeId);

	return equipmentRepo.update(equipment);
};