import { create } from 'zustand';
import { axiosGetUsersId } from '../api/axios';

interface useIdState {
  id: string;
  setId:() => Promise<void>;
}

export const useId = create<useIdState>((set, get) => ({
  id: '',

  setId: async () => {
    const id = await axiosGetUsersId();
    set({ id: id });
  }
}));