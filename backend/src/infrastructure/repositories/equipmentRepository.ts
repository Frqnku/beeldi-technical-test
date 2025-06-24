import prisma from './prismaClient';
import { EquipmentRepository } from '../../domain/repositories/equipmentRepository';
import { collectDescendantTypeIds, getTypeTree } from './equipmentTypeRepository';
import { Prisma } from '@prisma/client';

export const prismaEquipmentRepository: EquipmentRepository = {
  async create(equipmentData) {
    const equipment = await prisma.equipment.create({
      data: equipmentData,
    });
    return equipment;
  },

  async findById(id) {
    const equipment = await prisma.equipment.findUnique({ where: { id } });
    if (!equipment) return null;
    const type = await getTypeTree(equipment.typeId);
    return { ...equipment, type };
  },

  async findAllWithFilters(filters) {
    const { search, typeId, limit, page } = filters;

    const where: Prisma.EquipmentWhereInput = {};

    if (typeId) {
      const allTypeIds = await collectDescendantTypeIds(typeId);
      where.typeId = { in: allTypeIds };
    }

    if (search) {
      where.OR = [
        { brand: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
      ];
    }

    const equipments = await prisma.equipment.findMany({
      where,
      take: Number(limit),
      skip: Number(page) * Number(limit),
    });

    const totalCount = await prisma.equipment.count({ where });

    const equipmentsWithType = await Promise.all(
      equipments.map(async (equipment) => {
        const typeTree = await getTypeTree(equipment.typeId);

        if (!typeTree) {
          throw new Error(`Type introuvable pour equipment id=${equipment.id} avec typeId=${equipment.typeId}`);
        }

        return {
          ...equipment,
          type: typeTree,
        };
      })
    );

    const hasMore = (Number(page) + 1) * Number(limit) < totalCount;
    const nextPage = hasMore ? Number(page) + 1 : undefined;

    return {
      equipments: equipmentsWithType,
      hasMore,
      nextPage,
    };
  },

  async update(equipment) {
    return prisma.equipment.update({
      where: { id: equipment.id },
      data: equipment,
    });
  },

  async delete(id) {
    await prisma.equipment.delete({ where: { id } });
  },
};
