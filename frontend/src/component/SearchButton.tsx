import { useEquipmentFilterStore } from "@/store/useEquipmentFilter";
import { FaFilter } from "react-icons/fa6";

export default function SearchButton() {
	const applyFilters = useEquipmentFilterStore(state => state.applyFilters);
  return (
	  <button
		className="flex items-center bg-zinc-800 gap-x-2 text-white font-semibold px-4 py-2 shadow-md rounded-lg hover:bg-zinc-900 transition-colors"
		onClick={applyFilters}
	  >
		<FaFilter />
		Rechercher
	  </button>
  );
}