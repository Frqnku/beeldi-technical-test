export type EquipmentType = {
  id: string;
  name: string;
  parentId: string | null;
  parent?: EquipmentType | null;
};

export type EquipmentNode = {
  id: string;
  name: string;
  parentId: string | null;
  children: EquipmentNode[];
};