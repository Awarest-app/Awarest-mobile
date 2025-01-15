import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {RootStackParamList} from '../type/route.type';
import {fonts} from '../styles/fonts';
import CustomInput from '../components/input/CustomInput';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../styles/colors';
import {globalStyle} from '../styles/global';

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient
      colors={[colors.green_gradientStart, colors.green_gradientEnd]} // 그라디언트 색상 설정
      start={{x: 0, y: 0.4}} // 그라디언트 시작점
      end={{x: 0, y: 1}} // 그라디언트 종료점
      style={globalStyle.gradientContainer} // 전체 배경 적용
    >
      <View style={styles.container}>
        {/* 로고 영역 */}
        <Text style={globalStyle.logo}>Coura</Text>
        <Text style={styles.subtitle}>Create your Own Aura</Text>

        {/* 안내 문구 */}
        <Text style={styles.enterDetails}>Enter your details</Text>

        <CustomInput
          placeholder="Email, username"
          onChangeText={text => setEmail(text)}
          value={email}
          containerStyle={{width: '80%'}}
        />

        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={() => setPassword(password)}
          containerStyle={{width: '80%'}}
        />

        {/* 로그인 버튼 */}
        <TouchableOpacity style={styles.signInButton}>
          <Text
            style={styles.signInButtonText}
            onPress={() => {
              // 로그인 완료 후 MainTabs로 이동
              navigation.reset({
                index: 0, // 네비게이션 스택을 리셋하여 이전 화면 제거
                routes: [{name: 'MainTabs'}],
              });
            }}>
            Sign in
          </Text>
        </TouchableOpacity>

        {/* 비밀번호 찾기 */}
        <TouchableOpacity
          style={styles.forgotButton}
          // onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* 구분선 */}
        <Text style={styles.orText}>or</Text>

        {/* 소셜 로그인(구글/애플) 버튼 영역 */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            {/* 구글 아이콘을 Image, 아이콘 라이브러리 등으로 대체 가능 */}
            {/* <Image
            style={styles.socialIcon}
            source={require('./assets/google.png')}
            // 예: 구글 아이콘을 직접 추가하시면 됩니다.
          /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            {/* 애플 아이콘을 Image, 아이콘 라이브러리 등으로 대체 가능 */}
            {/* <Image
            style={styles.socialIcon}
            source={require('./assets/apple.png')}
            // 예: 애플 아이콘을 직접 추가하시면 됩니다.
          /> */}
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 24,
  },
  enterDetails: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  input: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  signInButton: {
    width: '80%',
    backgroundColor: '#417C76',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  signInButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotButton: {
    marginTop: 16,
  },
  forgotText: {
    fontSize: 14,
    color: '#333',
    textDecorationLine: 'underline',
  },
  orText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
  },
  socialButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
});
