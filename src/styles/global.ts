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
    fontFamily: fonts.logo,
  },

  // 그레디언트
  gradientContainer: {
    flex: 1,
  },

  // input
  //bottom
  bottom_background: {
    backgroundColor: 'rgb(250, 250, 250, 0.5)',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: colors.card_border,
  }
});
