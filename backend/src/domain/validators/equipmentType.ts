import { EquipmentTypeTree } from "../entities/equipmentType";
import { EquipmentTypeRepository } from "../repositories/equipmentTypeRepository";
 
export async function validateExistingEquipmentType(equipmentTypeRepo: EquipmentTypeRepository, typeId: string) {
	const typeExists = await equipmentTypeRepo.typeExists(typeId);
	if (!typeExists) {
		throw new Error("Type d'équipement invalide");
	}
} 
 
export function validateTypeTree(
  equipmentTypeFromDb: EquipmentTypeTree | null | undefined,
  typeTree: EquipmentTypeTree | null | undefined
): boolean {
  if (!equipmentTypeFromDb && !typeTree) return true;
  if (!equipmentTypeFromDb || !typeTree) return false;

  if (
    equipmentTypeFromDb.id !== typeTree.id ||
    equipmentTypeFromDb.name !== typeTree.name ||
    (equipmentTypeFromDb.parentId || null) !== (typeTree.parentId || null)
  ) {
    return false;
  }

  return validateTypeTree(equipmentTypeFromDb.parent, typeTree.parent);
}