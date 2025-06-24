export type EquipmentType = {
  id: string;
  name: string;
  parentId: string | null;
};

export type EquipmentTypeTree = {
  id: string;
  name: string;
  parentId: string | null;
  parent?: EquipmentTypeTree | null;
};

export type EquipmentTypeNode = EquipmentType & {
  children: EquipmentTypeNode[];
};