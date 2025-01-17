import {StyleSheet} from 'react-native';
import colors from './colors';
import {fonts} from './fonts';

const calculateDp = (width: number, px: number) => {
  return ((px * width) / 320);
}

export const globalStyle = StyleSheet.create({
  
  // 메인 로고들
  logo: {
    fontSize: 40,
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
