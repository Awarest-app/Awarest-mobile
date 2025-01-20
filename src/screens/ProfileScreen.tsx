import React from 'react';
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
import ShareIcon from '../assets/svg/share-icon.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '../type/route.type';
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';

// 샘플용 임시 프로필 이미지(회색 원을 Image 대신 View로 표현할 수도 있음)
const ProfilePlaceholder = () => (
  <View style={styles.profilePlaceholder}>
    {/* 실제로는 Image 컴포넌트로 소스 불러오기 가능 */}
    {/* 예: <Image source={{uri: 'https://...'}} style={styles.profileImage} /> */}
  </View>
);

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const userName = 'Sarah Johnson';
  const memberSince = 'January 2025';
  const dayStreak = 7;
  const totalXP = 1222450;
  const level = 1;
  const totalAnswers = 12;
  const achievements = 2;

  return (
    <View style={styles.container}>
      <MemoGradient />
      <View style={styles.contentContainer}>
      <Header />
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.logo}>Coura</Text>
        <TouchableOpacity style={styles.settingButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <SettingIcon />
        </TouchableOpacity>

        {/* 메인 프로필 박스(파란색 외곽선) */}
        <View style={styles.profileContainer}>
          {/* 내부 dotted 박스 */}
            {/* 프로필 섹션 */}
            <View style={styles.imgContainer}>
              <ShareIcon />
              <ProfileGradient />
              <ProfilePlaceholder />
              <TouchableOpacity style={styles.shareButton}>
                <ShareIcon />
              </TouchableOpacity>
              <View style={styles.nameContainer}>
                <Text style={styles.userName}>
                  {userName}
                </Text>
                <Text style={styles.userMemberSince}>
                  Member since {memberSince}
                </Text>
              </View>
            </View>

            <View style={styles.MainStats}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{dayStreak}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{totalXP}</Text>
                <Text style={styles.statLabel}>Total XP</Text>
              </View>
            </View>
            {/* 상세 정보 목록 */}
            <View style={styles.subStats}>
              <View style={styles.infoBox}>
                <Text style={styles.infoItemTitle}>Level</Text>
                <Text style={styles.infoItemValue}>{level}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoItemTitle}>Total Answers</Text>
                <Text style={styles.infoItemValue}>{totalAnswers}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoItemTitle}>Achievements</Text>
                <Text style={styles.infoItemValue}>{achievements}</Text>
              </View>
            </View>
        </View>
      </SafeAreaView>
      </View>
    </View>
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
  /* -------------------------
     상단 상태 표시 영역
  --------------------------*/
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
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 50,
    top: 5,
    right: 0,
    padding: 16,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  profileContainer: {
    gap: 24,
    backgroundColor: 'white',
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
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    padding: 16,
    borderRadius: 10,
  },
  profilePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: '#cccccc', // 회색 배경(임시)
  },
  shareButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
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
  /* -------------------------
     간단한 통계(7 Day Streak, XP)
  --------------------------*/
  MainStats: {
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
    // 그림자나 테두리를 주고 싶다면 추가 가능
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
  /* -------------------------
     상세 정보 목록
  --------------------------*/
  subStats: {
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
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.card_border,
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  infoItemTitle: {
    fontFamily: fonts.lato_regular,
    fontSize: 16,
    color: 'black',
  },
  infoItemValue: {
    fontFamily: fonts.roboto_medium,
    fontSize: 16,
    color: 'black',
  },
  /* -------------------------
     하단 탭바
  --------------------------*/
  tabBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});
