import { EquipmentType, EquipmentTypeNode } from '../entities/equipmentType';

export interface EquipmentTypeRepository {
  typeExists(id: string): Promise<boolean>;
  findAll: () => Promise<EquipmentType[]>;
  findChildren: (parentId: string) => Promise<EquipmentType[]>;
}

export function buildEquipmentTypeTree(types: EquipmentType[]): EquipmentTypeNode[] {
  const typeMap = new Map<string, EquipmentTypeNode>();

  types.forEach(type => {
    typeMap.set(type.id, { ...type, children: [] });
  });

  const tree: EquipmentTypeNode[] = [];

  typeMap.forEach(node => {
    if (node.parentId) {
      const parent = typeMap.get(node.parentId);
      if (parent) {
        parent.children.push(node);
      }
    } else {
      tree.push(node);
    }
  });

  return tree;
}