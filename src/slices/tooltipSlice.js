import { create } from 'zustand';

export const useTooltipStore = create((set) => ({
  selectedMarker: null,
  setSelectedMarker: (payload) => {
    set({ selectedMarker: payload });
  },
  clearSelectedMarker: () => {
    set({ selectedMarker: null });
  },
}));
