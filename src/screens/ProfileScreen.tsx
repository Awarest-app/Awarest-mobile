import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Header} from '../components/Header';
import MemoGradient from '../components/Hooks/MemoGradient';
import ProfileGradient from '../components/Hooks/ProfileGradient';
import SettingIcon from '../assets/svg/setting-icon.svg';
import {useRef} from 'react';
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import Settings from '../components/Hooks/SettingsModal';
import LevelModal from '../components/modals/LevelModal';
import { useProfileStore } from '../zustand/useProfileStore'
// 샘플용 임시 프로필 이미지(회색 원을 Image 대신 View로 표현할 수도 있음)

export default function ProfileScreesn() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const settingsRef = useRef<Modalize>(null);
  const { profile } = useProfileStore();
  const datas = profile;
  const {totalXP, levelXP, prevXP, level} = datas;
  const levelDatas = {totalXP, levelXP, prevXP, level};
  const defaultImage = require('../assets/images/logo.png');

  const handleLevelModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const openSettings = () => {
    settingsRef.current?.open();
  };
  
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-'); // 문자열을 '-' 기준으로 분할
  
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthAbbr = monthNames[parseInt(month, 10) - 1];
    return `${monthAbbr} ${day}, ${year}`;
  };
  const memberSince = formatDate(datas.memberSince);
  // useFocusEffect를 사용하여 화면에 집중될 때마다 fetchProfile 실행
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <LevelModal
        data={levelDatas}
        isOpen={isModalOpen}
        onClose={handleLevelModal}
      />
      <View style={styles.container}>
        <MemoGradient />
        <View style={styles.contentContainer}>
          <Header />
          <SafeAreaView style={styles.safeArea}>
            <Text style={styles.logo}>Coura</Text>
            <TouchableOpacity
              style={styles.settingButton}
              onPress={openSettings}>
              <SettingIcon />
            </TouchableOpacity>

            {/* 메인 프로필 박스(파란색 외곽선) */}
            <View style={styles.profileContainer}>
              <View style={styles.imgContainer}>
                <ProfileGradient />
                <View style={styles.profilePlaceholder}>
                <Image
                  source={datas.profileImg ? { uri: datas.profileImg } : defaultImage}
                  style={styles.profileImage}
                />
                </View>
                {/* <TouchableOpacity style={styles.shareButton}>
                  <ShareIcon />
                </TouchableOpacity> */}
                <View style={styles.nameContainer}>
                  <Text style={styles.userName}>{datas.userName}</Text>
                  <Text style={styles.userMemberSince}>
                    Member since {memberSince}
                  </Text>
                </View>
              </View>
              <View style={styles.MainDatas}>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{datas.dayStreak}</Text>
                  <Text style={styles.statLabel}>Day Streak</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{datas.totalXP}</Text>
                  <Text style={styles.statLabel}>Total XP</Text>
                </View>
              </View>
              <View style={styles.subDatas}>
                <TouchableOpacity
                  style={styles.infoBox}
                  activeOpacity={0.8}
                  onPress={handleLevelModal}>
                  <Text style={styles.infoItemTitle}>Level</Text>
                  <Text style={styles.infoItemValue}>{datas.level}</Text>
                </TouchableOpacity>
                <View style={styles.infoBox}>
                  <Text style={styles.infoItemTitle}>Total Answers</Text>
                  <Text style={styles.infoItemValue}>{datas.totalAnswers}</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
        <Settings ref={settingsRef} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  safeArea: {
    flex: 1,
    // justifyContent: 'center',
  },
  logo: {
    fontFamily: fonts.logo,
    marginBottom: 12,
    fontSize: 36,
    color: colors.primary,
    textAlign: 'center',
  },
  settingButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    position: 'absolute',
    borderRadius: 50,
    top: 5,
    right: 0,
    padding: 16,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  profileContainer: {
    gap: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: colors.card_border,
    borderRadius: 10,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  imgContainer: {
    gap: 6,
    width: '100%',
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
  },
  profilePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    // borderWidth: 2,
    // borderColor: colors.primary,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.card_border,
  },
  shareButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white_75,
    borderRadius: 50,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  nameContainer: {
    alignItems: 'center',
    // gap: 2,
  },
  userName: {
    fontFamily: fonts.roboto_semibold,
    fontSize: 22,
    color: colors.primary,
  },
  userMemberSince: {
    fontFamily: fonts.roboto_regular,
    fontSize: 16,
    color: colors.sub_mesasage,
  },
  MainDatas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statBox: {
    width: '46%',
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray_button,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.card_border,
    borderRadius: 10,
    gap: 6,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  statNumber: {
    fontFamily: fonts.roboto_bold,
    fontSize: 22,
    color: colors.primary,
  },
  statLabel: {
    fontFamily: fonts.roboto_regular,
    fontSize: 16,
    color: colors.sub_mesasage,
  },
  subDatas: {
    gap: 10,
  },
  infoBox: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.card_border,
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  infoItemTitle: {
    fontFamily: fonts.lato_regular,
    fontSize: 16,
    color: colors.black,
  },
  infoItemValue: {
    fontFamily: fonts.roboto_medium,
    fontSize: 16,
    color: colors.black,
  },
});
