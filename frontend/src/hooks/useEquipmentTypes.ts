import { useQuery } from "react-query";
import { EquipmentNode, EquipmentType } from "@/types/EquipmentType";
import { useEquipmentTypeStore } from "@/store/useEquipmentType";

export function useEquipmentTypes() {
  const setEquipmentTypes = useEquipmentTypeStore((s) => s.setEquipmentTypes);

  return useQuery<EquipmentNode[]>({
    queryKey: ["equipment-types"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/equipment-types/tree");
      if (!res.ok) throw new Error("Erreur de chargement des types");
      return res.json();
    },
    onSuccess: (data) => {
      setEquipmentTypes(data);
    },
  });
}

export function extractHierarchy(type: EquipmentType | null) {
  let current = type;
  const ids: string[] = [];

  while (current) {
    ids.unshift(current.id);
    current = current.parent ?? null;
  }

  const [domainId = "", typeId = "", categoryId = "", subcategoryId = ""] = [
    ids[0],
    ids[1] ?? "",
    ids[2] ?? "",
    ids[3] ?? "",
  ];

  return { domainId, typeId, categoryId, subcategoryId };
}