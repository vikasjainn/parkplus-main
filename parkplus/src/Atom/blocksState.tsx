import { atom, selector } from 'recoil';
import { numberofBlocks } from './numberofBlocks';

export interface BlockObject {
  id: number;
  parked: boolean;
  parked_at: null | string; 
  Car_no: null | string; 
}

export const initializeblockState = selector<BlockObject[]>({
  key: 'initializeParkingState',
  get: ({ get }) => {
    const spaces = get(numberofBlocks);
    return Array.from({ length: spaces }, (_, index) => ({
      id: index + 1, 
      parked: false,
      parked_at: null,
      fare: 0,
      Car_no: null,
    }));
  },
});

export const blocksState = atom<BlockObject[]>({
  key: 'blocksState',
  default: initializeblockState, // Initialize blocksState with the selector
});