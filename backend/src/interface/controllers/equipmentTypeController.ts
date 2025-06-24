import { Request, Response } from 'express';
import { getEquipmentTypeTree } from '../../application/use-cases/getEquipmentTypeTree';

export async function getEquipmentTypeTreeController(req: Request, res: Response) {
  try {
    const tree = await getEquipmentTypeTree();
    res.json(tree);
  } catch (error) {
    console.error('Erreur récupération arborescence des types', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}
