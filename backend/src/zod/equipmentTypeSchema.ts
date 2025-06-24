import { z } from 'zod';

export const EquipmentTypeSchema = z.object({
  id: z.string().min(1, { message: 'ID requis' }),
  name: z.string().min(1, { message: 'Le nom est requis' }),
  parentId: z.string().min(1, { message: 'parentId requis' }).nullable(),
});

export const CreateEquipmentTypeSchema = z.object({
  name: z.string().min(1, { message: 'Le nom est requis' }),
  parentId: z.string().min(1, { message: 'parentId requis' }).nullable().optional(),
});

export const UpdateEquipmentTypeSchema = z.object({
  id: z.string().min(1, { message: 'ID requis' }),
  name: z.string().min(1, { message: 'Le nom est requis' }).optional(),
  parentId: z.string().min(1, { message: 'parentId requis' }).nullable().optional(),
});
