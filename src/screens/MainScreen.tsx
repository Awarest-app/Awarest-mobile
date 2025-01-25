// WelcomeScreen.tsx
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
} from 'react-native';
// 아래 import는 react-native 프로젝트 환경에 따라 교체 가능
import LinearGradient from 'react-native-linear-gradient';
import {HomeStackParamList, RootStackParamList} from '../type/route.type';
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
import GoogleIcon from '../assets/svg/google-icon.svg';
import AppleIcon from '../assets/svg/apple-icon.svg';
import {handleGoogleSignup} from '../api/safariView';
import {axiosTestJwt, axiosTestServer} from '../api/axios';
// import GoogleOauth from '../lib/googleOauth';

// 화면 높이/너비 구하기 (스타일에 사용)
const {width, height} = Dimensions.get('window');

interface Test {
  id: number;
  type: string;
  content: string;
}

export default function MainScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <LinearGradient
      colors={[colors.green_gradientStart, colors.green_gradientEnd]} // 상단(밝은색) -> 하단(어두운색) 그라디언트
      start={{x: 0, y: 0.4}} // 왼쪽 위
      end={{x: 0, y: 1}} // 오른쪽
      style={styles.gradientContainer}>
      <View style={styles.container}>
        {/* 로고 영역 */}
        <View style={styles.logoSection}>
          <Text style={styles.logoText}>Coura</Text>
          <Text style={styles.subTitle}>Create your Own Aura</Text>
        </View>

        {/* <TouchableOpacity
          style={{width: 100, height: 50, backgroundColor: 'skyblue',
            justifyContent: 'center', alignItems: 'center'}}
          onPress={() => navigation.navigate('Login')}
        >
          <Text>go home</Text>
        </TouchableOpacity> */}
        <View style={styles.sloganSection}>
          <Text style={styles.mainSlogan}>
            Take a moment each day to find your path in life
          </Text>
          <Text style={styles.subSlogan}>
            Discover yourself in Your own time
          </Text>
        </View>

        {/* <View style={styles.divider} /> */}
        {/* 회원가입 영역 */}
        <View style={styles.registerSection}>
          <TouchableOpacity
            style={styles.oauthButton}
            // onPress={() =>
            //   navigation.navigate('HomeStack', {
            //     screen: 'Home', // HomeStack 내부의 Home 스크린
            //   })
            // }
            onPress={() => axiosTestJwt()}
            //
          >
            <View style={styles.oauthTextWrapper}>
              <AppleIcon />
              <Text style={styles.oauthButtonText}>Sign in with Apple</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oauthButton}
            // onPress={() => navigation.navigate('Survey')}
            onPress={() => handleGoogleSignup()}
            //
          >
            <View style={styles.oauthTextWrapper}>
              <GoogleIcon />
              <Text style={styles.oauthButtonText}>Sign in with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const calculateDp = (px: number) => {
  return (px * width) / 320;
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1, // 전체 화면을 그라디언트로
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 24,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: calculateDp(60),
    marginBottom: calculateDp(120),
  },
  logoText: {
    fontSize: calculateDp(34),
    fontFamily: fonts.logo, // 로고 폰트
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: -10,
  },
  subTitle: {
    fontSize: calculateDp(12),
    fontFamily: fonts.lato_regular,
    color: colors.textSubtle,
  },
  sloganSection: {
    alignItems: 'center',
  },
  mainSlogan: {
    fontSize: calculateDp(22),
    fontFamily: fonts.lato_regular,
    color: colors.primary,
    textAlign: 'center',
    width: calculateDp(242),
    marginBottom: calculateDp(6),
  },
  subSlogan: {
    fontSize: calculateDp(14),
    fontFamily: fonts.lato_regular,
    color: colors.textSubtle,
    textAlign: 'center',
    width: '100%',
  },
  registerSection: {
    gap: calculateDp(10),
    position: 'absolute',
    bottom: calculateDp(40),
    alignItems: 'center',
  },
  oauthTextWrapper: {
    width: calculateDp(180),
    gap: calculateDp(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  // divider: {
  //   width: width * 0.6,
  //   height: 1,
  //   backgroundColor: '#999',
  //   marginVertical: 24,
  // },
  oauthButton: {
    backgroundColor: colors.white_75,
    width: calculateDp(260),
    height: calculateDp(46),
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: calculateDp(35),
    borderWidth: 1,
    borderColor: colors.card_border,
    borderRadius: 8,
  },
  oauthButtonText: {
    fontFamily: fonts.roboto_medium,
    fontSize: calculateDp(14),
    color: '#000000',
  },
});
