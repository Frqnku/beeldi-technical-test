import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import prisma from './infrastructure/repositories/prismaClient';

async function importEquipmentTypesFromCSV(filePath: string) {
  const stream = fs.createReadStream(filePath).pipe(csvParser());
  const cache = new Map<string, { id: string }>();

  async function findOrCreate(name: string, parentId: string | null) {
    const key = parentId ? `${parentId}__${name}` : name;
    if (cache.has(key)) return cache.get(key)!;

    let existing = await prisma.equipmentType.findFirst({
      where: { name, parentId },
    });

    if (!existing) {
      existing = await prisma.equipmentType.create({
        data: { name, parentId },
      });
    }

    cache.set(key, existing);
    return existing;
  }

  for await (const row of stream) {
    const levels = [
      row['Domaine']?.trim(),
      row['Type']?.trim(),
      row['Catégorie']?.trim(),
      row['Sous-catégorie']?.trim(),
    ].filter(Boolean);

    let parentId: string | null = null;

    for (const name of levels) {
      if (!name) continue;
      const node = await findOrCreate(name, parentId);
      parentId = node.id;
    }
  }

  console.log('Import terminé');
}

const csvFilePath = path.resolve(process.cwd(), 'equipmentType.csv');

importEquipmentTypesFromCSV(csvFilePath)
  .catch(console.error)
  .finally(() => process.exit());