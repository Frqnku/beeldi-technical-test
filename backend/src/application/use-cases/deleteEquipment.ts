import { EquipmentRepository } from '../../domain/repositories/equipmentRepository';

export async function deleteEquipment(
  equipmentRepo: EquipmentRepository,
  id: string
) {
  const existing = await equipmentRepo.findById(id);
  if (!existing) {
    throw new Error('Équipement non trouvé');
  }

  await equipmentRepo.delete(id);
}
