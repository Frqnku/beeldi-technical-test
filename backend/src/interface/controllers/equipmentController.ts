import { Request, Response } from 'express';
import { CreateEquipmentSchema, UpdateEquipmentSchema } from '../../zod/equipmentSchema';
import { createEquipment } from '../../application/use-cases/createEquipment';
import { getAllEquipments } from '../../application/use-cases/getAllEquipments';
import { deleteEquipment } from '../../application/use-cases/deleteEquipment';
import { prismaEquipmentRepository } from '../../infrastructure/repositories/equipmentRepository';
import { prismaEquipmentTypeRepository } from '../../infrastructure/repositories/equipmentTypeRepository';
import { updateEquipment } from '../../application/use-cases/updateEquipment';

export const createEquipmentController = async (req: Request, res: Response) => {
  const parsed = CreateEquipmentSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ errors: "Il manque des champs requis" });
  }

  try {
    const newEquipment = await createEquipment(
      prismaEquipmentRepository,
      prismaEquipmentTypeRepository,
      parsed.data
    );

    return res.status(201).json(newEquipment);
  } catch (error: any) {
    console.error(error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

export const getEquipmentsController = async (req: Request, res: Response) => {
  try {
    const filters = {
      search: req.query.search as string,
      typeId: req.query.typeId as string,
      page: req.query.page as string,
      limit: req.query.limit as string,
    };

    const equipments = await getAllEquipments(prismaEquipmentRepository, filters);

    res.status(200).json(equipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des équipements' });
  }
};

export const updateEquipmentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsed = UpdateEquipmentSchema.safeParse({ ...req.body, id });

  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.format() });
  }

  try {
    const updatedEquipment = await updateEquipment(
      prismaEquipmentRepository,
      prismaEquipmentTypeRepository,
      parsed.data
    );

    return res.status(200).json(updatedEquipment);
  } catch (error: any) {
    console.error(error);

    if (error.message === 'Équipement non trouvé') {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Erreur lors de la mise à jour de l’équipement' });
  }
};

export const deleteEquipmentController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteEquipment(prismaEquipmentRepository, id);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    if (error.message === 'Équipement non trouvé') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erreur lors de la suppression de l’équipement' });
  }
};
