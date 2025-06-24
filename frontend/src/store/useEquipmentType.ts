import { create } from "zustand";
import { EquipmentNode } from "@/types/EquipmentType";

type EquipmentTypeStore = {
  equipmentTypes: EquipmentNode[];
  setEquipmentTypes: (data: EquipmentNode[]) => void;
};

export const useEquipmentTypeStore = create<EquipmentTypeStore>((set) => ({
  equipmentTypes: [],
  setEquipmentTypes: (data) => set({ equipmentTypes: data }),
}));