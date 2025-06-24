import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { Equipment } from "@/types/Equipment";
import { EquipmentType } from "@/types/EquipmentType";

export default function Row({
  equipment,
  onDeleteClick,
  onUpdateClick,
}: {
  equipment: Equipment;
  onDeleteClick: (equipment: Equipment) => void;
  onUpdateClick: (equipment: Equipment) => void;
}) {
  const extractHierarchyFromType = (typeNode?: EquipmentType | null) => {
    const hierarchy = {
      domain: "-",
      category: "-",
      type: "-",
      subcategory: "-",
    };

    let current = typeNode;
    const levels: EquipmentType[] = [];

    while (current) {
      levels.unshift(current);
      current = current.parent ?? null;
    }

    if (levels[0]) hierarchy.domain = levels[0].name;
    if (levels[1]) hierarchy.type = levels[1].name;
    if (levels[2]) hierarchy.category = levels[2].name;
    if (levels[3]) hierarchy.subcategory = levels[3].name;

    return hierarchy;
  }

  const { domain, category, type, subcategory } = extractHierarchyFromType(
    equipment.type
  );

  return (
    <div className="w-full flex items-center p-4 border-b border-gray-200">
      <div className="flex justify-between w-full gap-x-4 md:gap-x-0">
        <span className="font-medium w-2/6">{equipment.name}</span>
        <span className="font-medium w-1/3">{domain}</span>
        <span className="font-medium w-1/3">{type}</span>
        <span className="font-medium w-1/3">{category}</span>
        <span className="font-medium w-1/3">{subcategory}</span>
        <span className="font-medium w-1/3">{equipment.brand}</span>
        <span className="font-medium w-1/3">{equipment.model}</span>
        <div className="flex justify-end space-x-4 w-1/6">
          <button
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={() => onUpdateClick(equipment)}
          >
            <FaPencil className="inline mr-1" />
          </button>
          <button
            className="text-sm text-red-500 hover:text-red-700"
            onClick={() => onDeleteClick(equipment)}
          >
            <FaTrashCan className="inline mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
