import { Equipment } from "@/types/Equipment";
import { useMutation, useQueryClient } from "react-query";
import toast from 'react-hot-toast';

export default function DeleteModal({
  equipment,
  setSelectedEquipment,
}: {
  equipment: Equipment | null;
  setSelectedEquipment: (equipment: Equipment | null) => void;
}) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`http://localhost:3000/api/equipment/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Échec de la suppression");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
      setSelectedEquipment(null);
	  toast.success("Équipement supprimé avec succès !");
    },
    onError: () => {
      toast.error("Erreur lors de la suppression.");
    },
  });

  const confirmDelete = () => {
    if (equipment?.id) {
      mutate(equipment.id);
    }
  };

  if (!equipment) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
				<h2 className="text-lg font-semibold mb-4">
					Confirmer la suppression
				</h2>
				<p className="mb-4">
					Êtes-vous sûr de vouloir supprimer <strong>{equipment?.name}</strong> ?
				</p>
				<div className="flex justify-end space-x-4">
					<button
					onClick={() => setSelectedEquipment(null)}
					className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
					>
						Annuler
					</button>
					<button
					onClick={confirmDelete}
					className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
					>
					Supprimer
					</button>
				</div>
			</div>
		</div>
	);
}
