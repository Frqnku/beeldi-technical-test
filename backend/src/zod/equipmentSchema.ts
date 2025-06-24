import { z } from 'zod';

export const CreateEquipmentSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  typeId: z.string().min(1, 'Id requis'),
  brand: z.string().min(1, 'La marque est requise'),
  model: z.string().min(1, 'Le modèle est requis'),
});

export const UpdateEquipmentSchema = z.object({
  id: z.string().min(1, 'Id requis'),
  name: z.string().min(1, 'Le nom est requis'),
  typeId: z.string().min(1, 'Id requis'),
  brand: z.string().min(1, 'La marque est requise'),
  model: z.string().min(1, 'Le modèle est requis'),
});