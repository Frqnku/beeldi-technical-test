import { Equipment } from "@prisma/client";
import { NewEquipment } from "../entities/equipment";

export function validateCreateEquipment(input: NewEquipment) {
	if (!input.name || input.name.trim() === '')
		throw new Error("Le nom de l'équipement est requis");
	if (!input.brand || input.brand.trim() === '')
		throw new Error("La marque est requise");
	if (!input.model || input.model.trim() === '')
		throw new Error("Le modèle est requis");
	if (!input.typeId || input.typeId.trim() === '')
	  throw new Error("Le modèle est requis");
}

export function validateExistingEquipment(
  existingEquipment: Equipment | null | undefined
) {
	if (!existingEquipment) {
		throw new Error("Un équipement avec les mêmes détails existe déjà");
	}
}