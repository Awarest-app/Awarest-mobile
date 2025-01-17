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
import LinearGradient from 'react-native-linear-gradient';
import colors from '../styles/colors';
import {globalStyle} from '../styles/global';

// 샘플용 임시 프로필 이미지(회색 원을 Image 대신 View로 표현할 수도 있음)
const ProfilePlaceholder = () => (
  <View style={styles.profilePlaceholder}>
    {/* 실제로는 Image 컴포넌트로 소스 불러오기 가능 */}
    {/* 예: <Image source={{uri: 'https://...'}} style={styles.profileImage} /> */}
  </View>
);

export default function ProfileScreen() {
  const userName = 'Sarah Johnson';
  const memberSince = 'January 2025';
  const dayStreak = 7;
  const totalXP = 2450;
  const level = 1;
  const totalAnswers = 12;
  const achievements = 2;

  return (
    <LinearGradient
      colors={[colors.green_gradientStart, colors.green_gradientEnd]} // 그라디언트 색상 설정
      start={{x: 0, y: 0.4}} // 그라디언트 시작점
      end={{x: 0, y: 1}} // 그라디언트 종료점
      style={globalStyle.gradientContainer} // 전체 배경 적용
    >
      <SafeAreaView style={styles.safeArea}>
        {/* 상단 상태 표시 영역 */}

        {/* 브랜드 로고 / 타이틀 */}
        <Header />
        <Text style={styles.brandTitle}>Coura</Text>

        {/* 메인 프로필 박스(파란색 외곽선) */}
        <View style={styles.outerCardContainer}>
          {/* 내부 dotted 박스 */}
          <View style={styles.innerCardContainer}>
            {/* 프로필 섹션 */}
            <ProfilePlaceholder />
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userMemberSince}>
              Member since {memberSince}
            </Text>

            {/* 간단한 통계(7 Day Streak, 2450 XP) */}
            <View style={styles.statsRow}>
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
    </LinearGradient>
  );
}

const BORDER_BLUE = '#2979FF';
const BRAND_GREEN = '#2e856e';

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1, // 화면 전체를 채우기 위해 flex: 1 설정
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent', // 배경 투명 설정
  },
  /* -------------------------
     상단 상태 표시 영역
  --------------------------*/
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#f8fafc',
  },
  headerItem: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  /* -------------------------
     브랜드 로고 / 타이틀
  --------------------------*/
  brandTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_GREEN,
    textAlign: 'center',
    marginBottom: 16,
  },
  /* -------------------------
     메인 박스 (파란색 외곽선)
  --------------------------*/
  outerCardContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: BORDER_BLUE,
    borderRadius: 12,
    padding: 12,
  },
  /* -------------------------
     내부 dotted 박스
  --------------------------*/
  innerCardContainer: {
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: BORDER_BLUE,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  /* -------------------------
     프로필 영역
  --------------------------*/
  profilePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: BRAND_GREEN,
    backgroundColor: '#cccccc', // 회색 배경(임시)
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: BRAND_GREEN,
    marginBottom: 4,
  },
  userMemberSince: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  /* -------------------------
     간단한 통계(7 Day Streak, XP)
  --------------------------*/
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    width: '100%',
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    // 그림자나 테두리를 주고 싶다면 추가 가능
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  /* -------------------------
     상세 정보 목록
  --------------------------*/
  infoBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    // 그림자나 테두리를 주고 싶다면 추가 가능
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItemTitle: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  infoItemValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
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
