import { create } from 'zustand';
import { Earthquake } from '../types/types';

type TooltipInput = Partial<Earthquake> & {
  customCopy?: string;
};

interface TooltipState {
  selectedMarker: null | TooltipInput;
  setSelectedMarker: (payload: TooltipInput) => void;
  clearSelectedMarker: () => void;
}

export const useTooltipStore = create<TooltipState>()((set) => ({
  selectedMarker: null,
  setSelectedMarker: (payload: TooltipInput): void => {
    set({ selectedMarker: payload });
  },
  clearSelectedMarker: (): void => {
    set({ selectedMarker: null });
  },
}));
