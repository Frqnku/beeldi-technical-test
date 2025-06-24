import { EquipmentFilters, EquipmentResponse } from '@/types/Equipment';
import { useInfiniteQuery } from 'react-query';


const fetchEquipments = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam?: number;
  queryKey: [string, EquipmentFilters];
}): Promise<EquipmentResponse> => {
  const [, filters] = queryKey;

  const params = new URLSearchParams();

  params.set('page', pageParam.toString());
  params.set('limit', '20');

  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const res = await fetch(`http://localhost:3000/api/equipments?${params.toString()}`);
  if (!res.ok) throw new Error('Erreur de chargement des équipements');
  return res.json();
};

export const useInfiniteEquipments = (filters: EquipmentFilters = {}) => {
  return useInfiniteQuery<EquipmentResponse, Error, EquipmentResponse, [string, EquipmentFilters]>({
    queryKey: ['equipments', filters],
    queryFn: fetchEquipments,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
  });
};
