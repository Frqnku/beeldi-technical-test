"use client";

import { useEquipmentFilterStore } from '@/store/useEquipmentFilter';
import { useEquipmentTypeStore } from '@/store/useEquipmentType';
import SearchButton from './SearchButton';
import { useEquipmentOptions } from '@/hooks/useEquipmentFilter';

export default function Filter() {
  const { filters, setFilter } = useEquipmentFilterStore();
  const { equipmentTypes } = useEquipmentTypeStore();
  
  const domainOptions = equipmentTypes;
  const { typeOptions, categoryOptions, subcategoryOptions } = useEquipmentOptions(filters, equipmentTypes);

  const onChangeDomain = (value: string) => {
    setFilter('domain', value);
    setFilter('type', '');
    setFilter('category', '');
    setFilter('subcategory', '');
  };

  const onChangeType = (value: string) => {
    setFilter('type', value);
    setFilter('category', '');
    setFilter('subcategory', '');
  };

  const onChangeCategory = (value: string) => {
    setFilter('category', value);
    setFilter('subcategory', '');
  };

  const onChangeSubcategory = (value: string) => {
    setFilter('subcategory', value);
  };

  return (
    <div className="w-full flex flex-wrap gap-4 p-4 bg-white shadow-md rounded-xl items-center">
      <input
        type="text"
        placeholder="Rechercher par marque ou modèle..."
        className="flex-1 p-2 border border-gray-300 rounded-lg min-w-[200px]"
        value={filters.search}
        onChange={(e) => setFilter('search', e.target.value.trim())}
      />

      <select
        value={filters.domain}
        onChange={(e) => onChangeDomain(e.target.value.trim())}
        className="p-2 border border-gray-300 rounded-lg"
      >
        <option value="">Tous les domaines</option>
        {domainOptions.map((d) => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      {filters.domain && typeOptions.length > 0 &&<select
        value={filters.type}
        onChange={(e) => onChangeType(e.target.value.trim())}
        className="p-2 border border-gray-300 rounded-lg"
        disabled={!filters.domain || typeOptions.length === 0}
      >
        <option value="">Tous les types</option>
        {typeOptions.map((t) => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>}

      {filters.type && categoryOptions.length > 0 && <select
        value={filters.category}
        onChange={(e) => onChangeCategory(e.target.value.trim())}
        className="p-2 border border-gray-300 rounded-lg"
        disabled={!filters.type || categoryOptions.length === 0}
      >
        <option value="">Toutes les catégories</option>
        {categoryOptions.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>}

      {filters.category && subcategoryOptions.length > 0 && <select
        value={filters.subcategory}
        onChange={(e) => onChangeSubcategory(e.target.value.trim())}
        className="p-2 border border-gray-300 rounded-lg"
        disabled={!filters.category || subcategoryOptions.length === 0}
      >
        <option value="">Toutes les sous-catégories</option>
        {subcategoryOptions.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>}

      <SearchButton />

    </div>

  );
}
