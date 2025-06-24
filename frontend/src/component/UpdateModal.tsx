"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useEquipmentTypeStore } from "@/store/useEquipmentType";
import { Equipment } from "@/types/Equipment";
import { extractHierarchy } from "@/hooks/useEquipmentTypes";
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from "react-query";

const schema = z.object({
  name: z.string().min(1, "Nom requis"),
  model: z.string().min(1, "Modèle requis"),
  brand: z.string().min(1, "Marque requise"),
  domainId: z.string().min(1, "Domaine requis"),
  typeId: z.string().optional(),
  categoryId: z.string().optional(),
  subcategoryId: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface UpdateModalProps {
  equipment: Equipment;
  setSelectedEquipment: (equipment: Equipment | null) => void;
}

export default function UpdateModal({ equipment, setSelectedEquipment }: UpdateModalProps) {
  const { equipmentTypes } = useEquipmentTypeStore();
  const {
	domainId: defaultDomainId,
	typeId: defaultTypeId,
	categoryId: defaultCategoryId,
	subcategoryId: defaultSubcategoryId,
  } = extractHierarchy(equipment.type);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
		name: equipment.name,
		model: equipment.model,
		brand: equipment.brand,
		domainId: defaultDomainId,
		typeId: defaultTypeId,
		categoryId: defaultCategoryId,
		subcategoryId: defaultSubcategoryId,
    },
  });

	useEffect(() => {
		const {
			domainId: defaultDomainId,
			typeId: defaultTypeId,
			categoryId: defaultCategoryId,
			subcategoryId: defaultSubcategoryId,
		} = extractHierarchy(equipment.type);

		reset({
			name: equipment.name,
			model: equipment.model,
			brand: equipment.brand,
			domainId: defaultDomainId,
			typeId: defaultTypeId,
			categoryId: defaultCategoryId,
			subcategoryId: defaultSubcategoryId,
		});
	}, [equipment, reset]);

  const domainId = watch("domainId");
  const typeId = watch("typeId");
  const categoryId = watch("categoryId");

	const selectedDomain = useMemo(
		() => equipmentTypes.find((d) => d.id === domainId),
		[domainId, equipmentTypes]
	);
	const types = useMemo(() => selectedDomain?.children ?? [], [selectedDomain]);

	const selectedType = useMemo(() => types.find((t) => t.id === typeId), [typeId, types]);
	const categories = useMemo(() => selectedType?.children ?? [], [selectedType]);

	const selectedCategory = useMemo(() => categories.find((c) => c.id === categoryId), [categoryId, categories]);
	const subcategories = useMemo(() => selectedCategory?.children ?? [], [selectedCategory]);

	  const queryClient = useQueryClient();

  const { mutate: updateEquipment } = useMutation({
    mutationFn: async (data: FormValues) => {
      const equipmentTypeId =
        data.subcategoryId?.trim() ||
        data.categoryId?.trim() ||
        data.typeId?.trim() ||
        data.domainId.trim();

      const payload = {
        name: data.name.trim(),
        model: data.model.trim(),
        brand: data.brand.trim(),
        typeId: equipmentTypeId,
      };

      const res = await fetch(`http://localhost:3000/api/equipment/${equipment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }
    },
    onSuccess: () => {
      toast.success("Équipement mis à jour !");
      queryClient.invalidateQueries({ queryKey: ["equipment"] });
      setSelectedEquipment(null);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const onSubmit = async (data: FormValues) => {
    updateEquipment(data);
	reset();
  };

  if (!equipment) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Modifier l’équipement</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("name")} placeholder="Nom" className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input {...register("brand")} placeholder="Marque" className="w-full border p-2 rounded" />
          {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}

          <input {...register("model")} placeholder="Modèle" className="w-full border p-2 rounded" />
          {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}

          <select {...register("domainId")} className="w-full border p-2 rounded">
            <option value="">Sélectionner un domaine</option>
            {equipmentTypes.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.domainId && <p className="text-red-500 text-sm">{errors.domainId.message}</p>}

          <select {...register("typeId")} className="w-full border p-2 rounded" disabled={!domainId}>
            <option value="">Sélectionner un type</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <select {...register("categoryId")} className="w-full border p-2 rounded" disabled={!typeId}>
            <option value="">Sélectionner une catégorie</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select {...register("subcategoryId")} className="w-full border p-2 rounded" disabled={!categoryId}>
            <option value="">Sélectionner une sous-catégorie</option>
            {subcategories.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setSelectedEquipment(null)} className="px-4 py-2 border rounded">
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500">
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
