import { useMemo } from "react";
import { EquipmentFilters } from "@/types/Equipment";
import { EquipmentNode } from "@/types/EquipmentType";

export const useEquipmentOptions = (filters: EquipmentFilters, equipmentTypes: EquipmentNode[]) => {
  const typeOptions = useMemo(() => {
    const domain = equipmentTypes.find((et) => et.id === filters.domain);
    return domain?.children ?? [];
  }, [filters.domain, equipmentTypes]);

  const categoryOptions = useMemo(() => {
    const type = typeOptions.find((et) => et.id === filters.type);
    return type?.children ?? [];
  }, [filters.type, typeOptions]);

  const subcategoryOptions = useMemo(() => {
    const category = categoryOptions.find((et) => et.id === filters.category);
    return category?.children ?? [];
  }, [filters.category, categoryOptions]);

  return { typeOptions, categoryOptions, subcategoryOptions };
};