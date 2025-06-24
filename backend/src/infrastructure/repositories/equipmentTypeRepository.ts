import prisma from './prismaClient';
import { EquipmentType, EquipmentTypeTree } from '../../domain/entities/equipmentType';
import { EquipmentTypeRepository } from '../../domain/repositories/equipmentTypeRepository';

export async function getTypeTree(typeId: string): Promise<EquipmentTypeTree | null> {
  const type = await prisma.equipmentType.findUnique({
    where: { id: typeId },
  });

  if (!type) return null;

  if (!type.parentId) {
    return {
      id: type.id,
      name: type.name,
      parentId: null,
      parent: null,
    };
  }

  const parent = await getTypeTree(type.parentId);

  return {
    id: type.id,
    name: type.name,
    parentId: type.parentId,
    parent,
  };
}

export async function collectDescendantTypeIds(typeId: string): Promise<string[]> {
  const ids: string[] = [];
  const stack: string[] = [typeId];

  while (stack.length > 0) {
    const currentId = stack.pop();
    if (!currentId) continue;

    ids.push(currentId);

    const children = await prisma.equipmentType.findMany({
      where: { parentId: currentId },
      select: { id: true },
    });

    stack.push(...children.map(c => c.id));
  }

  return ids;
}

export const prismaEquipmentTypeRepository: EquipmentTypeRepository = {
  async typeExists(id: string): Promise<boolean> {
    const count = await prisma.equipmentType.count({ where: { id } });
    return count > 0;
  },

  async findAll(): Promise<EquipmentType[]> {
    return prisma.equipmentType.findMany();
  },

  async findChildren(parentId: string) {
    return prisma.equipmentType.findMany({
      where: { parentId },
    });
  },
};
