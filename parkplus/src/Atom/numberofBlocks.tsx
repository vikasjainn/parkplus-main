import {atom} from 'recoil';

export const numberofBlocks = atom<number>({
  key: 'numberofBlocks',
  default: 0,
});

