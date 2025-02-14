import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {fonts} from '../styles/fonts';
import colors from '../styles/colors';
import GoogleIcon from '../assets/svg/google-icon.svg';
import AppleIcon from '../assets/svg/apple-icon.svg';
import {handleGoogleOauth, handleAppleOauth} from '../api/safariView';
import Logo from '../components/Logo';
import { requestTrackingPermission, getTrackingStatus } from 'react-native-tracking-transparency'
const {width} = Dimensions.get('window');

export default function MainScreen() {
  async function requestTracking() {
    const status = await getTrackingStatus();
    if (status === 'not-determined') {
      await requestTrackingPermission();
    }
  }
  useEffect(() => {
    requestTracking();
  }, []);
  return (
    <LinearGradient
      colors={[colors.green_gradientStart, colors.green_gradientEnd]}
      start={{x: 0, y: 0.4}}
      end={{x: 0, y: 1}}
      style={styles.gradientContainer}>
      <View style={styles.container}>
        <View style={styles.logoSection}>
          <Logo />
        </View>
        <View style={styles.sloganSection}>
          <Text style={styles.mainSlogan}>
            Take a moment each day to find your path in life
          </Text>
          <Text style={styles.subSlogan}>
            Discover yourself in Your own time
          </Text>
        </View>

        <View style={styles.registerSection}>
          <TouchableOpacity
            style={styles.oauthButton}
            onPress={() => handleAppleOauth()}
          >
            <View style={styles.oauthTextWrapper}>
              <AppleIcon />
              <Text style={styles.oauthButtonText}>Sign in with Apple</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oauthButton}
            onPress={() => handleGoogleOauth()}
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
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: calculateDp(60),
    marginBottom: calculateDp(120),
  },
  sloganSection: {
    alignItems: 'center',
  },
  mainSlogan: {
    fontSize: calculateDp(22),
    fontFamily: fonts.lato_bold,
    color: colors.primary,
    textAlign: 'center',
    width: calculateDp(242),
    marginBottom: calculateDp(6),
    letterSpacing: -0.6,
  },
  subSlogan: {
    fontSize: calculateDp(14),
    fontFamily: fonts.lato_regular,
    color: colors.textSubtle,
    textAlign: 'center',
    width: '100%',
    letterSpacing: -1,
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
    color: colors.black,
  },
});
