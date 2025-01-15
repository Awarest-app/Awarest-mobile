// WelcomeScreen.tsx
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
// 아래 import는 react-native 프로젝트 환경에 따라 교체 가능
import LinearGradient from 'react-native-linear-gradient';
import {LoginStackParamList} from '../type/route.type';
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
// import { LinearGradient } from 'expo-linear-gradient'; // Expo 사용 시

// 화면 높이/너비 구하기 (스타일에 사용)
const {width, height} = Dimensions.get('window');

export default function MainScreen() {
  const navigation = useNavigation<NavigationProp<LoginStackParamList>>();
  // const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[colors.green_gradientStart, colors.green_gradientEnd]} // 상단(밝은색) -> 하단(어두운색) 그라디언트
      start={{x: 0, y: 0.4}} // 왼쪽 위
      end={{x: 0, y: 1}} // 오른쪽
      style={styles.gradientContainer}>
      <View style={styles.container}>
        {/* 로고 영역 */}
        <Text style={styles.logoText}>Coura</Text>
        <Text style={styles.subTitle}>Create your Own Aura</Text>

        {/* 이미 계정이 있을 때 */}
        <View style={styles.section}>
          <Text style={styles.questionText}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInButtonText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 회원가입 영역 */}
        <View style={styles.section}>
          <Text style={styles.questionText}>New to Coura?</Text>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('Survey')}>
            <Text style={styles.getStartedButtonText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1, // 전체 화면을 그라디언트로
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoText: {
    fontSize: 36,
    fontFamily: fonts.logo_font, // 로고 폰트
    fontWeight: 'bold',
    color: '#046655',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 60,
  },
  section: {
    alignItems: 'center',
    marginVertical: 20,
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  signInButton: {
    backgroundColor: '#0D9488',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  divider: {
    width: width * 0.6,
    height: 1,
    backgroundColor: '#999',
    marginVertical: 24,
  },
  getStartedButton: {
    backgroundColor: '#5A6B6B',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
