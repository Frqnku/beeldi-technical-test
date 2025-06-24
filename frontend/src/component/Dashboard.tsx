"use client";
import { useEffect, useRef, useState } from "react";
import Row from "./Row";
import { Equipment } from "@/types/Equipment";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import { useInfiniteEquipments } from "@/hooks/useInfiniteEquipments";
import { useEquipmentTypes } from '@/hooks/useEquipmentTypes';
import { useEquipmentFilterStore } from "@/store/useEquipmentFilter";

export default function Dashboard() {
  useEquipmentTypes();

  const [selectedEquipmentToDelete, setSelectedEquipmentToDelete] = useState<Equipment | null>(null);
  const [selectedEquipmentToUpdate, setSelectedEquipmentToUpdate] = useState<Equipment | null>(null);

  const appliedFilters = useEquipmentFilterStore(state => state.appliedFilters);

  const handleDelete = (equipment: Equipment) => {
    setSelectedEquipmentToDelete(equipment);
  };

  const handleUpdate = (equipment: Equipment) => {
	setSelectedEquipmentToUpdate(equipment);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteEquipments(appliedFilters);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const currentLoadMoreRef = loadMoreRef.current;

    if (currentLoadMoreRef) observer.observe(currentLoadMoreRef);

    return () => {
      if (currentLoadMoreRef) observer.unobserve(currentLoadMoreRef);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-col items-center h-5/6 w-full bg-white shadow-md rounded-2xl mt-2">
      <div className="w-full flex items-center py-6 border-b border-gray-200">
        <div className="flex justify-between w-full px-8">
          <span className="font-semibold w-2/6">Nom</span>
          <span className="font-semibold w-1/3">Domaine</span>
          <span className="font-semibold w-1/3">Type</span>
          <span className="font-semibold w-1/3">Catégorie</span>
          <span className="font-semibold w-1/3">Sous-catégorie</span>
          <span className="font-semibold w-1/3">Marque</span>
          <span className="font-semibold w-2/4">Modèle</span>
        </div>
      </div>

      <div className="w-full flex-col flex items-center p-4 overflow-y-auto">
      {!isError ? (
        data?.pages.every(page => page.equipments.length === 0) ? (
          <p>Aucun équipement trouvé.</p>
        ) : (
          data?.pages.map((page) =>
            page.equipments.map((equipment: Equipment) => (
              <Row
                key={equipment.id}
                equipment={equipment}
                onDeleteClick={handleDelete}
                onUpdateClick={handleUpdate}
              />
            ))
          )
        )
      ) : (
        <p>Une erreur est survenue lors du chargement.</p>
      )}

      <div ref={loadMoreRef} className="h-10" />
      {isFetchingNextPage && <p>Chargement…</p>}
      </div>

	  {selectedEquipmentToDelete && (
		<DeleteModal equipment={selectedEquipmentToDelete} setSelectedEquipment={setSelectedEquipmentToDelete} />
	  )}

	  {selectedEquipmentToUpdate && (
		<UpdateModal equipment={selectedEquipmentToUpdate} setSelectedEquipment={setSelectedEquipmentToUpdate} />
	  )}

    </div>
  );
}
