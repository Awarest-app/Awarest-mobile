import { create } from 'zustand';
import { axiosGetProfile } from '../api/axios';
import { ProfileTypes } from '../type/profile.type';

interface ProfileState {
  profile: ProfileTypes;
  is_first_response: boolean;
  loading: boolean;
  fetchProfile: () => Promise<void>;
  isDayStreak: (value: boolean) => void;
  updateProfile: (updates: Partial<ProfileTypes>) => void;
  syncProfileWithBackend: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: {
    profileImg: '',
    userName: '',
    memberSince: '',
    dayStreak: 0,
    totalXP: 0,
    levelXP: 0,
    prevXP: 0,
    level: 0,
    noti: false,
    totalAnswers: 0,
    lastStreakDate: '',
  },
  is_first_response: false,
  loading: true,

  isDayStreak: (value) => {
    set((state) => ({ ...state, is_first_response: value }));
  },

  fetchProfile: async () => {
    set({ loading: true });
    try {
      const response = await axiosGetProfile();
      set({ profile: response, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  updateProfile: (updates) => {
    set((state) => ({
      profile: { ...state.profile, ...updates },
    }));
  },
  syncProfileWithBackend: async () => {
    const latestProfile = get().profile;
    if (!latestProfile) return;

    try {
      const response = await axiosGetProfile();
      set({ profile: response });
    } catch (error) {
    }
  },
}));
