import { create } from 'zustand';
import { Earthquake } from '../types/types';

interface TooltipState {
  selectedMarker:
    | null
    | (Pick<Earthquake, 'distance' | 'properties'> & { customCopy?: string });
  setSelectedMarker: (foo: any) => void;
  clearSelectedMarker: () => void;
}

export const useTooltipStore = create<TooltipState>()((set) => ({
  selectedMarker: null,
  setSelectedMarker: (payload: any): void => {
    set({ selectedMarker: payload });
  },
  clearSelectedMarker: (): void => {
    set({ selectedMarker: null });
  },
}));
