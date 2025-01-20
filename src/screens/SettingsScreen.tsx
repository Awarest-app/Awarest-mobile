import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';
import {fonts} from '../styles/fonts';
import CheckIcon from '../assets/svg/check-icon.svg';
import {globalStyle} from '../styles/global';
import {Header} from '../components/Header';
import MemoGradient from '../components/Hooks/MemoGradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '../type/route.type';

export default function SettingsScreen() {
  // 시간, XP 등의 데이터를 실제 로직에 맞게 받아오거나 계산해서 표시할 수 있습니다.
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const xpEarned = 50;
  const timeSpent = '3m 21s';

  const handleContinue = () => {
    // ‘Continue’ 버튼 클릭 시 동작(예: 홈 화면으로 이동 등)
    console.log('Continue clicked');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <MemoGradient />
      <View style={styles.contentContainer}>
      <Header />
      <SafeAreaView style={styles.safeArea}>

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
    justifyContent: 'center',
  },
  /* -----------------------
     상단 상태 표시 영역 
  ------------------------*/
  cardContainer: {
    width: '100%',
    height: '75%',
    padding: 24,
    borderWidth: 1,
    borderColor: colors.card_border, // 파란 테두리
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 40,
    gap: 40,
  },
  cardTitle: {
    fontFamily: fonts.roboto_medium,
    fontSize: 24,
    color: 'black',
  },
  checkIconContainer: {
    width: 80,
    height: 80, 
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
    marginBottom: 16,
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  evalutionMessage: {
    fontFamily: fonts.roboto_medium,
    fontSize: 22,
    color: 'black',
  },
  subMessage: {
    fontFamily: fonts.roboto_regular,
    fontSize: 18,
    color: colors.sub_mesasage,
  },
  gainXp: {
    fontFamily: fonts.roboto_semibold,
    fontSize: 22,
    color: colors.primary,
  },
  continueButton: {
    backgroundColor: colors.primary,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  continueButtonText: {
    fontFamily: fonts.roboto_regular,
    color: colors.green_button_text,
    fontSize: 18,
  },
  /* -----------------------
     하단 탭바
  ------------------------*/
});
