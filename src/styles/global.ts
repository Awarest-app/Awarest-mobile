import {StyleSheet} from 'react-native';
import colors from './colors';
import {fonts} from './fonts';

export const globalStyle = StyleSheet.create({
  // 메인 로고들
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: fonts.logo_font,
  },

  // 그레디언트
  gradientContainer: {
    flex: 1,
  },

  // input
});
