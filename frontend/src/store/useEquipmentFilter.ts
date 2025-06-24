import { create } from 'zustand';
import { EquipmentFilters } from '@/types/Equipment';

interface EquipmentFilterState {
  filters: EquipmentFilters;
  appliedFilters: EquipmentFilters;
  setFilter: (field: keyof EquipmentFilters, value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

export const useEquipmentFilterStore = create<EquipmentFilterState>((set, get) => ({
  filters: {
    search: '',
    domain: '',
    type: '',
    category: '',
    subcategory: '',
  },
  appliedFilters: {
    search: '',
    domain: '',
    type: '',
    category: '',
    subcategory: '',
  },
  setFilter: (field, value) => {
    const currentFilters = get().filters;

    const resetFields: Partial<EquipmentFilters> = {};
    if (field === 'domain') {
      resetFields.type = '';
      resetFields.category = '';
      resetFields.subcategory = '';
    }
    if (field === 'type') {
      resetFields.category = '';
      resetFields.subcategory = '';
    }
    if (field === 'category') {
      resetFields.subcategory = '';
    }

    const updatedFilters = {
      ...currentFilters,
      ...resetFields,
      [field]: value,
    };

    set({ filters: updatedFilters });
  },
  applyFilters: () => {
    const { filters } = get();
    const { search, subcategory, category, type, domain } = filters;
    set({ appliedFilters: {
      ...(search ? { search } : {}),
      typeId: subcategory || category || type || domain || undefined,
    } });
  },
  resetFilters: () => {
    set({
      filters: {
        search: '',
        domain: '',
        type: '',
        category: '',
        subcategory: '',
      },
      appliedFilters: {
        search: '',
        domain: '',
        type: '',
        category: '',
        subcategory: '',
      },
    });
  },
}));
