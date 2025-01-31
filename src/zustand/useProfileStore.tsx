import { create } from 'zustand';
import { axiosGetProfile } from '../api/axios';
import { ProfileTypes } from '../type/profile.type';

// ✅ Zustand 스토어 정의
interface ProfileState {
  profile: ProfileTypes | null;
  loading: boolean;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<ProfileTypes>) => void;
  syncProfileWithBackend: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  is_first_response: false,//last streakDate보고 오늘이면 true
  loading: true,

  // ✅ 초기 프로필 로드
  fetchProfile: async () => {
    set({ loading: true });
    try {
      const response = await axiosGetProfile();
      console.log('Zustand!!!!!!!!!!!', response);
      set({ profile: response, loading: false });
    } catch (error) {
      console.error('Error fetching profile:', error);
      set({ loading: false });
    }
  },

  // ✅ 클라이언트에서 상태 직접 업데이트 (사용자 동작 기반)
  updateProfile: (updates) => {
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } : null,
    }));
  },
  //  const { updateProfile } = useProfileStore();
  //  updateProfile({ userName: "Alice" }); 

  // ✅ 필요할 때 백엔드와 동기화 (예: 앱 재시작 시)
  syncProfileWithBackend: async () => {
    const latestProfile = get().profile;
    if (!latestProfile) return;

    try {
      const response = await axiosGetProfile();
      set({ profile: response });
    } catch (error) {
      console.error('Error syncing profile:', error);
    }
  },
}));
